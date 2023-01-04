const mongoose = require('mongoose');

// MONGODB_URL = "mongodb+srv://sumit:sumit@cluster0.tsqzqb9.mongodb.net/test";
MONGODB_URL = "mongodb://localhost:27017/todo";

const connectToMongo = () => {
    mongoose.connect(MONGODB_URL, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;