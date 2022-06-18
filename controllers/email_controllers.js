const Registrations = require("../models/registration");
const User = require("../models/auth/user");
const mail = require("../services/mail");

const fs = require('fs');
var mail_template = fs.readFileSync('./mail_templates/confirmation_email_template.html', 'utf8');

exports.verify = (req, res) => {
    const { _id, name, email } = req.body;
    const DOMAIN = process.env.DOMAIN;
    const qr_url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${DOMAIN}/ticket/verify/${_id}`;
    const template_qr_url = process.env.TEMPLATE_QR_URL;

    Registrations.findByIdAndUpdate(_id, {
        $set: {
            status: "Verified"
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            User.findOne({ email: 'admin@admin' }, (error, result) => {
                if (error) {
                    res.send(error);
                } else {
                    const mail_template = result.mail_template.replace(template_qr_url, qr_url);
                    mail.sendMail(email, "Congratulations! Your registration is confirmed.", "confirmed", mail_template, name, (err, result) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.redirect("/");
                        }
                    });
                }
            });
        }
    });
};

exports.send_mail = (req, res) => {
    const { _id, email, name } = req.body;
    const DOMAIN = process.env.DOMAIN;
    const qr_url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${DOMAIN}/ticket/verify/${_id}`;
    const template_qr_url = process.env.TEMPLATE_QR_URL;

    User.findOne({ email: 'admin@admin' }, (error, result) => {
        const mail_template = result.mail_template.replace(template_qr_url, qr_url);
        mail.sendMail(email, "Congratulations! Your registration is confirmed.", "confirmed", mail_template, name, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/");
            }
        });
    });
};

exports.update_email_template = (req, res) => {
    const email_template = req.body.email_template;
    User.findOneAndUpdate({ email: 'admin@admin' }, { mail_template: email_template }, (error) => {
        if (error) {
            console.log(error);
            res.send("Some error occured.");
        } else {
            res.redirect("/");
        }
    })
}

exports.get_email_template = (req, res) => {
    User.findOne({ email: 'admin@admin' }, (error, result) => {
        if (error) {
            console.log(error);
            res.send("Some error occured.");
        } else {
            res.render("update_email", { email_template: result.mail_template });
        }
    })
}

exports.preview_email_template = (req, res) => {
    User.findOne({ email: "admin@admin" }, (error, result) => {
        if (error) {
            console.log(error);
            res.send("Some error occured");
        } else {
            res.send(result.mail_template);
        }
    });
}