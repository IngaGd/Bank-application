const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam
//susiintstaliuojam uuid (cd s1, npm i uuid)
// const paimam is cia: https://github.com/uuidjs/uuid#readme
const { v4: uuidv4 } = require('uuid');
//naudojam sinchronini skaityma: https://nodejs.dev/en/learn/reading-files-with-nodejs/
//pasijusinam
const fs = require('fs');
const cookieParser = require('cookie-parser');
const md5 = require('md5');

const app = express();
const port = 3003;

//pasinaudojam, sutikimas, kad serveris gautu js is narsykles
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(cookieParser());

app.use(
    // reikalinga, kad is jsonintu ir parametrus atiduotu
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// API BANK

//nuskaitom issilistinkim viska:
app.get('/bank', (req, res) => {
    // jei ateinam su get metodu, paverciam duomenis i json ir issiunciam i serveri
    let allData = fs.readFileSync('./data/bank.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData);
    res.json(allData); // issiunciam i serveri duomenis, kuiuos gavome nuskaite is failo
});

app.post('/bank', (req, res) => {
    //req gaunam info is create data per res.data is app
    let allData = fs.readFileSync('./data/bank.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData); //paverciam stringa i objekta, bodyje yra pas mus info su duomenimis, kuriuos siunciam
    const data = { ...req.body }; //gaunam data, persikopijuojam tuos duomenis in case, data yra tai, ka siuntem is create
    //panaudojam uuid, prie account duomenu dar pridedam id:
    data.id = uuidv4();
    //viska ipushinam i data:
    allData.push(data);
    let sortedData = allData.sort((a, b) => (a.surname > b.surname ? 1 : -1));
    //ipushinta data verchiam i stringa:
    sortedData = JSON.stringify(sortedData);
    //gauta string irasom atgal i duomenis:
    fs.writeFileSync('./data/bank.json', sortedData, 'utf8');
    res.json({
        message: {
            text: 'New account was created successfully',
            type: 'positive',
        },
    });
});

//trinam:
app.delete('/bank/:id', (req, res) => {
    //kintamus parametrus rasom :...
    //is requesto paimam params, kurio vardas yra id
    //pradzia kaip ir creato
    let allData = fs.readFileSync('./data/bank.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData);
    let deletedData = allData.filter((d) => req.params.id !== d.id);
    //deleted data sustringifyinta
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync('./data/bank.json', deletedData, 'utf8');
    res.json({
        message: { text: 'Account was deleted successfully', type: 'positive' },
    });
});

//edit
app.put('/bank/:id', (req, res) => {
    //kintamus parametrus rasom :...
    //is requesto paimam params, kurio vardas yra id
    //pradzia kaip ir creato
    let allData = fs.readFileSync('./data/bank.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData);

    //nuskaitom senus duomenis, kuriuos gaunam is bodzio
    const data = {
        name: req.body.name,
        surname: req.body.surname,
        balance: req.body.balance,
    };

    //mapinam, susirandam is params, ka norm editint, jei norim redaguiti,
    //duodam naujus duomenis overraidindamis senus (viska isskyrus id overraidina),
    //jei nenorim, perduodam viska
    let editedData = allData.map((d) =>
        req.params.id === d.id ? { ...d, ...data } : { ...d }
    );
    //edit data sustringifyinta
    editedData = JSON.stringify(editedData);
    fs.writeFileSync('./data/bank.json', editedData, 'utf8');
    res.json({
        message: { text: 'Changes were saved', type: 'positive' },
    });
});

//-----------------------------------------------------U3

//COOKIES
app.post('/cookies', (req, res) => {

    if (req.body.delete) {
        res.cookie('Cookies: ', req.body.cookie, { maxAge: -3600 });
    } else {
        res.cookie('Cookies: ', req.body.cookie, { maxAge: 3600 }); //pasiimam info is set funkcijos
    }

    res.json({ message: 'ok' });
});

//LOGIN
app.post('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

    const name = req.body.userName;
    const password = md5(req.body.userPsw);

    console.log(password);

    const user = users.find(u => u.name === name && u.password === password);

    //jei user yra, generuojam sesijos id
    if (user) {
        const sessionId = md5(uuidv4());
        user.session = sessionId; //priskiriam sesijos id
        fs.writeFileSync('./data/users.json', JSON.stringify(users), 'utf8')    //isaugom visus userius, vienas bus su spec tokenu
        //kai useris turi sesijos id, issiunciam cookie
        res.cookie('cookieSession', sessionId);
        res.json({
            status: 'valid',
            getName: user.name
        });
    } else {
        res.json({
            status: 'error',
        });
    }
})


app.get('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    const user = req.cookies.cookieSession ?
        users.find(u => u.session === req.cookies.cookieSession) :
        null;
    if (user) {
        res.json({
            status: 'valid',
            getName: user.name
        });
    } else {
        res.json({
            status: 'error'
        })
    }
})

//LOGOUT

app.post('/logout', (req, res) => {
    res.cookie('cookieSession', '***');
    res.json({
        status: 'logout',
    });
});

// USERS

app.get('/users', (req, res) => {
    // jei ateinam su get metodu, paverciam duomenis i json ir issiunciam i serveri
    let allData = fs.readFileSync('./data/users.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData);
    res.json(allData); // issiunciam i serveri duomenis, kuiuos gavome nuskaite is failo
});

app.post('/register', (req, res) => {
    let allData = fs.readFileSync('./data/users.json', 'utf8');
    allData = JSON.parse(allData);
    const id = uuidv4();
    const data = {
        name: req.body.userName,
        password: md5(req.body.userPsw),
        id
    };
    allData.push(data);
    allData = JSON.stringify(allData);
    fs.writeFileSync('./data/users.json', allData, 'utf8');
    res.json({
        status: 'valid'
    });
});

app.delete('/users/:id', (req, res) => {
    //kintamus parametrus rasom :...
    //is requesto paimam params, kurio vardas yra id
    //pradzia kaip ir creato
    let allData = fs.readFileSync('./data/users.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData);
    let deletedData = allData.filter((d) => req.params.id !== d.id);
    //deleted data sustringifyinta
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync('./data/users.json', deletedData, 'utf8');
    res.json({
        message: { text: 'User was deleted successfully', type: 'positive' },
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
