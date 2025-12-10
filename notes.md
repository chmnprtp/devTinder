// if you use below code above all the no other router we can request. it overrides everything. this means any routes 
// start with / routes it will run it should be use at last.
app.use("/",(req,res)=>{
    // res.send("Hi hello")
})

// anything after "/anything" comes it will match to it . ex - "/anything/about"
// if we also have "/anything/about" but we place it before "/anything" then this one will run.

Here orders matters! / Sequence of code matters