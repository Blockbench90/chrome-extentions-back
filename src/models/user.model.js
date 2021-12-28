const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    familyName: {type: String, required: true},
    givenName: {type: String, required: true},
    imageUrl: {type: String, required: true},
    name: {type: String, required: true},
    timestamp: {type: String, default: new Date().toISOString()},
})
module.exports = mongoose.models.User || mongoose.model('User', UserSchema.index({'$**': 'text'}));
