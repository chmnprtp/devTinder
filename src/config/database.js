const mongoose = require("mongoose")

const coonectDB = async() =>{
    await mongoose.connect("mongodb+srv://chmnprtp:chmnprtp@namastenode.qzipaix.mongodb.net/");
}

module.exports = coonectDB;
