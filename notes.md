
git add .  
git commit -m "database connected"
git push



// Routing and request handlers

// if you use below code above all the no other router we can request. it overrides everything. this means any routes 
// start with / routes it will run it should be use at last.
app.use("/",(req,res)=>{
    // res.send("Hi hello")
})

// anything after "/anything" comes it will match to it . ex - "/anything/about"
// if we also have "/anything/about" but we place it before "/anything" then this one will run.

Here orders matters! / Sequence of code matters


//======= 

req.query - localhost:7777/user?userId=101&password=testing
req.params - localhost:7777/user/107
             ("/user/:userId)

req.params - localhost:7777/user/107/chaman/123545
             ("/user/:userId/:username/:password)


app.use : - we can send multiple route handlers using , or also we can send in array of function and mix also means some in
            array some are not.





//======================== MIDDLEWARE AND ERROR HANDLING=======================

middleware: function that runs before your route handler(or sometimes after). use next function?
            thode route handler we put in middle are known as middleware.
route handler: responds to an actual request for a specific endpoint. usually end req-res cycle
                function which is actually handling the routes,that actually sending the res back.

when we send the reqest to the server it will go to all route one by one app.xxx("/matching route) function. if it finds it matching then it will call that matched function one by one if there are and send the res back. That function is request handler and all in between function is middleware.

// Output of this code?
const express = require("express");
const app = express();

app.get("/about",(req,res)=>{
    //Route handler
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

// JUST SENDING REQUEST in INFINITE LOOP
-----------------------------------------------------

// Output of the code?
const express = require("express");
const app = express();

app.get("/about",()=>{
    //Route handler
    console.log("Handling about request");
    
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

// JUST SENDING REQUEST IN INFINITE LOOP
-------------------------------------------------------

// Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res)=>{
    //Route handler
    console.log("Handling about request");
    res.send("Response 1");
},(req,res)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2");
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

// Output:  Response 1
------------------------------------------------------

//Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res)=>{
    //Route handler
    console.log("Handling about request");
    // res.send("Response 1");
},(req,res)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2");
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

// JUST SENDING REQUEST IN INFINITE LOOP
-------------------------------------------------

// Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    // res.send("Response 1");
    next();
},(req,res)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2");
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

// Response 2
----------------------------------------------------


//Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    res.send("Response 1");
    next(); ==========> due to this error you will get as this line will execute
},(req,res)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2");
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

// Output : Response 1   with error -> Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
-------------------------------------------------------

//Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    next();
    res.send("Response 1");
},(req,res)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2");
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

//OUTPUT : Response 2 but will get error ==> Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
---------------------------------------------------------------

//Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    next();
},(req,res)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2");
},(req,res)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2");
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   
//Output : Response 2
----------------------------------------------------

Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    // res.send("Response 1");
    next();
},(req,res,next)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    next();
},(req,res,next)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    // res.send("Response 2");
    next();
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   
//OUTPUT: error cannot GET /about
-----------------------------------------------------

Output of the code?
const express = require("express");
const app = express();

app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    next();
})

app.get("/about",(req,res,next)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2")
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

//OUTPUT : Response
------------------------------------------------------

Output of the code?
const express = require("express");
const app = express();


app.get("/about",(req,res,next)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    res.send("Response 2")
})
app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    next();
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   

//Output: Response 2
--------------------------------------------------------

Output of the code?
const express = require("express");
const app = express();


app.get("/about",(req,res,next)=>{
    //Route handller 2
    console.log("Handling the route user 2 ");
    next();
})
app.get("/about",(req,res,next)=>{
    //Route handler
    console.log("Handling about request");
    next();
})

app.listen(7777,()=>{
    console.log("Server running");
    
});   
//Output: cannot GET /about
--------------------------------------------------------

// WHY WE NEED NEXT() MULTIPLE ROUTE HANDLING?? --- due to middleware
// WHY WE NEED MIDDLEWARE? - for ex- to check authentication-

    const express = require("express");
    const { adminAuth } = require("./middlewares/auth");
    const app = express();


    app.use("/getUser",adminAuth,(req,res)=>{
        res.send("User1");
    })

    app.listen(7777,()=>{
        console.log("Server running");
        
    });   

adminAuth.js
    const adminAuth = (req,res,next)=>{
        const token = "xyz";
        const isAdminAuthenticated = token === "xyz";
        console.log("admin is getting checked");
        
        if(isAdminAuthenticated){
            next();
        }else{
            res.status(401).send("Not authorised");
        }
    }
    module.exports = {
        adminAuth
    }
----------------------------------------------------------------------

app.use() and app.all() ??

=============== Error Handling ===========================

app.use("/about",(error,req,res,next)=>{
    //logic
})
// here error will always comes as first parameter 
// req,res
// req,res,next
// error,req,res,next


// Simple error handling
app.get("/about",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong");
    }
})

// using tryCatch
app.get("/user",(err,req,res,next)=>{
    try {
        throw new Error("sdkgj")
        res.send("User data send");
    } catch (error) {
        res.status(500).send(err.message)
    }
})
=============================================================

==============================Database, Schema & Models Mongoose=================

TO connect server to database we use library mongoose.

databse.js
    const mongoose = require("mongoose")

    const coonectDB = async() =>{
        await mongoose.connect("mongodb+srv://chmnprtp:chmnprtp@namastenode.qzipaix.mongodb.net/");
    }

    module.exports = coonectDB;


app.js
    const express = require("express");
    const connectDB = require("./config/database")
    const app = express();

    connectDB().then(()=>{
        console.log("Database established");
        app.listen(7777,()=>{
            console.log("Server is running");
        })
    }).catch(()=>{
        console.log("Database not connected");
    })
-------------------------------------------------------------------------

What is Schema? it is kind of definition to create model
What is Model?

How to create Schema?
    require mongoose
    const schema = new mongoose.Schema({firstName:{type:String}})
    create mongoose Model - const model = mongoose.model("name",Schema);  // mongoose name always start with capital letter
    export model;

user.js
    const mongoose = require("mongoose");
    const userSchema = mongoose.Schema({
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        age:{
            type:Number,
        },
        gender:{
            type:String,
        },
        emailId:{
            type:String,
        },
        password:{
            type:String,
        },
    })

    const UserModel = mongoose.model("User",userSchema);
    module.exports = UserModel;

    -------------------------------------------------------------------------
Creating API's
use method to create api
store data 
save it using save()
send response back

mostly every mongoose function return promises so use async await

app.js
    app.post("/signup", async (req,res)=>{
        const user = new UserModel({
            firstName:"Chaman",
            lastName:"Pratap",
            age:24,
            emailId:"chmnprtp@gmail.com",
            password:"aA1$aA1$"
        }
    )
        try {
            await user.save();
            res.send("User added")
        } catch (error) {
            res.status(400).send("User not added");
        }
    })

// To share data dynamic
    app.post("/signup", async (req,res)=>{
        const user = new User(req.body);
        try {
            await user.save();
            res.send("User added")
        } catch (error) {
            res.status(400).send("User not added");
        }
    })

automatically created by mongodb:-
__id:? unique object - we can manually send this
__v:? version of document - when we update the document it automatially changes


JSON vs OBJECT?
In Json both key and value in ""
in last of JSON don't put ,

You can see the data send by user in req.body but that comes in JSON format to view need middleware - express.json()

// How to get data from database
using model

User.find({userId:userid}) - for single user
User.find({}) - for all user

find() vs finOne ?
put vs patch ?

If you are try to update an field which are not present it will not add it in database.





=============================================================

============================== Data Sanitization & Schema Validation=================

Some validations
required:true,
unique:true,
default:"sfgs",
lowercase:"true",
trim:true,
minLength:4,
min:18,

Custom validation:-
validate(value){  // this will only work when new document is created enable for existing document 
    if(!["male","female","others"].includes(value)){
        throw new Error("Gender not valid")
    }
}

{runValidators:true} for update existing document with validation check in moongoose method

{timestamps:true} in schema


VALIDATOR LIBRARY -- db level validation


=================================================================================================
================================Encrypting Password==============================================

Password should be store in hash format
install bcrypt library - npm install bcrypt

it create hash using salt - by default salt round is 10

app.js
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
        
        const isPasswordValid = bcrypt.compare(password,user.password)
        if(isPasswordValid){

            // create a JWT token

            //add the token to cookie and send the response back to user
            res.send("Login Successfull")
        }
        else{
            throw new Error("Invalid credentials")
        }

    } catch (error) {
        res.status(400).send("some error "+ error.message)
    }
    
})

=================================================================================================
================================JWT Cookies==============================================

jwt created by server and stored by user. every time any request is made jwt will also be send along.
every time server validate these token.
jwt stored in cookies

Ex - when you successful login server send success response and jwt inside cookies

we can also set expiration date of cookies and token
 you can set cookie like res.cookie()
 you can check cookies = req.cookie; it will give undedined 
 to read the cookie we need cookie-parser library middleware - app.use(cookieParser())

 jwt - red - header
       pink - payload
       blue - signature

npm i jsonwebtoken
const jwt = require("jsonwebtoken");
const token = await jwt.sign(privatekey) //pass hiding info and secret key
jwt.verify(token,privatekey)