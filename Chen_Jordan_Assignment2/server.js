var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');
const { query } = require('express');

app.all('*', function (request, response, next) {
    console.log(request.method, request.path);
    next();
});

app.post('./process_login', function (request, response, next) {
    console.log(request.query);
    request.query["purchased"]="true";
    request.query["Username"]=request.body["Username"];
    response.redirect('product_display?' + qs.stringify(request.query));

});

app.post('./process_register', function (request, response, next) {
    response.send(request.body);

});


app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on chen 8080`));