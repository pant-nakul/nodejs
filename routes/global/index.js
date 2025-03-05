const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello from Express Homepage")
})

router.get("/about", (req, res) => {
    res.send(`Hello ${req.query?.name || "Nakul"} , your age is ${req.query.age || 21}`)
})

module.exports = router;