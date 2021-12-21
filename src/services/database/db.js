"use strict";
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

const uri = "mongodb://127.0.0.1:27017/chrome"
module.exports.connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }
    console.log('=> using new database connection');
    return mongoose.connect(uri).then(db => {
        console.log("DB connected...")
        isConnected = db.connections[0].readyState;
    });
};