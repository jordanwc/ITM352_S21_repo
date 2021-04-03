var http = require('http');

//create a server object:
function request_callback (req,res){
    console.log(req.headers); // output the request headers to the console
    res.WriteHead(200, {'Content-Type': 'text/html'}); // set MIME type to HTML
    res.write(`<h1>The server data is: ${Data.now()}</h1>`); //send a repsonse to the client
    res.write(`<h1>The clinet data is:<script>doucment.write(Date.now()); </script></h1>`);
    res.end(); // end the response
    
}
http.createServer(
    request_callback
).listen(8080); // the server oject listens on port 8080

console.log('Hello world HTTP server listening on localhost port 8080');