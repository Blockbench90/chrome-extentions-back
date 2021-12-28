module.exports = class UserDto {
    email;
    familyName;
    givenName;
    imageUrl;
    name;
    id;
    timestamp;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.familyName = model.familyName;
        this.givenName = model.givenName;
        this.imageUrl = model.imageUrl;
        this.name = model.name;
        this.timestamp = model.timestamp;
    }
}
