const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');

const app = express();
const port = 3003;

app.use(express.json({ limit: '10mb' })); //pasididinom uploadinamo failo dydzio limita
app.use(express.static('public')); //nurodom, kur laikom statinius failus

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bankApplication'
})

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

// Reduce balances by 5
app.put('/reduceBalances', (req, res) => {
    const sql = `
    UPDATE accounts
    SET balance = balance - 5
    `;

    connection.query(sql, (err) => {
        if (err) throw err;
        res.json({ message: 'Balances reduced successfully!' });
    });
});

//LIST---------------------------------------------------
//nuskaitom issilistinkim viska:
app.get('/bank', (req, res) => {
    const sql = `
    SELECT id, image, name, surname, balance, blocked
    FROM accounts
    `
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);

    });
});

// BLOCK ACCOUNT
app.put('/bank/block/:id', (req, res) => {
    const sql = `
    UPDATE accounts
    SET blocked = 1
    WHERE id = ?
    `;
    connection.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Account blocked successfully!' });
    });
});

// UNBLOCK ACCOUNT
app.put('/bank/unblock/:id', (req, res) => {
    const sql = `
    UPDATE accounts
    SET blocked = 0
    WHERE id = ?
    `;
    connection.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Account unblocked successfully!' });
    });
});

//CREATE----------------------------------------------
app.post('/bank', (req, res) => {
    // Buffer - iskodavomas is base64 i binarini faila
    // paimam img stringo koda, nuimdami 'galva', kuri kartojasi visur
    // irasom failo varda (padarem ji random su uuid) ir pati faila
    const fileName = req.body.file ? uuidv4() + '.png' : null;

    if (fileName) {
        const file = Buffer.from(req.body.file.replace('data:image/png;base64,', ''), 'base64');
        fs.writeFileSync('./public/img/' + fileName, file);
    }

    console.log('fileName:', fileName);

    const sql = `
    INSERT INTO accounts (image, name, surname, balance)
    VALUES (?, ?, ?, ?)
    `;
    connection.query(sql, [fileName, req.body.name, req.body.surname, req.body.balance], (err) => {
        if (err) throw err;
        res.json({ message: 'Account created successfully!' });
    });
});

//DELETE----------------------------------------------
app.delete('/bank/:id', (req, res) => {
    let sql = `
    SELECT image
    FROM accounts
    WHERE id = ?
    `
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result[0].image) {
            fs.unlinkSync('./public/img/' + result[0].image);
        }
    });

    const deleteSql = `
    DELETE FROM accounts
    WHERE id = ?
    `;
    connection.query(deleteSql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Account created successfully!' });
    });
});

//EDIT----------------------------------------------
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put('/bank/:id', (req, res) => {
    const fileName = req.body.file ? uuidv4() + '.png' : null;

    let updateFields = 'name = ?, surname = ?, balance = ?';
    let queryParams = [req.body.name, req.body.surname, req.body.balance, req.params.id];

    if (fileName) {
        const file = Buffer.from(req.body.file.replace('data:image/png;base64,', ''), 'base64');
        fs.writeFileSync('./public/img/' + fileName, file);
        updateFields = 'image = ?, ' + updateFields;
        queryParams.unshift(fileName);
    }

    console.log('fileName:', fileName);
    const editSql = `
    UPDATE accounts
    SET ${updateFields}
    WHERE id = ?
    `;
    connection.query(editSql, queryParams, (err) => {
        if (err) throw err;
        res.json({ message: 'Account was changed successfully!' });
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

//LOGIN-------------------------

app.post('/login', (req, res) => {
    const sessionId = uuidv4();
    //updatinam sesija
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND password = ?
    `;
    //sesija yra uuid sugeneruota
    connection.query(sql, [sessionId, req.body.userName, md5(req.body.userPsw)], (err, result) => {
        if (err) throw err;
        //tikrinam, ar yra pas mus kazkas pasikeite
        //
        if (result.affectedRows) {//jei yra pasikeitimas, setinam cookie
            res.cookie('bankSession', sessionId);
            res.json({
                status: 'valid',
                getName: req.body.userName
            });
        } else { //jei neupdatina, siunciam errora
            res.json({
                status: 'error',
            });
        }
    })
});

app.post('/logout', (req, res) => {
    res.cookie('bankSession', '');
    res.json({
        status: 'logout',
    });
});

//selektinam is db userius, kurie turi sesija 'banksession'
app.get('/login', (req, res) => {

    const sql = `
    SELECT name
    FROM users
    WHERE session = ?
    `;
    connection.query(sql, [req.cookies.bankSession || ''], (err, result) => {
        if (err) throw err;

        if (result.length) {//jei rezultatas yra masyvas
            res.json({
                status: 'valid',
                getName: result[0].name, //jei radom, tai paimam pirm1 objekto reiksme
            });
        } else {
            res.json({
                status: 'error'
            });
        }
    });
});


//LOGIN
// app.post('/login', (req, res) => {
//     const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

//     const name = req.body.userName;
//     const password = md5(req.body.userPsw);

//     console.log(password);

//     const user = users.find(u => u.name === name && u.password === password);

//     //jei user yra, generuojam sesijos id
//     if (user) {
//         const sessionId = md5(uuidv4());
//         user.session = sessionId; //priskiriam sesijos id
//         fs.writeFileSync('./data/users.json', JSON.stringify(users), 'utf8')    //isaugom visus userius, vienas bus su spec tokenu
//         //kai useris turi sesijos id, issiunciam cookie
//         res.cookie('cookieSession', sessionId);
//         res.json({
//             status: 'valid',
//             getName: user.name
//         });
//         res.redirect('/home');
//     } else {
//         res.json({
//             status: 'error',
//         });
//     }
// })


// app.get('/login', (req, res) => {
//     const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
//     const user = req.cookies.cookieSession ?
//         users.find(u => u.session === req.cookies.cookieSession) :
//         null;
//     if (user) {
//         res.json({
//             status: 'valid',
//             getName: user.name,
//             role: user.role
//         });
//     } else {
//         res.json({
//             status: 'error'
//         })
//     }
// })

// //LOGOUT

// app.post('/logout', (req, res) => {
//     res.cookie('cookieSession', '***');
//     res.json({
//         status: 'logout',
//     });
// });

// // USERS

// app.get('/users', (req, res) => {
//     // jei ateinam su get metodu, paverciam duomenis i json ir issiunciam i serveri
//     let allData = fs.readFileSync('./data/users.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
//     allData = JSON.parse(allData);
//     res.json(allData); // issiunciam i serveri duomenis, kuiuos gavome nuskaite is failo
// });

// app.post('/register', (req, res) => {
//     let allData = fs.readFileSync('./data/users.json', 'utf8');
//     allData = JSON.parse(allData);
//     const id = uuidv4();
//     const data = {
//         role: 'manager',
//         name: req.body.userName,
//         password: md5(req.body.userPsw),
//         id
//     };
//     allData.push(data);
//     allData = JSON.stringify(allData);
//     fs.writeFileSync('./data/users.json', allData, 'utf8');
//     res.json({
//         status: 'valid'
//     });
// });


// app.delete('/users/:id', (req, res) => {
//     //kintamus parametrus rasom :...
//     //is requesto paimam params, kurio vardas yra id
//     //pradzia kaip ir creato
//     let allData = fs.readFileSync('./data/users.json', 'utf8'); //nuskaitom duomenis is failo (stringa)
//     allData = JSON.parse(allData);
//     const userToDelete = allData.find(d => req.params.id === d.id);
//     if (userToDelete.role === 'admin') {
//         res.status(400).json({});
//     } else {
//         let deletedData = allData.filter((d) => req.params.id !== d.id);
//         //deleted data sustringifyinta
//         deletedData = JSON.stringify(deletedData);
//         fs.writeFileSync('./data/users.json', deletedData, 'utf8');
//         res.json({
//             message: { text: 'User was deleted successfully', type: 'positive' },
//         });
//     }
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
