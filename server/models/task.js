const Joi = require('joi');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlength: 15,
        required: true
    },
    list: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'List',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

function validateTask(task) {
    const schema = {
      userId: Joi.required(),
      name: Joi.string().min(1).max(15).required(),
      list: Joi.required(),
      deadline: Joi.date().required(),
      done: Joi.boolean()
    };
  
    return Joi.validate(task, schema);
}
  
  
module.exports.validate = validateTask;
module.exports.Task = mongoose.model("Task", TaskSchema);