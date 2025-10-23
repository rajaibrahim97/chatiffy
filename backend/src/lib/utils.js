import jwt from "jsonwebtoken";

export const generateToken = (userId, res) =>{
    // Check if jwt secret exists or not
    const { JWT_SECRET } = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_secret is not configured")
    }
    // first generate the token for userId get the the jwt secret from env
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d",})
    // sending back in form of cookie 
    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 *1000, // MS
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
}