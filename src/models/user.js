const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
    },
    lastName:{
        type:String,
    },
    age:{
        type:Number,
         min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["female","male","others"]){
                throw new Error("invalid gender");
            }
        }
    },
    emailId:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid");
            }
        }
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong")
            }
        }
    },
    skills:{
        type:[String],
        default:["Html","Css","javascript"]
    },
    photoUrl:{
        type:String,
        default:"https://www.vecteezy.com/free-vector/default-profile-picture",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Not valid URL");
            }
        }
    }
},{timestamps:true} )

const UserModel = mongoose.model("User",userSchema);
module.exports = UserModel;