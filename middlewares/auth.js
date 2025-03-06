const {getUser} = require('../services/auth');

module.exports = {
    restrictToLoggedInUsersOnly: async (req, res, next) => {
        const userId = req.cookies?.uid;

        if (!userId) return res.redirect('/login');

        const user =  getUser(userId);
        if (!user) return res.redirect('/login');

        req.user = user;
        next();
    }
}