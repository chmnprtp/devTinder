const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const validateSignupData = require("./utils/validation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/userAuth")

const app = express();
app.use(express.json()) // to convert json to object in node
app.use(cookieParser())

app.post("/signup", async (req,res)=>{
    try {
          // validation of data
        validateSignupData(req);
          // encrypted password

        const {firstName,lastName,emailId,password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
          
          // creating instance of user model
        const user = new User({firstName,lastName,emailId,password:passwordHash});
        await user.save();
        res.send("User added successfully");
    } catch (error) {
        res.status(400).send("User not added "+error.message);
    }
})

app.post("/login",async(req,res)=>{
    try {
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

            // create a JWT token
            const token = await user.getJWT();
            //add the token to cookie and send the response back to user
            res.cookie("token",token);
            res.send("Login Successfull")
        }
        else{
            throw new Error("Invalid credentials")
        }

    } catch (error) {
        res.status(400).send("some error "+ error.message)
    }
    
})

app.get("/profile",userAuth, async(req,res)=>{

  try {
   res.send(req.user);
  } catch (error) {
    res.status(400).send("Error" + error.message)
  }
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    try {
        const user = req.user
         
    res.send(user.firstName+ " Sent connection request")
    } catch (error) {
        res.status(400).send("Error "+error.message);
    }
})

// get user by email
app.get("/user", async(req,res)=>{
    const email = req.body.emailId

    try {
        const userEmail = await User.find({emailId:email})
        if(userEmail === 0){
            res.send("NO email")
        }else{
            res.send(userEmail);
        }
    } catch (error) {
        res.status(404).send("Email not found")
    }
})

app.get("/feed", async(req,res)=>{
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).send("Something went wrong")
    }
})

app.delete("/user", async(req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted")
    } catch (error) {
        res.status(400).send("Something not right");
    }
})

app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

        try {
            const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"]
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        )
        if(!isUpdateAllowed){
            throw new Error("update no allowed")
        }
        if(data?.skills.length > 10){
            throw new Error("skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate(userId,data,{runValidators:true})
        // await user.save();
        res.send("user updated");
    } catch (error) {
        res.status(400).send("Something not right"+error.message);
    }
})


// app.get("/userId",async(req,res)=>{
//     const userId = req.body.userId;
//     try {
//         const user = await User.findById(userId)
//     } catch (error) {
//         res.status(404).send("something went wrong");
//     }
// })

connectDB().then(()=>{ //first connect the database then start server
    console.log("Database established");
    app.listen(7777,()=>{
        console.log("Server is running");
    })
}).catch(()=>{
    console.log("Database not connected");
})