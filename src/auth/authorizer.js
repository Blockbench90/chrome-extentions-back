'use strict';
const jwt = require('jsonwebtoken');
const {response} = require("../helpers/response")
const userService = require('../services/user-services/user-service');
const UserDto = require("../dtos/user-dto");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const {connectToDatabase} = require("../services/database/db");
const UserModel = require('../models/user.model');
const Me = require("../services/me/me")

function signToken(email, isRememberMe) {
    if (isRememberMe) {
        return jwt.sign({email}, 'secret', {
            expiresIn: '365d' // expires in 365 days
        });
    }
    return jwt.sign({email}, 'secret', {
        expiresIn: 86400 // expires in 24 hours
    });
}

module.exports.login = async (event, context) => {
    const {email, password, isRememberMe} = JSON.parse(event.body);
    context.callbackWaitsForEmptyEventLoop = false;
    await connectToDatabase()

    const user = await UserModel.findOne({email})
    if (!user || user.isDisabled) {
        return response(400, {error: "User with this email is not registered"})
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        return response(400, {error: `Wrong password or email`})
    }

    const userData = new UserDto(user);
    if (userData) {
        return response(200, {user: userData, token: signToken(email, isRememberMe)})
    } else {
        return response(403, {error: 'Wrong password or email'})
    }
}

module.exports.registration = async (event, context) => {
    try {
        const {email, familyName, givenName, imageUrl, name} = JSON.parse(event.body);
        const isEmailValid = validateEmail(email)
        if (!isEmailValid) {
            return response(400, {error: `Please fill a valid email address`})
        }
        context.callbackWaitsForEmptyEventLoop = false;
        await connectToDatabase()

        const candidate = await UserModel.findOne({email})

        if (candidate) {
            const user = new UserDto(candidate)
            return response(200, {user: user, token: signToken(email)})
        }

        const userData = await userService.registration({email, familyName, givenName, imageUrl, name});
        const user = new UserDto(userData)

        return response(200, {user: user, token: signToken(email)})
    } catch (e) {
        return response(403, {error: e})
    }
};

module.exports.me = async (event, context) => {
    try {
        context.callbackWaitsForEmptyEventLoop = false;

        const splitToken = event.headers.Authorization.split('Bearer');
        if (splitToken.length !== 2) {
            if (process.env.DEBUG === 'true') {
                console.log('AUTH: no token in Bearer');
            }
            return response(401, {message: 'Unauthorized'});
        }

        const token = splitToken[1].trim();
        const email = await jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return response(401, 'Unauthorized');
            }
            return decoded.email
        });

        const user = await Me.fetchMe(email)

        if (!user) {
            return response(401, {error: "Unauthorized"})
        }

        return response(200, {data: user})
    } catch (e) {
        return response(403, {error: e})
    }
};


