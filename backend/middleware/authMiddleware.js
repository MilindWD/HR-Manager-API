const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler( async (req, res, next) => {
  let token;
  console.log(req.body);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else {
    res.status(401);
    throw new Error("No authorization token found");
  }
});

module.exports = { protect };
