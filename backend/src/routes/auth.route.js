import express from 'express';
import { signup } from "../controller/auth.controler.js"

const router = express.Router();

router.post("/signup",signup)

router.get("/login",(req,res)=>{
    res.send("Login endpoint")
})

router.get("/logout",(req,res)=>{
    res.send("Logout endpoint")
})

export default router;


