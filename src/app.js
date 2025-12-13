const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const app = express();


app.get("/user",(err,req,res,next)=>{
    try {
        throw new Error("sdkgj")
        res.send("User data send");
    } catch (error) {
        res.status(500).send("SOme error")
    }
})

app.get("/about",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");
    }
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   