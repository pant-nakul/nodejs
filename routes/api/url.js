const router = require("express").Router();

const {
    generateNewShortUrl,
    getAnalyticsForShortId
} = require("../../controllers/url");

router.route("/")
    .post(generateNewShortUrl);
router.route("/analytics/:shortId")
    .get(getAnalyticsForShortId)

/*router.route("/:id")
    .get(handleGetUser)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);*/


module.exports = router;