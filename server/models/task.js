var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 15,
        required: true
    },
    list: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Task", TaskSchema);