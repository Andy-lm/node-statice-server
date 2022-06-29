import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer();

server.on("request", (request:IncomingMessage, response:ServerResponse) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);
  const array:any = [];
  request.on("data",(chunk) => {
    array.push(chunk)
  })
  request.on("end",() => {
    const body = Buffer.concat(array).toString()
    console.log(body,"===body");
  })
  response.statusCode = 404;
  response.setHeader("L-nj","I am Lm")
  response.setHeader("Content-Type","javascript")
  response.write("1 \n")
  response.write("2 \n")
  response.end();
});

server.listen(8888, () => {
  console.log(server.address());
});
