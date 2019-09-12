var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    color: String,
    tasks: []
});

module.exports = mongoose.model("List", ListSchema);