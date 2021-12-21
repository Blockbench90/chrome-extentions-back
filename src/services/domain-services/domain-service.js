const DomainsModel = require("../../models/domain.model");
const {connectToDatabase} = require("../database/db");

class DomainService {
    async create({URL, isLike, text, author}) {
        await connectToDatabase()
        const existDomain = await DomainsModel.findOne({URL})
        if (existDomain) {
            const likesCount = existDomain.likesCount + 1
            const like = isLike ? existDomain.like + 1 : existDomain.like
            const dislike = isLike ? existDomain.dislike : existDomain.dislike + 1
            const updatedDomain = await DomainsModel.findOneAndUpdate({URL}, {
                    $set: {URL, likesCount, like, dislike}, $push: {comments: {text, author}}
                },
                {new: true});
            return updatedDomain
        }

        const newDomain = await DomainsModel.create({URL, likesCount: 1, like: isLike ? 1 : 0, dislike: isLike ? 0 : 1, comments: {text, author}})

        return newDomain
    }

    async getDomains({URL}) {
        await connectToDatabase()
        const Domains = await DomainsModel.findOne({URL})

        return Domains
    }
}

module.exports = new DomainService();
