var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require('./public/products_data.js');
var products = data.products
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs');
var fs = require('fs'); // Loads/ starts up fs system actions
const querystring = require('querystring');

// detects request for all and displays path - code taken from Lab 13 Ex 4
app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});
// Taken from Lab 13
app.post("/process_page", function (request, response, next) {
    // following code same as code in products_display but modified
    let POST = request.body;
    console.log(POST);
    const stringified = querystring.stringify(POST);
    has_errors = false; // assume quantities are valid
    total_qty = 0; 
    for (i in products) {
        if (typeof POST[`quantity${i}`] != "undefined") {
            a_qty = POST[`quantity${i}`];
            total_qty += a_qty; 
            if(!isNonNegInt(a_qty)) {
                has_errors = true; //invalid quantity error
            }
        }
    }
    // Respond to errors or redirect to login if no errors - response.redirect code found from Getting start with Assign. 2 screencast
    if(has_errors) { // if has errors then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified);
    } else if(total_qty == 0) { // if no quantity selection then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified);
    } else { // if nothing wrong then send user to login page
        response.redirect("./login.html?" + stringified);
    }
})

// Processes login form - part of code from Assignment 2 screencast
app.post('/process_login', function (request, response, next) {
    console.log(request.query);
    request.query["uname"] = request.body["uname"];
    response.redirect("invoice.html?" + qs.stringify(request.query)); 
});

// Processes register form - part of code from Assignment 2 screencast
app.post('/process_register', function (request, response, next) {
    console.log(request.query);
    request.query["uname"] = request.body["uname"];
    response.redirect("invoice.html?" + qs.stringify(request.query)); 
});


// function code from Invoice4
function isNonNegInt(q, returnErrors = false) {
    var errors = []; // assume that there are no errors
    if(q == "") q = 0; // Considers blank inputs as 0
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is number
    else if(q < 0) errors.push('Negative value!'); // Check if non-negative
    else if(parseInt(q) != q) errors.push('Not an integer!'); // Check if integer
    return returnErrors ? errors : (errors.length == 0);
    }
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on chen 8080`));