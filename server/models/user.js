var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 300,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1500,
        required: true,
    }
});

module.exports = mongoose.model("User", UserSchema);