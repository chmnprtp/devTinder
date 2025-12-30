const mongoose = require("mongoose")

const coonectDB = async() =>{
    await mongoose.connect("mongodb+srv://chmnprtp:chmnprtp@namastenode.qzipaix.mongodb.net/devTinder");
}

module.exports = coonectDB;
