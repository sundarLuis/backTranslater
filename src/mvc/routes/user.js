const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../../utils/jwt");
const controllerUser = require("../controllers/user.controllers");


router.post("/signUp", controllerUser.signUp);
router.post("/signIn", controllerUser.signIn);
router.get("/",verifyToken, controllerUser.users);
router.get("/:id", verifyToken, controllerUser.userOne);
router.put("/:id", verifyToken, controllerUser.editUser);
router.delete("/:id", verifyToken, controllerUser.deleteUser);
router.get("/tokenId/:token", verifyToken, controllerUser.tokenId);

module.exports = router;
