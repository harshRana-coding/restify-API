const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    balance : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model('customer',customer);