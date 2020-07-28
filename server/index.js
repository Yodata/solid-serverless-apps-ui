const path = require("path");
const express = require("express");
const app = express(); // create express app

app.use(express.static(path.join(__dirname, "..", "build")))

app.post('/*', function (request, response) {
    response.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

app.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000");
});