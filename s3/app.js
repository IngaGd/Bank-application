const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');

const app = express();
const port = 3006;
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

// app.get('/users', (req, res) => {
//     const sql = `
//         SELECT name
//         FROM users
//     `
//     connection.query(sql, (err, result) => { //result yra rezultatas querio, kuri perdavem is sql
//         if (err) throw err; //jei nutinka erroras, parodo errora ir viskas nutruksta
//         res.json(result);
//     });
// });

app.get('/accounts', (req, res) => {
    const sql = `
    SELECT id, image, name, surname, balance
    FROM accounts
    `
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);

    });
});

app.post('/accounts', (req, res) => {
    //Buffer - iskodavomas is base64 i binarini faila
    //paimam img stringo koda, nuimdami 'galva', kuri kartojasi visur
    //irasom failo varda (padarem ji random su uuid) ir pati faila
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
        res.json({});
    });
});

//DELETE FROM table_name WHERE condition;
app.delete('/accounts/:id', (req, res) => {

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
        res.json({});
    });
});

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put('/accounts/:id', (req, res) => {
    const editSql = `
    UPDATE accounts
    SET name = ?, surname = ?, balance = ?
    WHERE id = ?
    `;
    connection.query(editSql, [req.body.name, req.body.surname, req.body.balance, req.params.id], (err) => {
        if (err) throw err;
        res.json({});
    });
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





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
