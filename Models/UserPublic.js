const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userPublicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
    acstatus: { type: String, default: "De-activated" },
});

userPublicSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
    });
    return token;
};

const UserPublic = mongoose.model("userpublic", userPublicSchema);

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { UserPublic, validate };