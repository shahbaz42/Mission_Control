const express = require('express');
const mail = require('./services/mail');
const Registrations = require('./models/registration');
const routes = require('./routes/router');
const session = require("express-session");
const passport = require("passport");
const check_login = require("./middlewares/is_authenticated");
const app = express();

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

app.listen(process.env.PORT || 8002, () => {
    console.log('Server started on port 8001');
});