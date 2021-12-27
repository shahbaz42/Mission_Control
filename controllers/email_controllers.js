const Registrations = require("../models/registration");
const mail = require("../services/mail");

const fs = require('fs');
var mail_template = fs.readFileSync('./mail_templates/confirmation_email_template.html', 'utf8');

exports.verify_payment = (req, res) => {
    const { _id, name, email } = req.body;
    Registrations.findByIdAndUpdate(_id, {
        $set: {
            paymentStatus: "Verified"
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            mail.sendMail(email, "Congratulations! Your seat is reserved.", "confirmed", mail_template, name, (err, result) => {
                if (err) {
                    console.log(err);
                } else { }
            });
            res.redirect("/");
        }
    });
};

exports.send_mail = (req, res) => {
    const { email, name } = req.body;
    mail.sendMail(email, "Congratulations! Your seat is reserved.", "confirmed", mail_template, name, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
};