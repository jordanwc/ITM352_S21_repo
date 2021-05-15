//Author: Jordan Chen 
//Assignment 1 file for my sever

var express = require('express');
var app = express();

app.use(express.static('./public')); // Running trhough the public folder on the server
app.listen(8080, () => console.log(`listening on chen 8080`)); // Runs on server 8080