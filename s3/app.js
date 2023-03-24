const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');

const app = express();
const port = 3003;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bank'
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

app.get('/users', (req, res) => {
    const sql = `
        SELECT name
        FROM users
    `
    connection.query(sql, (err, result) => { //result yra rezultatas querio, kuri perdavem is sql
        if (err) throw err; //jei nutinka erroras, parodo errora ir viskas nutruksta
        res.json(result);
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
