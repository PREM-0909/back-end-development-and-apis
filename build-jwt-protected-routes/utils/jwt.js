import jwt from "jsonwebtoken"

export function signToken(payload){
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    return token
}

export function verifyToken(token){
    try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload
    } catch (error) {
        return null
    }
}