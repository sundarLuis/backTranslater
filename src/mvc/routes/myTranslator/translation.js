const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../../../utils/jwt");
const controller = require("../../controllers/myTranslator/translation.controllers");

router.get("/", controller.getAll_);
router.get("/:id", controller.getOne_);
router.post("/",controller.post_);
router.put("/:id", controller.put_);
router.delete("/:id", controller.delete_);

module.exports = router;