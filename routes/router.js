const express = require("express");
const router = express.Router();

const email_auth_routes = require("./auth/email_auth_routes");

router.use("/", email_auth_routes);

module.exports = router;