const Joi = require('joi');
const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
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

function validateList(list) {
    const schema = {
      userId: Joi.required(),
      name: Joi.string().min(1).max(100).required()
    };
  
    return Joi.validate(list, schema);
}
  
module.exports.validate = validateList;
module.exports.List = mongoose.model("List", ListSchema);