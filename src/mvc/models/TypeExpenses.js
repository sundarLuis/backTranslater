const {Schema, model } =require('mongoose')

const typeExpensesSchema = new Schema({
    name:{type:String,required:true},
})

module.exports = model('TypeExpenses',typeExpensesSchema)