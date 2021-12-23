const express = require("express");
const router = express.Router();

const auth_controllers = require("../../controllers/email_auth_controllers");

router.get("/logout", auth_controllers.get_logout);

router.get("/login", auth_controllers.get_login);

router.post("/login", auth_controllers.post_login);

// router.post("/register", auth_controllers.post_register);

module.exports = router;
