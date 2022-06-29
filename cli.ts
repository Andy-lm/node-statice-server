#!/usr/bin/env node

const program = require("commander");
const pkg = require("./package.json");

// option只是在写-h的时候做提示的作用
program.version(pkg.version);

program
  .command("start <serverPath> ")
  .description("start a file server")
  .option("-p, --port <port>", "server port")
  .option("-c, --cacheAge <cacheAge>", "cacheAge")
  .action((str, options) => {
    console.log(str, "======serverPath");
    console.log(options.port, "====port");
    console.log(options.cacheAge, "====cacheAge");
  });

program.parse(process.argv);
