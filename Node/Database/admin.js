const mongoose=require('mongoose')

let adminSchema = new mongoose.Schema({
    id:String,
    password:String
})

module.exports = mongoose.model('admin',adminSchema)