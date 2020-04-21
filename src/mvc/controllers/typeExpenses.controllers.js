const TypeExpenses = require('../models/TypeExpenses')
function resError(res,e,obj){
  //  console.log(e)
    return res.status(400).json(obj)
}

module.exports = {
    getTypeExpenses: async function(req, res){
        try {
            const category = await TypeExpenses.find()
            return res.status(200).json(category)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    postTypeExpenses:async function(req,res){
        try {
            const {name } = req.body
            if(name.length < 1 ) {
                resError(res,error,{error:'empty fields'})
            }
            const newTypeExpenses = new TypeExpenses({name})
            const typeExpenses = await newTypeExpenses.save()
            res.status(200).json(typeExpenses)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    getTypeExpensesOne: async function(req,res){
        try {
            const {id} = req.params
            const typeExpenses = await TypeExpenses.findById(id)
            if(typeExpenses != null){
                res.status(200).json(typeExpenses)
            }else{
                res.status(401).json({error:'Was not found category with that id'})
            }
        } catch (error) {
            resError(res,error,{status:"error"})
       }
    },
    putTypeExpenses: async function(req,res){
        try {
            const { id } = req.params;
            const typeExpensesBody = {
                name: req.body.name,
            }
            const typeExpenses = await TypeExpenses.findByIdAndUpdate(
                id,
                {$set: typeExpensesBody},
                {new: true}
            )
            res.status(200).json(typeExpenses)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    deleteTypeExpenses: async function(req,res){
        try {
            const id = req.params.id
            await TypeExpenses.findByIdAndRemove(id)
            res.status(200).json({error:'deleted successfull'})
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    }
}