const List = require("../../models/myTranslator/list");
const Translation = require("../../models/myTranslator/translation");
function resError(res, e, obj) {
  console.log(e);
  return res.status(400).json(obj);
}

module.exports = {
  getAll_: async function(req, res) {
    try {
      const getAll = await List.find()
        .populate("ids_translation")
        .sort({ updated: -1 });
      return res.status(200).json(getAll);
    } catch (error) {
      resError(res, error, { status: "error" });
    }
  },
  post_: async function(req, res) {
    try {
      const body = req.body;
      body.status = 0;
      const _new = new List(body);
      const post = await _new.save();
      res.status(200).json(post);
    } catch (error) {
      resError(res, error, { status: "error" });
    }
  },
  getOne_: async function(req, res) {
    try {
      const { id } = req.params;
      const getOne = await List.findById(id).populate("ids_translation");
      if (getOne != null) {
        res.status(200).json(getOne);
      } else {
        res.status(401).json({ error: "Was not found type with that id" });
      }
    } catch (error) {
      resError(res, error, { status: "error" });
    }
  },
  put_: async function(req, res) {
    try {
      const { id } = req.params;
      const Body = req.body;
      const put = await List.findByIdAndUpdate(
        id,
        { $set: Body },
        { new: true }
      );
      res.status(200).json(put);
    } catch (error) {
      resError(res, error, { status: "error" });
    }
  },
  delete_: async function(req, res) {
    try {
      const id = req.params.id;
      await List.findByIdAndRemove(id);
      res.status(200).json({ error: "deleted successfull" });
    } catch (error) {
      resError(res, error, { status: "error" });
    }
  },
  search_: async function(req, res) {
    try {
      const word = req.params.id;
      const translation_ids = []
      const searchTrasnlation = []
      let response1  = ''
      const translationResponse = await Translation.find({
        translation: { $regex: ".*" + word + ".*" }
      })
      const response2 = await List.find({
        content: { $regex: ".*" + word + ".*" }
      }).populate("ids_translation")

      if(translationResponse.length >=1){
          for (let element of translationResponse) {
          translation_ids.push(element._id)
        }
      }
      for (let element of translation_ids) {
        response1 = await List.findOne(
          {ids_translation:element} 
          ) .populate("ids_translation");
         if(response1){
           searchTrasnlation.push(response1)
         }
      }
      res.status(200).json({"List":response2,"Translation":searchTrasnlation});
    } catch (error) {
      resError(res, error, { status: "error" });
    }
  },
  filter_: async function(req, res) {
      const item = req.body
      filter = {}
      if(item.language)
      {
          filter.language = item.language
      } if (item.type)(
        filter.type = item.type
      )
      const response = await List.find(filter)
      res.status(200).json(response);
  }
};
