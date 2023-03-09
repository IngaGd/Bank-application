const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


// API

app.get('/api', (req, res) => {
    res.json({ title: 'Hello World!' });
})
