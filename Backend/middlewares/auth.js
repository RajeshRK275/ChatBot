const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied.");

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token.");
    req.user = user; // Attach user info to request
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.userAccess !== "admin") {
    return res.status(403).send("Access denied: Admins only.");
  }
  next();
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userAccess)) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};

module.exports = { authenticate, verifyAdmin, authorize };
