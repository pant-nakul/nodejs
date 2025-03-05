const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Read all files in the routes directory, routes will be created by filename.js. E.g. users.js will result in route /users
const routesPath = path.join(__dirname, "api"); // Path to the 'api' folder

fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".js")) {
        const route = require(path.join(routesPath, file));
        const routeName = `/${file.replace(".js", "")}`;
        console.log(`Loading route: ${routeName}`);
        router.use(routeName, route);
    }
});


module.exports = router;
