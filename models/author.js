const mongoose = require('mongoose')

const authorSchema = new mongoose.Scheme({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Author', authorSchema)