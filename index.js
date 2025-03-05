console.log("Starting node server");

const express = require("express");

const fs = require("fs");

const app = express();

const port = 8000;

const users = require("./mock.json");

const path = require('path')

const apiRoutes = require("./routes")

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



app.use("/api", apiRoutes )

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
