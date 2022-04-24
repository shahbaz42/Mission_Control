const Registrations = require("../models/registration");
const User = require("../models/auth/user");
const mail = require("../services/mail");

const fs = require('fs');
var mail_template = fs.readFileSync('./mail_templates/confirmation_email_template.html', 'utf8');

exports.verify = (req, res) => {
    const { _id, team_leader_name, leader_email } = req.body;
    Registrations.findByIdAndUpdate(_id, {
        $set: {
            Status: "Verified"
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            User.findOne({email: 'admin@admin'}, (error, result)=>{
                if(error){
                    res.send(error);
                }else{
                    mail.sendMail(leader_email, "Congratulations! Your registration is confirmed.", "confirmed", result.mail_template, team_leader_name, (err, result) => {
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
    console.log(req.body);
    const { leader_email, team_leader_name } = req.body;
    User.findOne({email: 'admin@admin'}, (error, result)=>{
        mail.sendMail(leader_email, "Congratulations! Your registration is confirmed.", "confirmed", result.mail_template, team_leader_name, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/");
            }
        });
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

exports.preview_email_template = (req, res) => {
    User.findOne({email: "admin@admin"}, (error, result) => {
        if(error){
            console.log(error);
            res.send("Some error occured");
        } else{
            res.send(result.mail_template);
        }
    });
}