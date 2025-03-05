console.log("Starting node server");

const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Express Homepage")
})

app.get("/about", (req, res) => {
    res.send("Hello from Express About Page")
})

const server = http.createServer(app);

server.listen("8000", () => {
    console.log("Server is running!");
})

