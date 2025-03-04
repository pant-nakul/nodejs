function add(a, b) { return a+b }
function subtract(a, b) { return a-b }

// module.exports = {add: add, sub: subtract}

exports.add = (a,b) => a + b;
exports.sub = (a,b) => a - b;
exports.mult = (a,b) => a * b;
exports.mod = (a,b) => a % b;