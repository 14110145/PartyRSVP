require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, access denied." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token." });
  }
};

module.exports = auth;
