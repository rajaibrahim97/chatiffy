import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import path from "path";
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express()
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;


app.use(express.json())  //req.bdy
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

// make ready fo deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    // use a RegExp catch-all (bypasses path-to-regexp string parser)
    app.get(/.*/, (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
} 

app.listen(PORT,()=>{
    console.log("Server is running on port 3000"+PORT);
    connectDB();
})