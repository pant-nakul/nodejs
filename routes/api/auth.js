const router = require("express").Router();

const {
    handleLogin,
    handleLogout
} = require("../../controllers/auth");

router.route("/login")
    .post(handleLogin);
router.route("/logout")
    .post(handleLogout)



module.exports = router;