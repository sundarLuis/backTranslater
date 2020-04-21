const Expenses = require('../models/Expenses')
const TypeMoney = require('../models/typeMoney')
const TypeExpenses = require('../models/TypeExpenses')
function resError(res,e,obj){
  if(e.message) console.log(e.message)
    return res.status(400).json(obj)
};
async function validateIdCategory(id_TypeMoney){
    try {
     const validateTypeMoney = await TypeMoney.findById(id_TypeMoney)
     if(validateTypeMoney != null){
        return true
     }else{
        return false
     }
    } catch (error) {
        return false
    }
};
async function validateIdTypeExpenses(id_category){
    try {
     const validateTypeExpenses = await TypeExpenses.findById(id_category)
     if(validateTypeExpenses != null){
        return true
     }else{
        return false
     }
    } catch (error) {
        return false
    }
};

module.exports = {
    getExpenses: async function(req, res){
        try {
            const expenses = await Expenses.find().populate('id_typeMoney').populate('id_typeExpenses')
            return res.status(200).json(expenses)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    postExpenses:async function(req,res){
        try {
            const {id_typeMoney, id_typeExpenses,description,url, price   } = req.body
            const validate_idCategory = await validateIdCategory(id_typeMoney)
            const validate_idTypeExpenses = await validateIdTypeExpenses(id_typeExpenses)
            if(validate_idCategory === false) return resError(res,false,{error:" there is no such category"})
            if(validate_idTypeExpenses === false) return resError(res,false,{error:" there is no such type expense"})
            
            if(description.length < 1 || price == null) {
              return resError(res,false,{error:'empty fields'})
            }
            const newExpenses = new Expenses({id_typeMoney, id_typeExpenses,description,url, price })
            const expenses = await newExpenses.save()
            res.status(200).json(expenses)
        } catch (error) {
            console.log(error)
            resError(res,error,{status:"error"})
        }
    },
    getExpensesOne: async function(req,res){
        try {
            const { id } = req.params
            const expenses = await Expenses.findById(id).populate('id_category').populate('id_typeExpenses')
            if(expenses == null) return resError(res,false,{ error: `Was not found with that id`})
            return res.status(200).json(expenses)
        } catch (error) {
            resError(res,error,{status:"error"})
       }
    },
    putExpenses: async function(req,res){
        try {
            const { id } = req.params;
            const expensesBody = {
                id_typeMoney: req.body.id_typeMoney,
                id_typeExpenses:req.body.id_typeExpenses,
                description: req.body.description,
                url:req.body.url,
                price: req.body.price,
            }
            const validate_idExpenses = await validateIdCategory(expensesBody.id_category)
            if(validate_idExpenses === false) return resError(res,false,{error:" there is no such category"})
            
            const expenses = await Expenses.findByIdAndUpdate(
                id,
                {$set: expensesBody},
                {new: true}
            )
            res.status(200).json(expenses)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    deleteExpenses: async function(req,res){
        try {
            const id = req.params.id
            await Expenses.findByIdAndRemove(id)
            res.status(200).json({description:'deleted successfull'})
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    }
}