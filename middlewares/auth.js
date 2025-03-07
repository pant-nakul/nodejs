const {getUser} = require('../services/auth');

module.exports = {
    restrictToLoggedInUsersOnly: async (req, res, next) => {
        const userId = req.cookies?.uid;

        if (!userId) return res.redirect('/login');

        const user =  getUser(userId);
        if (!user) return res.redirect('/login');

        req.user = user;
        next();
    },
    checkForAuthentication: async (req, res, next) => {
        console.log("Authentication middleware")
        const authorizationHeaderValue = req.headers["authorization"];
        if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
            return res.status(401).send("Unauthenticated");
        }
        const token = authorizationHeaderValue.split("Bearer ")[1];

        const user = getUser(token);
        console.log(user);
        if(user === null || !user) return res.redirect('/login');
        req.user = user;
        next();
    },
    checkForAuthenticationCookie: async (req, res, next) => {
        console.log("Authentication middleware")
        // const authorizationHeaderValue = req.headers["authorization"];
        // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next();
        // // const token = authorizationHeaderValue.split("Bearer ")[1];
        const token = req.cookies?.uid;

        const user = getUser(token);
        console.log(user);
        if(user === null || !user) return res.redirect('/login');
        req.user = user;
        next();
    }
}