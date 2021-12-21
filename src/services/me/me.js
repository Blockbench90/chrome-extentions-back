const UserModel = require('../../models/user.model');
const UserDto = require("../../dtos/user-dto");
const {connectToDatabase} = require("../database/db");

class Me {
    async fetchMe(email) {
        await connectToDatabase()
        const user = await UserModel.findOne({email})

        const userData = new UserDto(user);

        return userData
    }
}

module.exports = new Me();
