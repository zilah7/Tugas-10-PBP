const express = require("express");
const {
  userRegister,
  userLogin,
  userUpdate,
} = require("../controllers/userController");
const userRegisterValidation = require("../middlewares/userRegisterValidation");
const userLoginValidation = require("../middlewares/userLoginValidation");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", userRegisterValidation, userRegister);
router.post("/login", userLoginValidation, userLogin);
router.put("/update/:id", verifyToken, userUpdate);
module.exports = router;