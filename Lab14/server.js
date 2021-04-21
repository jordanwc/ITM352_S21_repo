var express = require('express');
var app = express();
var myParser = require("body-parser");
app.use(myParser.urlencoded({extended : true}));
var qs = require('qs');
const { type } = require('node:os');

//var user_data = require('./user_data.json');
//const { copyFileSync } = require('node:fs');
//console.log(user_data['dport']['password'])
var user_data_file = './user_data.json';
if(fs.existsSync(user_data_file)){
    var file_stats = fs.statSync(user_data_file);
    console.log(file_stats["Stats"]["Size"]);
var user_data = JSON.parse(fs.readFileSync('./user_data.json'));
}else{
    console.log(`${user_data_file} does not exist!`);
}

app.post('./process_register', function (req, res){
// add a new user to the DB

username = 'newuser';
user_data[username] = {};
user_data[username].password = 'newpass';
user_data[username].email = 'newuser@user.com';
user_data[username]["name"] = 'Jordan Chen';
//save updated user_data to file (DB)
fs.writeFileSync(user_data_file, JSON.stringify(user_data))
//console.log(user_data);

});

app.all('*', function (req,res, next){
    console.log(req.method, req.path);
    next();
});

app.post('/pocess_login', function (request, response, next){
    console.log(request.query);
    let username_entered= request.body ["uname"];
    let password_entered = request.body ["psw"];
    if (typeof user_data[username_entered] != 'undefined') {
        if (user_data[username_entered] ['password'] == password_entered){
            response.send(`${username_entered} is logged in`);
        
        } else {
            response.send(`${username_entered} password wrong`);
        }

    } else {
        response.send(`${username_entered} not found`);
    
    }
});

app.post('./process_register', function (request, response, next){

    response.send(request.body);

});