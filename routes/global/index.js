const router = require("express").Router();
const Url = require("../../models/Url");

router.get("/", async (req, res) => {
    const urls = await  Url.find({}).lean()
    res.render("home", { urls: urls });
})

router.get("/about", (req, res) => {
    res.send(`Hello ${req.query?.name || "Nakul"} , your age is ${req.query.age || 21}`)
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.get("/login", (req, res) => {
    res.render("login");
})

module.exports = router;