const express = require('express');
const cors = require('cors'); //isiinstalinam cors, pasirequirinam

const app = express();
const port = 3003;

app.use(cors()); //pasinaudojam

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
