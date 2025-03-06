const router = require("express").Router();
const Url = require("../../models/Url");

router.get("/", async (req, res) => {
    res.send("APP  - SERVER HOMEPAGE ");
})

router.get("/about", (req, res) => {
    res.send(`Hello ${req.query?.name || "Nakul"} , your age is ${req.query.age || 21}`)
})

module.exports = router;