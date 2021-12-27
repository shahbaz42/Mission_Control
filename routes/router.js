const express = require("express");
const router = express.Router();

const email_auth_routes = require("./auth/email_auth_routes");
const crud_routes = require("./crud_routes");
const email_routes = require("./email_routes");

router.use("/", email_auth_routes);
router.use("/", crud_routes);
router.use("/", email_routes);

module.exports = router;