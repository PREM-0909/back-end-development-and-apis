import express from "express";
import { findByUsername } from "../utils/db.js";
import { signToken } from "../utils/jwt.js";
const router = express.Router();

router.post("/login" , (req, res) => {
    const { username , password } = req.body;

    if(!username || !password){
       return res.status(400).json({message : "please fill all the credentails"})
    }

    const user = findByUsername(username);
    if(!user){
        return res.status(401).json({message : "incorrect credentials"});
    }

    if(password !== user._password){
        return res.status(401).json({message : "incorrect credentials"});
    }

    const token = signToken({
        id : user.id,
        name : user.name,
        username : user.username,
        role : user.role
    });

    res.status(200).json({token , message : "login succesful"});
})

export default router