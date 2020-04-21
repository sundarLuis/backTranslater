const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../../../utils/jwt");
const controller = require("../../controllers/myTranslator/list.controllers");

router.get("/", controller.getAll_);
router.get("/:id", controller.getOne_);
router.get("/search/:id", controller.search_);
router.post("/filter",controller.filter_);
router.post("/",controller.post_);
router.put("/:id", controller.put_);
router.delete("/:id", controller.delete_);

module.exports = router;