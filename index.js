console.log("Starting node server");

const express = require("express");

const fs = require("fs");

const app = express();

const port = 8000;

const users = require("./mock.json");

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));

//Middleware  - Order is important
app.use((req,res,next) =>{
    const log = `${Date.now()} - ${req.method} - ${req.path} \n`;
    //always add X to custom headers
    res.setHeader("X-server-type", "Node-Server");
    res.setHeader("X-purpose", "Tutorials");
    fs.appendFile("./app.log", log, (err,data)=>{
        next();
    });
})

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

app.post("/api/users",(req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title){
        return res.status(400).send("Please enter all fields")
    }
    body.id = users.length + 1;
    users.push(body);
    fs.writeFile("./mock.json", JSON.stringify(users), (err,data) => {
        res.status(201).json(body)
    })
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user =  users.find(user => user.id === id)
        user !== undefined ? res.json() : res.status(404).send("Not Found");
    })
    .patch((req, res) => {
        const id = Number(req.params.id)
        const body = req.body;
        body.id = id;
        let allUsersExcept = users.filter(user => user.id !== id);
        allUsersExcept.push(body);
        fs.writeFile("./mock.json", JSON.stringify(allUsersExcept), (err,data) => {
            res.status(203).json(body)
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        let allUsersExcept = users.filter(user => user.id !== id);
        fs.writeFile("./mock.json", JSON.stringify(allUsersExcept), (err,data) => {
            res.status(203).json({status: "success", users: allUsersExcept})
        })
    })

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
