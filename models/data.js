const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name: { type: String, trim: true, default: '' },
    lastName: { type: String, trim: true, default: '' },
    age: { type: Number, default: 0 }
})

module.exports = mongoose.model('Person', model)