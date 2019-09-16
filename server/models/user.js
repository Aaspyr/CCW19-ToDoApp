var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 10,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 20,
        required: true,
    }
});

module.exports = mongoose.model("User", UserSchema);