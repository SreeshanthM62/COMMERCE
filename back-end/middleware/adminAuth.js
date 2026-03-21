import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Check admin role
    if (decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Not Authorized, Login Again",
      });
    }

    // 5️⃣ Attach user info (optional)
    req.admin = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Not Authorized, Login Again",
    });
  }
};

export default adminAuth;
