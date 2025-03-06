const router = require("express").Router();
const Url = require("../../models/Url");
const User = require("../../models/User");
const {v4: uuidv4} = require("uuid");
const{setUser,getUser} = require("../../services/auth")
const {restrictToLoggedInUsersOnly} = require("../../middlewares/auth");

router.get("/",restrictToLoggedInUsersOnly, async (req, res) => {
    const urls = await Url.find({}).lean()
    res.render("home", {urls: urls});
});

router.get("/about", (req, res) => {
    res.send(`Hello ${req.query?.name || "Nakul"} , your age is ${req.query.age || 21}`)
})

router.get("/signup", (req, res) => {
    res.render("signup", {
        dummy:
            {
                first_name: "Nakul",
                last_name: "Pant",
                password: "abc123",
                gender: "Male",
                job_title: "CEO",
            },
    });
})

router.post("/signupUser", async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
        res.render("signup", {dummy: body , msg: {error: "User Not Created Successfully! Required Fields Missing!"}});
    } else{
        const user = await User.create(body);
        res.render("signup", {msg: {success: "User Created Successfully!!!"}});
    }
    })


router.get("/login",  (req, res) => {
    res.render("login");
})

router.post("/loginUser", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({email: body.email, password: body.password}).lean()
    if(!user){
        res.render("login", {msg: {error: "Bad Credentials!"}});
    } else {
        const token = setUser(user);
        res.cookie("uid", token);
        res.redirect("/", )
    }

})

module.exports = router;