// code used from Assignment 1 screencast
var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
var data = require('./products_data.js');
const { request } = require('node:http');
var products = data.products;


app.all('*', function (req, res, next) {
  console.log(request.method + 'to' + request.path);
  next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
    process_quantity_form(request.body, response);
});

app.use(express.static ('./public'));
app.listen(8080, () => console.log (`listne to port 8080`));

