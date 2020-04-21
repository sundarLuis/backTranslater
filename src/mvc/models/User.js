const { Schema, model} = require('mongoose')

const userSchema = new Schema({
    email:{type:String, required: true, unique:true},
    password:String
},{timestamps:true}
)

module.exports = model('User', userSchema);