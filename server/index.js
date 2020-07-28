const path = require("path");
const express = require("express");
var cors = require('cors')
const app = express(); // create express app

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(express.static(path.join(__dirname, "..", "build")))

app.post('/*', cors(corsOptions), function (request, response) {
    response.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

app.get('/*', cors(corsOptions), function (request, response) {
    response.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000");
});