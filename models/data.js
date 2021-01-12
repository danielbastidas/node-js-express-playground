const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: '',
        required: 'The name is mandatory',
        maxlength: 10
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        minlength: 3
    },
    age: {
        type: Number,
        required: 'The age is mandatory'
    }
})

module.exports = mongoose.model('Person', model)