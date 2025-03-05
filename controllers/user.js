const User = require('../models/user');

const handleGetAllUsers = async (req, res) => {
    res.send(await User.find());
}
const handleGetUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    user !== undefined ? res.json(user) : res.status(404).send("Not Found");
}

const handleCreateUser = async (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title){
        return res.status(400).send("Please enter all fields")
    }
    const user = await User.create(body);
    res.status(201).json(user);
}

const handleUpdateUser = async (req, res) => {
    const body = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, body);
    res.status(203).json(user)
}

const handleDeleteUser = async (req, res) => {
    await User.deleteOne({_id: req.params.id})
    res.status(203).json({status: "success", msg: "User Deleted"})
}

module.exports = {
    handleGetAllUsers,
    handleGetUser,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser
}