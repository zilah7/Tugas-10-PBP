const check = require("express-validator").check;

const userLoginValidation = [
  check("email").notEmpty().withMessage("Email harus diisi!"),
  check("password").notEmpty().withMessage("Password harus diisi!"),
];
module.exports = userLoginValidation;