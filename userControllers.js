const { validationResult } = require("express-validator");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const secretkey = "rahasiabanget!";

const userRegister = (req, res) => {
  const { email, username, password } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      valtidationMessages: result.array().map((err) => ({ message: err.msg })),
    });
  }
  const sql = `INSERT INTO user (email, username, password) VALUES (?, ?, ?)`;
  db.query(sql, [email, username, password]);
  res.status(201).json({ message: "Data berhasil didaftarkan!" });
};

const userLogin = (req, res) => {
  const { email } = req.body;
  const currentTime = Math.floor(Date.now() / 1000);
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      valtidationMessages: result.array().map((err) => ({ message: err.msg })),
    });
  }
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      return res
        .status(400)
        .json({ message: "Email belum ada, silahkan daftar!" });
    }
    console.log(result[0]);
    const { id, email, username, password } = result[0];
    const user = {
      userId: id,
      username: username,
      iat: currentTime,
    };
    console.log({ user });
    const token = jwt.sign(user, secretkey, { expiresIn: "1h" });
    console.log({ token });
    const decodedToken = jwt.decode(token, secretkey);
    console.log({ decodedToken });
    res.status(200).json({ token: token });
  });
};

const userUpdate = (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const sql = "UPDATE user SET email = ? WHERE id = ?";
  db.query(sql, [email, id], (err, result) => {
    if (err) throw err;
    return res.status(200).json({ message: "Email berhasil diupdate" });
  });
};
module.exports = { userRegister, userLogin, userUpdate };