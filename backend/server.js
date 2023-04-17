"use strict";

// const express = require("express");

const app = require("./app");
const { PORT } = require("./config");

// app.get('/', (req, res) => {
//     res.send('CORS Enabled Express Server');
// });

app.get('/cors', (req, res) => {
    res.send('CORS enabled')
});



app.listen(PORT, function() {
    console.log(`Started on http://localhost:${PORT}`);
});