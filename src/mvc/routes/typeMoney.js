const { Router } = require("express")
const router = Router()

const controllerCategory = require("../controllers/typeMoney.controllers")
const {verifyToken} = require('../../utils/jwt')

router.get("/", controllerCategory.getTypeMoney)
router.get("/:id",verifyToken, controllerCategory.getTypeMoneyOne)
router.post("/",verifyToken, controllerCategory.postTypeMoney)
router.put("/:id",verifyToken, controllerCategory.putTypeMoney)
router.delete("/:id",verifyToken, controllerCategory.deleteTypeMoney)

module.exports = router;
