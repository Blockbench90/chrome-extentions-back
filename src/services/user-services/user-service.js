const UserModel = require('../../models/user.model');
const bcrypt = require('bcrypt');
const UserDto = require("../../dtos/user-dto");
const {response} = require("../../helpers/response");

class UserService {
    async registration({email, familyName, givenName, imageUrl, name}) {

        const user = await UserModel.create({email, familyName, givenName, imageUrl, name})

        return user
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            return response(400, {error: `Wrong password or email`})
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return response(400, {error: `Wrong password or email`})
        }

        return new UserDto(user); // id, email,
    }
}

module.exports = new UserService();
