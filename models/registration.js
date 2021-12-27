const mongoose = require("mongoose");
require("dotenv").config();

//const DB = "mongodb+srv://"+ process.env.DB_USERNAME +":"+process.env.DB_PASSWORD+"@cluster0.ymjcf.mongodb.net/BRL_Registration?retryWrites=true&w=majority"

mongoose.connect(
    "mongodb://localhost:27017/registration",
    //DB,
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to the database");
        }
    }
);

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    collegeName: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    txnID: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
    }
});

const Registrations = mongoose.model("Registrations", Schema);

module.exports = Registrations;