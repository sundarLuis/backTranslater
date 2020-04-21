const { Router } = require("express")
const router = Router()

const controllerTypeExpenses = require("../controllers/typeExpenses.controllers")
const {verifyToken} = require('../../utils/jwt')

router.get("/",verifyToken, controllerTypeExpenses.getTypeExpenses)
router.get("/:id",verifyToken, controllerTypeExpenses.getTypeExpensesOne)
router.post("/",verifyToken, controllerTypeExpenses.postTypeExpenses)
router.put("/:id",verifyToken, controllerTypeExpenses.putTypeExpenses)
router.delete("/:id",verifyToken, controllerTypeExpenses.deleteTypeExpenses)

module.exports = router;