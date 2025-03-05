console.log("Starting node server");

const express = require("express");

const app = express();

const port = 8000;

const users = require("./mock.json");

app.get("/", (req, res) => {
    res.send("Hello from Express Homepage")
})

app.get("/about", (req, res) => {
    res.send(`Hello ${req.query?.name || "Nakul"} , your age is ${req.query.age || 21}`)
})

app.get("/users", (req, res) => {
    const html = `<ul>${users.map(user => `<li>${user.id} - ${user.first_name} ${user.last_name} ${user.email}</li>`).join("")}</ul>`
    res.send(html)
})

app.get("/api/users", (req, res) => {
    res.json(users);
})

app.post("/api/users", (req, res) => {
    console.log(req.body)
    res.json("pending")
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    res.json(users.find(user => user.id === id))
})

app.patch("/api/users/:id", (req, res) => {
    console.log(req.body)
    res.json("pending")
})

app.delete("/api/users/:id", (req, res) => {
    console.log(req.body)
    res.json("pending")
})





app.listen(port, () => {
    console.log("Server is running on port - " + port);
})

