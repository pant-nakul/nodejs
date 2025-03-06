const {nanoid} = require('nanoid');
const Url = require('../models/Url');
const url = require("node:url");

const handleUserSignup = async (req, res) => {
    const body = req.body;
    console.log(req.body);
}


const handleLogin = async (req, res) => {

}

const handleLogout = async (req, res) => {

}

module.exports = {
    handleUserSignup,
    handleLogin,
    handleLogout
}