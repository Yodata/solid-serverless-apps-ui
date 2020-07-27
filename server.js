// const express = require('express');
// // const bodyParser = require('body-parser')
// const path = require('path');
// const app = express();
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.post('/', function(request, response) {
//     response.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// // app.get("/get", (req, res, next) => {
// //     res.json({
// //         "version": process.env.VERSION
// //     });
// // });

// app.listen(process.env.PORT || 8080);

const port = process.env.PORT || 8080

var express = require("express");
var app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')))

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/*', function (request, response) {
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
});