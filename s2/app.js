const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam
//susiintstaliuojam uuid (cd s1, npm i uuid)
// const paimam is cia: https://github.com/uuidjs/uuid#readme
const { v4: uuidv4 } = require('uuid');
//naudojam sinchronini skaityma: https://nodejs.dev/en/learn/reading-files-with-nodejs/
//pasijusinam
const fs = require('fs');

const app = express();
const port = 3003;

app.use(cors()); //pasinaudojam, sutikimas, kad serveris gautu js is narsykles

app.use(      // reikalinga, kad is jsonintu ir parametrus atiduotu
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


// API

//nuskaitom issilistinkim viska:
app.get('/bank', (req, res) => { // jei ateinam su get metodu, paverciam duomenis i json ir issiunciam i serveri
    let allData = fs.readFileSync('./data/bank.json', 'utf8');//nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData);
    res.json(allData);    // issiunciam i serveri duomenis, kuiuos gavome nuskaite is failo
});

app.post('/bank', (req, res) => {//req gaunam info is create data per res.data is app
    let allData = fs.readFileSync('./data/bank.json', 'utf8');//nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData); //paverciam stringa i objekta, bodyje yra pas mus info su duomenimis, kuriuos siunciam
    const data = { ...req.body }; //gaunam data, persikopijuojam tuos duomenis in case, data yra tai, ka siuntem is create
    //panaudojam uuid, prie account duomenu dar pridedam id:
    data.id = uuidv4();
    //viska ipushinam i data:
    allData.push(data);
    let sortedData = allData.sort((a, b) => (a.surname > b.surname) ? 1 : -1);
    //ipushinta data verchiam i stringa:
    sortedData = JSON.stringify(sortedData);
    //gauta string irasom atgal i duomenis:
    fs.writeFileSync('./data/bank.json', sortedData, 'utf8');
    res.json({
        message: { text: "New account was created successfully", type: 'positive' }
    });
});

//trinam:
app.delete('/bank/:id', (req, res) => { //kintamus parametrus rasom :...
    //is requesto paimam params, kurio vardas yra id
    //pradzia kaip ir creato
    let allData = fs.readFileSync('./data/bank.json', 'utf8');//nuskaitom duomenis is failo (stringa)
    allData = JSON.parse(allData);
    let deletedData = allData.filter(d => req.params.id !== d.id);
    //deleted data sustringifyinta
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync('./data/bank.json', deletedData, 'utf8');
    res.json({
        message: { text: "Account was deleted successfully", type: 'positive' }
    });
})

//edit
app.put('/bank/:id', (req, res) => { //kintamus parametrus rasom :...
    //is requesto paimam params, kurio vardas yra id
    //pradzia kaip ir creato
    let allData = fs.readFileSync('./data/bank.json', 'utf8');//nuskaitom duomenis is failo (stringa)
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
    let editedData = allData.map(d => req.params.id === d.id ? { ...d, ...data } : { ...d });
    //edit data sustringifyinta
    editedData = JSON.stringify(editedData);
    fs.writeFileSync('./data/bank.json', editedData, 'utf8');
    res.json({
        message: { text: "Changes were saved", type: 'positive' },
    });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
