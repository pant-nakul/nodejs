console.log("Starting node server");

const express = require("express");

const fs = require("fs");

const app = express();

const port = 8000;

const users = require("./mock.json");

const path = require('path')

const globalRoutes = require("./routes/global");

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


//App Routes
app.use("/", globalRoutes)

//API Routes
app.use("/api", apiRoutes )

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
