const db = require("../config/db");
const check = require("express-validator").check;

const userRegisterValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email harus diisi!")
    .isEmail()
    .withMessage("Gmail tidak valid"),
  check("username")
    .notEmpty()
    .withMessage("Username harus diisi!")
    .isLength({ min: 5, max: 10 })
    .withMessage("Username minimal 5 karakter dan maksimal 10 karakter")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM user WHERE username = ?",
          [value],
          (err, result) => {
            if (err) {
              return reject(new Error("Database error"));
            }
            if (result.length > 0) {
              return reject(new Error("Username sudah ada!"));
            }
            resolve(true);
          }
        );
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Password harus diisi!")
    .isLength({ min: 5, max: 10 })
    .matches(/[A-Z]/)
    .withMessage("Password harus berisi setidaknya ada satu huruf besar!")
    .matches(/[\W_]/)
    .withMessage("Password harus berisi setidaknya ada satu simbol!"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password harus diisi!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password tidak match dengan konfirmasi password");
      }
      return true;
    }),
];

module.exports = userRegisterValidation;