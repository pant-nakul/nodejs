console.log("Starting node server");

const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello from Express Homepage")
})

app.get("/about", (req, res) => {
    res.send(`Hello ${req.query?.name || "Nakul"} , your age is ${req.query.age || 21}`)
})

app.listen(port, () => {
    console.log("Server is running on port - " + port);
})

