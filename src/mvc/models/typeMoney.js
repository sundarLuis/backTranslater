const {Schema, model } =require('mongoose')

const typeMoneySchema = new Schema({
    name:{type:String,required:true},
})

module.exports = model('typeMoney',typeMoneySchema)