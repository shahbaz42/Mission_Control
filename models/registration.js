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
    leader_email: {
        type: String,
        required: true
    },
    leader_phoneNumber: {
        type: String,
        required: true
    },
    leader_roll_number: {
        type: String,
        required: true
    },
    member_1_phoneNumber: {
        type: String,
    },
    member_1_name: {
        type: String,
    },
    member_1_roll_number : {
        type: String,
    },
    recaptchaReactive: {
        type: String
    },
    team_leader_name: {
        type: String,
        required: true
    },
    team_name: {
        type: String,
        required: true
    },
    teamsize: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    Status: {
        type: String,
    }
});

const Registrations = mongoose.model("Registrations", Schema);

module.exports = Registrations;