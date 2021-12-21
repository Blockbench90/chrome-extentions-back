const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    nickName: {type: String, required: true},
    timestamp: {type: String, default: new Date().toISOString()},
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema.index({'$**': 'text'}));