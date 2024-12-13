const jwt = require("jsonwebtoken");
const secretkey = "rahasiabanget!";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada" });
  }

  try {
    const decoded = jwt.verify(token, secretkey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

module.exports = verifyToken;