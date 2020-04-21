
const Translation = require('../../models/myTranslator/translation')
function resError(res,e,obj){
  //  console.log(e)
    return res.status(400).json(obj)
}

module.exports = {
    getAll_: async function(req, res){
        try {
            const getAll = await Translation.find()
            return res.status(200).json(getAll)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    post_:async function(req,res){
        try {
            const body = req.body
            body.status = 0
            console.log('post_ body 1',req.body)
            const _new = new Translation(body)
            console.log('post_ body',_new)
            const post = await _new.save()
            console.log('post_',post)
            res.status(200).json(post._id)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    getOne_: async function(req,res){
        try {
            const {id} = req.params
            const getOne = await Translation.findById(id)
            if(getOne != null){
                res.status(200).json(getOne)
            }else{
                res.status(401).json({error:'Was not found type with that id'})
            }
        } catch (error) {
            resError(res,error,{status:"error"})
       }
    },
    put_: async function(req,res){
        try {
            const { id } = req.params;
            const Body = req.body
            const put = await Translation.findByIdAndUpdate(
                id,
                {$set: Body},
                {new: true}
            )
            res.status(200).json(put)
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    },
    delete_: async function(req,res){
        try {
            const id = req.params.id
            await Translation.findByIdAndRemove(id)
            res.status(200).json({error:'deleted successfull'})
        } catch (error) {
            resError(res,error,{status:"error"})
        }
    }
}