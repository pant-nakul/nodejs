const {nanoid} = require('nanoid');
const Url = require('../models/Url');
const url = require("node:url");

const generateNewShortUrl = async (req, res) => {
    const body = req.body;
    console.log(req.body);
    console.log(req);
    if(!body || !body.url){
        return res.status(400).send({status: "ERROR", message: 'Url is Required' });
    }
    const shortId =  nanoid(8);
    console.log(Url)
    await Url.create({
        shortId : shortId,
        redirectUrl: body?.url,
        visitHistory :[]
    });
    res.redirect("/");
}


const getAnalyticsForShortId = async (req, res) => {
    const shortId = req.params.shortId;
    const url = await Url.findOne({shortId})
    return res.status(200).json({totalVisits: url.visitHistory ? url.visitHistory.length : 0 , analytics : url.visitHistory});
}

module.exports = {
    generateNewShortUrl,
    getAnalyticsForShortId
}