const express = require("express");
const app = express();
const  {adminAuth} = require("./middlewares/auth")

app.use("/admin",adminAuth)

app.get("/admin/alluser",(req,res)=>{
    res.send("Admin is authenticated");
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   