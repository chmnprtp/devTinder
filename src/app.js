const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

app.use(express.json())

app.post("/signup", async (req,res)=>{
    
  

    try {
          // validation of data
          // encrypted password
          // creating instance of user model

        const user = new User(req.body);
        await user.save();
        res.send("User added successfully");
    } catch (error) {
        res.status(400).send("User not added" +error.message);
    }
})

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