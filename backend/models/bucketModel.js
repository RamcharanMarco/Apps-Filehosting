const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bucketSchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
},
{timestamps: true})

module.exports = mongoose.model('bucket', bucketSchema)
