module.exports = class UserDto {
    email;
    id;
    nickName;
    timestamp;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.nickName = model.nickName;
        this.timestamp = model.timestamp;
    }
}
