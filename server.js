const http = require('http');

http.createServer((request, response) => {
  let headers = request.headers;
  let method = request.method;
  let url = request.url;
  let body = [];
  
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body.
  });
  
  response.on('error', (err) => {
    console.error(err);
  });
  
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  // or response.writeHead(200, {'Content-Type': 'application/json'})
  
  let responseBody = {
    headers: headers,
    method: method,
    url: url,
    body: body
  };
 
  response.write(JSON.stringify(responseBody));
  response.end();
  // or response.end(JSON.stringify(responseBody))
  
}).listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});