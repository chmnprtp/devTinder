const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthenticated = token === "xyzd";
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