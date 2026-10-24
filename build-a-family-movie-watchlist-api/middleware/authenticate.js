import { verifyToken } from "../utils/jwt.js";
import { isBlacklisted } from "../utils/blacklistedToken.js";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({  error: "No token provided."  })
    }

    const token = authHeader.split(" ")[1];

    if (!token || isBlacklisted(token)) {
        return res.status(401).json({ error: "No token provided." });
    }
    const verifiedToken = verifyToken(token);

    if (!verifiedToken) {
        return res.status(401).json({ error: "Invalid or expired token." })
    }

    req.user = verifiedToken;
    next();
}