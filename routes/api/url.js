const router = require("express").Router();
const {restrictToLoggedInUsersOnly} = require("../../middlewares/auth");
const {
    generateNewShortUrl,
    getAnalyticsForShortId
} = require("../../controllers/url");

router.route("/")
    .post(restrictToLoggedInUsersOnly,generateNewShortUrl);
router.route("/analytics/:shortId")
    .get(restrictToLoggedInUsersOnly,getAnalyticsForShortId)

/*router.route("/:id")
    .get(handleGetUser)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);*/


module.exports = router;