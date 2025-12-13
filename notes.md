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

~

