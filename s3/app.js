const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');

const app = express();
const port = 3006;

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
    SELECT id, name, surname, balance
    FROM accounts
    `
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);

    });
});

app.post('/accounts', (req, res) => {
    const sql = `
    INSERT INTO accounts (name, surname, balance)
    VALUES (?, ?, ?)
    `;
    connection.query(sql, [req.body.name, req.body.surname, req.body.balance], (err) => {
        if (err) throw err;
        res.json({});
    });
});

//DELETE FROM table_name WHERE condition;
app.delete('/accounts/:id', (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
