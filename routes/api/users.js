const users = require("../../mock.json");
const fs = require("fs");
const router = require("express").Router();


router.get("/", (req, res) => {
    res.json(users);
})

router.post("/",(req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title){
        return res.status(400).send("Please enter all fields")
    }
    body.id = users.length + 1;
    users.push(body);
    fs.writeFile("../mock.json", JSON.stringify(users), (err,data) => {
        res.status(201).json(body)
    })
})

router.route("/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user =  users.find(user => user.id === id)
        user !== undefined ? res.json() : res.status(404).send("Not Found");
    })
    .patch((req, res) => {
        const id = Number(req.params.id)
        const body = req.body;
        body.id = id;
        let allUsersExcept = users.filter(user => user.id !== id);
        allUsersExcept.push(body);
        fs.writeFile("../mock.json", JSON.stringify(allUsersExcept), (err,data) => {
            res.status(203).json(body)
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        let allUsersExcept = users.filter(user => user.id !== id);
        fs.writeFile("../mock.json", JSON.stringify(allUsersExcept), (err,data) => {
            res.status(203).json({status: "success", users: allUsersExcept})
        })
    })


module.exports = router;