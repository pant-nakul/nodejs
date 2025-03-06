module.exports = {
    inc: function(value) {
        return parseInt(value) + 1;
    },
    currentYear: () => new Date().getFullYear(), // Returns current year
};