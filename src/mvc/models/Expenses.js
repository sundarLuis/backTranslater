const {Schema, model} = require('mongoose')

const ingressSchema = new Schema({
    id_typeMoney:[{type: Schema.Types.ObjectId, ref:"typeMoney"}],
    id_typeExpenses:[{type: Schema.Types.ObjectId, ref:"TypeExpenses"}],
    description:{type:String, required:true},
    url:{type:String, required:true},
    price:{type:Number, required:true},
})

module.exports = model('Expenses',ingressSchema)