const validator = require("validator");

const validateSignupData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    
    if(!firstName || !lastName){
        throw new Error("Please Enter Correct Name")
    }else if(firstName.length>4 && firstName.length<50){
        throw new Error("Please enter valid name")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Please enter valid email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Pleae enter valid Password");
    }
}

module.exports = validateSignupData;