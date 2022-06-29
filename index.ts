import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";
import url from "url";

const server = http.createServer();
const publicDir = path.resolve(__dirname, "./public");
console.log(publicDir,"-----publicDir");

let cacheAge = 3600 * 24 * 365;

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { headers, url: requestUrl = "/", method } = request;
  const { pathname, query, search } = url.parse(requestUrl);
  // 禁止非GET请求方式
  if (method !== "GET") {
    response.statusCode = 405;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.end("该请求方式不允许。。。");
    return;
  }

  let filename = pathname?.slice(1) || "";
  // 如何用户访问不带路径默认访问首页
  if (filename === "") {
    filename = "index.html";
  }
  console.log(filename, "======filename");
  fs.readFile(path.resolve(publicDir, filename), (error, data) => {
    if (error) {
      console.log(error, "=====error");
      response.setHeader("Content-Type", "text/html;charset=utf-8");
      /***
       * -2：找不到对应地址的文件
       * -21：无法读取目录
       */
      if (error.errno === -2) {
        response.statusCode = 404;
        fs.readFile(path.resolve(publicDir, "404.html"), (error, data) => {
          response.end(data);
        });
      } else if (error.errno === -21) {
        response.statusCode = 403;
        response.end("无权查看相应的目录！");
      } else {
        response.statusCode = 500;
        response.end("服务器繁忙，请稍后再试！");
      }
    } else {
      // 添加缓存，注意首页html浏览器不会进行缓存
      response.setHeader("Cache-Control", `public, max-age=${cacheAge}`);
      response.end(data);
    }
  });
});

server.listen(8888);
