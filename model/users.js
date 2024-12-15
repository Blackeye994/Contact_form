const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    emails: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        default: "motorcyle",
        minlength: 6,
        trim: true,
    },
});
UserSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
        console.log("user password: ", user.password);
    }
    next();
})

let User = mongoose.model("User", UserSchema);

module.exports = User;