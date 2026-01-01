const User = require("../models/user")
const jwt = require("jsonwebtoken")
const userAuth = async (req,res,next)=>{
 try {
     const cookies = req.cookies;
  const {token} = cookies;
  if(!token){
    throw new Error("invalid token");
  }

  const decodedMessage = await jwt.verify(token,"key123");

  const {_id} = decodedMessage; 

  const user = await User.findById(_id)
  if(!user){
    throw new Error("user not found");
  }

  req.user = user;
    next();    
 } catch (error) {
    res.status(400).send("Error "+error.message)
 }
}





module.exports = {
    userAuth
}