const {Schema,model} = require('mongoose')

const translationSchema = new Schema({
    'translation':String,
    'status':Number
})
module.exports = model('translation',translationSchema)