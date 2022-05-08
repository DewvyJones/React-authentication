const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send({ message: "Invalid token!" });
    }
    req.user = { name: user.name, email: user.email };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error, message: "Invalid token!" });
  }
};

module.exports = {
  auth,
};
