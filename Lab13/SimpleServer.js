var http = require('http');

//create a server object:
function request_callback (req,res){
    console.log(req.headers);
    res.WriteHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>The server data is: ${Data.now()}</h1>`);
    res.write(`<h1>The clinet data is:<script>doucment.write(Date.now()); </script></h1>`);
    res.end();
    
}
http.createServer().listen(8080); // the server oject listens on port 8080

console.log('Hellow world HTTP server listening on localhgost port 8080');