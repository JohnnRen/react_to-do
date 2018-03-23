'use strict'

var express = require("express");
var app = express();
var tasks = require("./router/tasks");

var argv = require('minimist')(process.argv.slice(2));
var morgan = require("morgan");
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var port = 3009;
if ("port" in argv) {
    port = argv.port;
}

//Start server
app.listen(port, function () {
    console.log("Server has been started on port" + port);
});

//Attach middlewares
app.use(favicon('./main/images/favicon.ico'), morgan('combined'));
app.use(bodyParser.json());
app.all("/", function (req, res) { res.send("Home"); });
app.use("/", tasks);