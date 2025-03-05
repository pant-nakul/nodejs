const users = require("../../mock.json");
const fs = require("fs");
const router = require("express").Router();
const {
    handleGetAllUsers,
    handleGetUser,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser
} = require("../../controllers/user");

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser);

router.route("/:id")
    .get(handleGetUser)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);


module.exports = router;