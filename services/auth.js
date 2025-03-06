const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
module.exports = {
    setUser: (user) => {
        const payload = {
            id: user.id,
            email: user.email,
        }
        return jwt.sign(payload, process.env.JWT_SECRET, )
    },
    getUser: (token) => {
        if(!token) return null;
        try{
            return jwt.verify(token, process.env.JWT_SECRET)
        } catch(err){
            return null
        }
    }
}