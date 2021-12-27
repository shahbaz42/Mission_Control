const Registrations = require("../models/registration");
const User = require("../models/auth/user");
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

exports.update_email_template = (req, res) => {
    const email_template = req.body.email_template ; 
    console.log(email_template);
    User.findOneAndUpdate({email: 'admin@admin'},{mail_template : email_template}, (error)=>{
        if(error){
            console.log(error);
            res.send("Some error occured.");
        } else {
            res.redirect("/");
        }
    })
}

exports.get_email_template = (req, res) => {
    User.findOne({email: 'admin@admin'}, (error, result)=>{
        if(error){
            console.log(error);
            res.send("Some error occured.");
        } else {
            res.render("update_email", {email_template : result.mail_template});
        }
    })
}