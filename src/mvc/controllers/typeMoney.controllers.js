const TypeMoney = require('../models/typeMoney')
function resError(res,e,obj){
  //  console.log(e)
    return res.status(400).json(obj)
}

module.exports = {
    getTypeMoney: async function(req, res){
        try {
            const typeMoney = await TypeMoney.find()
            return res.status(200).json(typeMoney)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    postTypeMoney:async function(req,res){
        try {
            const {name} = req.body
            if(name.length < 1 ) {
                resError(res,false,{error:'empty fields'})
            }
            const newTypeMoney = new TypeMoney({name})
            const typeMoney = await newTypeMoney.save()
            res.status(200).json(typeMoney)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    getTypeMoneyOne: async function(req,res){
        try {
            const {id} = req.params
            const typeMoney = await TypeMoney.findById(id)
            if(typeMoney != null){
                res.status(200).json(typeMoney)
            }else{
                res.status(401).json({error:'Was not found category with that id'})
            }
        } catch (error) {
            resError(res,error,{status:"error"})
       }
    },
    putTypeMoney: async function(req,res){
        try {
            const { id } = req.params;
            const typeMoneyBody = {
                name: req.body.name,
            }
            const typeMoney = await TypeMoney.findByIdAndUpdate(
                id,
                {$set: typeMoneyBody},
                {new: true}
            )
            res.status(200).json(typeMoney)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    deleteTypeMoney: async function(req,res){
        try {
            const id = req.params.id
            await TypeMoney.findByIdAndRemove(id)
            res.status(200).json({error:'deleted successfull'})
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    }
}