const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    console.log("token:", token)
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, 'romnickpogi');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware