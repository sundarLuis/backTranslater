const {Schema,model} = require('mongoose')

const listSchema = new Schema({
    'type':{type:String},
    'language':{type:String},
    'content':{type:String},
    'ids_translation':[{type: Schema.ObjectId, ref: 'translation' }],
    'status':{type:Number},//0=pending,1=learned
    'statusCreating':Boolean,
    updated: { type: Date, default: Date.now },

})
module.exports = model('list',listSchema)