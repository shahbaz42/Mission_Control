const express = require("express")
const router = express.Router();
const check_login = require("../middlewares/is_authenticated");
const email_controllers = require("../controllers/email_controllers");

router.post("/verifyPayment", check_login.is_authenticated, email_controllers.verify_payment );
router.post("/sendMail", check_login.is_authenticated, email_controllers.send_mail);
router.post("/updateEmailTemplate", check_login.is_authenticated, email_controllers.update_email_template);
router.get("/updateEmailTemplate", check_login.is_authenticated, email_controllers.get_email_template);
router.get("/previewEmailTemplate", check_login.is_authenticated, email_controllers.preview_email_template);

module.exports = router;