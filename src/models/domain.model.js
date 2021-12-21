const mongoose = require('mongoose');

const DomainsSchema = new mongoose.Schema({
    URL: {type: String},
    likesCount: {type: Number},
    like: {type: Number},
    dislike: {type: Number},
    comments: [{
        id: {type: String},
        text: {type: String},
        author: {type: String},
        timestamp: {type: String, default: new Date().toISOString()},
    }],
    timestamp: {type: String, default: new Date().toISOString()},
})

module.exports = mongoose.models.Domains || mongoose.model('Domains', DomainsSchema.index({'$**': 'text'}));