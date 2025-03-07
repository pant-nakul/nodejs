const router = require("express").Router();
const {checkForAuthenticationCookie, checkForAuthentication} = require("../../middlewares/auth");
const {
    generateNewShortUrl,
    getAnalyticsForShortId
} = require("../../controllers/url");

router.route("/")
    .post(checkForAuthenticationCookie,generateNewShortUrl);
router.route("/analytics/:shortId")
    .get(checkForAuthenticationCookie,getAnalyticsForShortId)

/*router.route("/:id")
    .get(handleGetUser)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);*/


module.exports = router;