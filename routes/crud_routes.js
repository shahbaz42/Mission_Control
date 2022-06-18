const express = require("express")
const router = express.Router();
const check_login = require("../middlewares/is_authenticated");

const crud_controllers = require("../controllers/crud_controllers");

router.get("/", check_login.is_authenticated, crud_controllers.render );
router.post("/delete", check_login.is_authenticated, crud_controllers.delete);
router.post("/update", check_login.is_authenticated, crud_controllers.update);

// Ticket verification routes
router.get("/ticket/verify/:id", check_login.is_authenticated_for_ticket_checking, crud_controllers.ticket_verification);

module.exports = router;


