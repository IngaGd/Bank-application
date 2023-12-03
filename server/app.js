const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const winston = require('winston');
const path = require('path');

const app = express();
const port = 3003;

app.use(express.json({ limit: '10mb' })); //pasididinom uploadinamo failo dydzio limita
app.use(express.static('public')); //nurodom, kur laikom statinius failus

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
// })

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bankApplication'
})

console.log('Connecting to the database with host:', process.env.DB_HOST);
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

//LOGGER
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'bank-app' },
    transports: [
        new winston.transports.File({
            filename: './backend/logs/application.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        })
    ]
});

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
//REGISTER----------------------

//REGISTER
app.post('/register', (req, res) => {
    const sql1 = `
    SELECT * FROM users
    WHERE name = ?
    `
    const sessionId = uuidv4();

    logger.info(`Checking availability for username: ${req.body.userName}`);

    connection.query(sql1, [req.body.userName], (err, result) => {
        if (err) {
            logger.error(`Database error during username check: ${err.message}`);
            res.status(500).json({
                status: 'error',
                message: 'An internal server error occured.'
            });
        } else if (result.length > 0) {
            logger.warn(`Registration attempt with existing username: ${req.body.userName}`);
            res.status(409).json({
                status: 'error',
                message: 'Username is already taken'
            });
        } else {
            logger.info(`Username available for registration: ${req.body.userName}`);
            const sql2 = `
            INSERT INTO users (name, password, session)
            VALUES (?, ?, ?)
            `
            connection.query(sql2, [req.body.userName, md5(req.body.userPsw), sessionId], (err, result) => {
                if (err) {
                    // Log the database error
                    logger.error(`Database error during user registration: ${err.message}`);
                    res.status(500).json({
                        status: 'error',
                        message: 'Registration failed due to a server error.'
                    });
                } else if (result.affectedRows) {
                    logger.info(`User registered successfully: ${req.body.userName}`);
                    res.json({ status: 'valid', message: 'Registration successful' });
                } else {
                    logger.warn(`Unexpected result during registration for user: ${req.body.userName}`);
                    res.status(500).json({
                        status: 'error',
                        message: 'Registration failed due to an unexpected error.'
                    });
                }
            })
        }
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

app.use(express.static('public'));

app.use(express.static(path.join(__dirname, '../bank/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../bank/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
