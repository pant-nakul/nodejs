const fs = require('fs');

function logRequests (fileName){
    return ((req, res, next) => {
        const log = `${Date.now()} - ${req.method} - ${req.path} \n`;
        res.setHeader("X-server-type", "Node-Server");
        res.setHeader("X-purpose", "Tutorials");
        fs.appendFile(fileName, log, () => next());
    })
}

module.exports = {logRequests}