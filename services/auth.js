const sessionIdToUserMap = new Map();

module.exports = {
    setUser: (id,user) => {
        sessionIdToUserMap.set(id,user);
    },
    getUser: (id) => {
        return sessionIdToUserMap.get(id);
    }
}