const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../../utils/jwt");
const controllerExpenses = require("../controllers/expenses.controllers");

router.get("/",verifyToken, controllerExpenses.getExpenses);
router.get("/:id",verifyToken, controllerExpenses.getExpensesOne);
router.post("/", verifyToken,controllerExpenses.postExpenses);
router.put("/:id",verifyToken, controllerExpenses.putExpenses);
router.delete("/:id",verifyToken, controllerExpenses.deleteExpenses);

module.exports = router;
