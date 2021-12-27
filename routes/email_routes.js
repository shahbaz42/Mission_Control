const express = require("express")
const router = express.Router();
const check_login = require("../middlewares/is_authenticated");
const crud_controllers = require("../controllers/email_controllers");

router.post("/verifyPayment", check_login.is_authenticated, crud_controllers.verify_payment );
router.post("/sendMail", check_login.is_authenticated, crud_controllers.send_mail);

module.exports = router;