import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log("HEADER RECEIVED:", authHeader);

  if (!authHeader) {
    return res.status(403).json({
      message: "Access Denied! No token provided.",
      success: false
    });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Access Denied! Token missing.",
      success: false
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized! JWT token wrong or expired",
      success: false
    });
  }
};

export default ensureAuthenticated;
