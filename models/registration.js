const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DB_URL;

mongoose.connect(
    // "mongodb://localhost:27017/registration",
    DB,
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
    branch:{
        type: String,
        required:true
    },
    year: {
        type: Number,
        required:true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    reason:{
      type: String,
      required: true
    },
    present: {
        type: String,
        default: "No",
    },
    status:{
        type: String,
        default: "Pending"
    }
    // collegeName: {
    //     type: String,
    //     required: true
    // },
   
    // txnID : {
    //     type: String,
    //     required: true
    // },
    // paymentDate : {
    //     type: Date,
    // }
});

const Registrations = mongoose.model("Registrations", Schema);

module.exports = Registrations;