console.log("Starting node server");

const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
    const log = `${Date.now()} : ${new Date()} : ${req.url} : New Request Received \n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("app.log", log, (err, result) => {

        switch (myUrl.pathname) {
            case "/":
                res.end("Home Page");
                break;
            case "/about":
                const username = myUrl.query?.name || "Ashish";
                res.end(`My Name is ${username}`);
                break;
            default:
                res.end("404! Not Found");
        }
    })
});

server.listen("8000", () => {
    console.log("Server is running!");
})

