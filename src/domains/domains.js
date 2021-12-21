const {response} = require("../helpers/response");
const {connectToDatabase} = require("../services/database/db");
const domainService = require('../services/domain-services/domain-service');

module.exports.createComment = async (event, context) => {
    try {
        const {URL, isLike, text, author} = JSON.parse(event.body);

        context.callbackWaitsForEmptyEventLoop = false;
        await connectToDatabase()

        const newComment = await domainService.create({URL, isLike, text, author})

        return response(200, {data: newComment})

    } catch (e) {
        return response(403, {error: e})
    }
};


module.exports.getDomains = async (event, context) => {
    try {
        const {URL} = JSON.parse(event.body);
        context.callbackWaitsForEmptyEventLoop = false;

        const Domain = await domainService.getDomains({URL})

        return response(200, {body: Domain || []})
    } catch (e) {
        return response(403, {error: e})
    }
}
