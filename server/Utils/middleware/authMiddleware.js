import jwt from "jsonwebtoken";
import rolesPermissions from "@/config/user_permissions.json";

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { isValid: true, isExpired: false, decoded: decoded.user };
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return { isValid: false, isExpired: true, decoded: null };
    }
    return { isValid: false, isExpired: false, decoded: null };
  }
};

const hasAccess = (role, route) => {
  const permissions = rolesPermissions[role] || [];
  return permissions.includes("*") || permissions.includes(route);
};

export const withAuth = (handler) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { isValid, isExpired, decoded } = verifyToken(token);

    if (isExpired) {
      return res.status(401).json({ message: "Token expired" });
    }

    if (!isValid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!hasAccess(decoded?.role, req.url)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return handler(req, res);
  };
};
