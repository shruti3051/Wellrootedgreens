const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)

        .json({ message: "Not authorized No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "user no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("ERROR MESSAGE:", error.message);

    return res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};

module.exports = protect;
