const express = require('express');
const mail = require('./services/mail');
const morgan = require("morgan");
const Registrations = require('./models/registration');
const routes = require('./routes/router');
const session = require("express-session");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const check_login = require("./middlewares/is_authenticated");
const MongoStore = require('connect-mongo');
const DB_URL = process.env.DB_URL;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 10 minutes
	max: 400, // limit each IP to 100 requests per windowMs
});

const app = express();
app.set('trust proxy', 1);
app.use(limiter);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: DB_URL,
        autoReconnect: true,
        ttl : 1000 * 60 * 60 * 24 * 365
    }),
}));

app.use(passport.initialize()); //initialising passport
app.use(passport.session()); //making express use passport.sessions

app.set("view engine", "ejs")

app.use("/", routes);

app.listen(process.env.PORT || 8002, () => {
    console.log('Server started on port 8001');
});