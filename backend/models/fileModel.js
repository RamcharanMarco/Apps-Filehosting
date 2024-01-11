const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    bucket_id:{
        type: String,
    },
    filename:{
        type: String,
    },
    path:{
        type: String,
    },
    download:{
        type: String,
    },
    mimetype:{
        type: String,
    },
},
{timestamps: true})

module.exports = mongoose.model('file', fileSchema)

