"use strict";

const express = require("express");
const cors = require("cors");

const app = require("./app");
const { PORT } = require("./config");


app.use(cors());
app.options('*', cors());


// app.get('/', (req, res) => {
//     res.send('CORS Enabled Express Server');
//     console.log('CORS Enabled Express Server');
// });

// app.get('/cors', (req, res) => {
//     res.send('CORS enabled')
// });

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:${PORT}');
    res.send({ "msg": "This has CORS enabled 🎈" })
})


app.listen(PORT, function() {
    console.log(`Started on http://localhost:${PORT}`);
    // console.log(`Cors Options: ${cors()}`);
});