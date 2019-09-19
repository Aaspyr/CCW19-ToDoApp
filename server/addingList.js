var mongoose = require('mongoose');
const list = require('./models/list');

const createList = async () => {
    const newList = new List({
        userId: '',
        name: '', 
        createdAt: Date.now,
        color: '',
        tasks: []
    })
    const newListResult = await newList.save()
}

export default createList;