//Author: Jordan Chen 
//Assignment 3 file for my sever
//Followed Professor Port's Assignment 2 screencast
//Helped by Professor Port in office hours

var express = require('express'); // Loads express
var app = express(); // Variable called app that starts the express module
var myParser = require("body-parser");
var data = require('./public/products_data.js'); //variable set to data and links to my public folder with products_data.js
var products = data.products // Loads my products from products_data.js
app.use(myParser.urlencoded({ extended: true }));
var qs = require('qs'); // Loads starts up query string
var fs = require('fs'); // Loads starts up fs system actions
var session = require('express-session'); // Creating a variable for sessions to load
var cookieParser = require('cookie-parser'); //Variable for cookieParser
app.use(cookieParser());
const user_data_filename = 'user_data.json';
const nodemailer = require("nodemailer"); //Requring nodemailer

//Borrowed code from lab 14, set cookies to user
app.get('/set_cookie', function (request, response, next) {

    let my_name = 'Jordan Chen';
    response.clearCookie('my_name');
    response.send(`Cookie for ${my_name} sent`);
    next();
});

// Using  cookies
app.get('/use_cookie', function (request, response, next) {
    //console.log(req.cookie);
    if (typeof request.cookies["username"] != 'undefined') {
        res.send(`${request.cookies["username"]} is logged in!`)
    } else {
        res.send("You are not logged in!");
    }
    next();
});

//Using sessions
app.use(session({ secret: "ITM352 rocks!" })); //Allows the server to use sessions
const querystring = require('querystring'); // Uses the query string 
const { request } = require('express');

var user_data_file = "./user_data.json"; // Reads user_data.json, used code from Lab 14
if (fs.existsSync(user_data_file)) { // Checks the data to see if the file is there
    var file_stats = fs.statSync(user_data_file) // Gets the data from the files
    var user_data = JSON.parse(fs.readFileSync(user_data_file, "utf-8"));
}
console.log(user_data); // Displays the request for user_data

// detects request for all and displays path, code taken from Lab 13 
app.all('*', function (request, response, next) { // Connects all my request for POST
    console.log(request.method + ' to path ' + request.path); //Displays the request for method and path
    if (typeof request.session.cart == 'undefined') {
        request.session.cart = {};
    }
    next(); // Continue
});

//Getting products when items are added to cart
app.get("/add_to_cart", function (request, response) {
    var params = request.query;
    console.log(params);
    var prod_key = params['producttype']; //Variable for the products
    var quantities = params['quantities']; //Variable for quantities
    request.session.cart[prod_key] = quantities; //Cart is requesting the quantities that are added to cart
    console.log(request.session.cart);
    response.redirect(request.get('Refferer')); //Redirect to the same page

});

// Borrowed code from Lab 13
app.post("/process_page", function (request, response, next) { // Processes product form
    let POST = request.body;
    console.log(POST, request.query); // Displays the products and quantity
    const stringified = querystring.stringify(POST); // Stores quantity of products through query string
    has_errors = false; // Assume quantities are valid
    total_qty = 0; // Default for quantity of each product
    for (i in POST["quantity"]) { // For loop checking the quantity for each product
        a_qty = POST[`quantity`][i]; // The total quantity entered for each product
        total_qty += a_qty; //Increase in quantity
        if (!isNonNegInt(a_qty)) { // Checks for a non negative integer
            has_errors = true; // Invalid quantity error
        }

    }
    // Respond to errors or redirect to login if no errors, used code from Professor Port's assignment 2 screencast
    if (has_errors) { // if has errors then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified);  //Redirect user to the product_display page
    } else if (total_qty == 0) { // if no quantity selection then keeps user on products_display page
        response.redirect("./products_display.html?" + stringified); //Redirect user to the product_display page
    } else {
        //Quantities are good add to cart, helped by Professor Port in office hours
        request.session.cart[request.query.producttype] = POST.quantity; // Requesting the quantity stored in the session cart, the quantity is requested through the query
        console.log(request.session.cart) // Display the quantity stored in session for cart
        response.redirect(request.get("Referrer"));  // If nothing is wrong then send back to where we came from

    }

})
// Return shopping cart data in JSON
app.post("/get_cart", function (request, response) {
    response.json(request.session.cart);
});

//Getting the complete purchase page after user presses the purchase button
app.get("/CompletePurchase", function (request, response) {
    response.send("Thank you for your Purchase!");
});

app.post('/process_login', function (request, response, next) { // Creating the function for the login page using POST
    console.log(request.body); //Display the request for the body
    let username_entered = request.body["Username"]; // Sets user input for username as Username
    request.query.Username = username_entered; // Checks and request the username entered to see if it is in the database
    let password_entered = request.body["psw"]; // Sets user input for psw as psw
    // Checks if username_entered matches any usernames in user_data
    if (typeof user_data[username_entered] != "undefined") { //Checks if the username is in the registered
        if (user_data[username_entered]["password"] == password_entered) { // Checks if password matches the password that is connected to that username
            response.redirect("viewcart.html?" + qs.stringify(request.query)); // Sends user to invoice if no errors
            return;
        }
    } else {
    }
    // Sends back to login if login info does not match user_data info
    response.redirect("products_display.html?" + qs.stringify(request.query)); // Redirect user to the login page
});

// Processes register form, used code from Professor Port's Assignment 2 screencast
app.post('/process_register', function (request, response, next) { // Creating the function for the register page using POST
    console.log(request.query); // Display the request for the register page in the query
    request.query["Username"] = request.body["Username"]; //Requesting for the textbox and label for the username from register.html
    request.query["email"] = request.body["email"]; //Requesting for the textbox and label for the email from register.html
    request.query["psw"] = request.body["psw"]; // Requesting for the textbox and label for the password from register.html
    response.redirect("login.html?" + qs.stringify(request.query)); //When submitted redirects to the login page
});

// Processes login form, used code from Professor Port's Assignment 2 screencast
app.post('/process_login', function (request, response, next) {
    console.log(request.query); //Display the request for the login page in the query
    request.query["Username"] = request.body["Username"]; //Requesting for the textbox and label for the username from login.html
    request.query["email"] = request.body["email"]; //Requesting for the textbox and label for the email from login.html
    request.query["psw"] = request.body["psw"]; //Requesting for the textbox and label for the password from login.html
    response.redirect("invoice.html?" + qs.stringify(request.query)); //If successfully logged in user is sent to the invoice

});

// Used code from Invoice 4
function isNonNegInt(q, returnErrors = false) {
    var errors = []; // Assume that there are no errors
    if (q == "") q = 0; // Considers blank inputs as 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is number
    else if (q < 0) errors.push('Negative value!'); // Check if non-negative
    else if (parseInt(q) != q) errors.push('Not an integer!'); // Check if integer
    return returnErrors ? errors : (errors.length == 0); //Show errors if returned as an error
}
app.use(express.static('./public')); //Using express module from the public folder
app.listen(8080, () => console.log(`listening on chen 8080`)); //Requesting and instructing to listen on 8080