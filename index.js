console.log("Starting node server");

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const log = `${Date.now()} : ${new Date()} : ${req.url} : New Request Received \n`;
    fs.appendFile("app.log", log, (err, result) => {

        switch (req.url) {
            case "/":
                res.end("Home Page");
                break;
            case "/nakul":
                res.end("I am Nakul");
                break;
            default:
                res.end("404! Not Found");
        }


    })
});

server.listen("8000", () => {
    console.log("Server is running!");
})

