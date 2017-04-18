//variables and requirements
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var operators = require("./routes/operators.js");
var memory = require('./routes/memory.js');
var port = 4000;

//uses
app.use(express.static('server/public', {index: 'views/index.html'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/operators', operators);
app.use('/memory', memory);


//git test

//listening
app.listen(port, function(){
  console.log("Listening to: ", port);
});
