const express = require('express');
const mail = require('./services/mail');
const Registrations = require('./models/registration');
const routes = require('./routes/router');
const session = require("express-session");
const passport = require("passport");
const check_login = require("./middlewares/is_authenticated");
const app = express();

const fs = require('fs');

var mail_template = fs.readFileSync('./mail_templates/confirmation_email_template.html', 'utf8');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSIONS_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize()); //initialising passport
app.use(passport.session()); //making express use passport.sessions

app.set("view engine", "ejs")

app.use("/", routes);

app.get("/", check_login.is_authenticated , (req, res) => {
    Registrations.find({}, (err, data) => {
        if (err) {
            res.send("error is", err);
        } else {
            res.render("index", { registrations: data });
        }
    });
});

app.post("/delete", check_login.is_authenticated , (req, res) => {
    Registrations.findByIdAndDelete(req.body._id, (err, data) => {
        if (err) {
            res.send("error is", err);
        } else {
            res.redirect("/");
        }
    });
});

app.post("/update",  check_login.is_authenticated , (req, res) => {
    const { _id, name, email, phoneNumber, collegeName, rollNumber, txnID, paymentStatus } = req.body;
    console.log(req.body);
    Registrations.findByIdAndUpdate(_id, {
        $set: {
            name,
            email,
            phoneNumber,
            collegeName,
            rollNumber,
            txnID,
            paymentStatus
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
});

app.post("/verifyPayment",  check_login.is_authenticated , (req, res) => {
    const { _id, name, email } = req.body;
    Registrations.findByIdAndUpdate(_id, {
        $set: {
            paymentStatus: "Verified"
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            mail.sendMail(email, "Confirmation Message", "confirmed", mail_template, (err, result) => {
                if (err) {
                    console.log(err);
                } else { }
            });
            res.redirect("/");
        }
    });
});

app.post("/sendMail", check_login.is_authenticated , (req, res) => {
    const { email } = req.body;
    mail.sendMail(email, "Confirmation Message", "confirmed", mail_template, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
});


app.listen(process.env.PORT ||8002, () => {
    console.log('Server started on port 8001');
});