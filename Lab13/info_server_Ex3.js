var express = require('express');
const { stringify } = require('qs');
var app = express();



app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + 'with query'+ JSON.stringify(request.query));
    next();
});


app.get('/test', function (request, response, next) {
    response.send('I got a request for /test');
});

app.post('./display_purchase', function (request, response, next){
    user_data = {'username': 'itm352', 'password' : 'grader'};
    post_data = request.body;
    if(post_data['quantity_textbook']) {
        the_qty = post_data ['quantity_textbook'];
        
        if(isNonNegInt(the_qty)) {
            response.send(`Thanks for purchasing ${the_qty} items!`);
            return;

        } else {
            response.send('./order_page.html');
            return;
        }
    }
});

app.use(express.static('./public'));
app.listen(8080, function() {

    console.log(`listening on port 8080`); // note the use of an anonymous function here

}
); // note the use of anonymous function here