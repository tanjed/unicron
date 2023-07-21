const mongoose = require('mongoose')

const businessSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    mobile : {
        type : String,
        required : true,
    }
})



module.exports = new mongoose.model('Business', businessSchema)