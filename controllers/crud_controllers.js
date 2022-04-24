const Registrations = require("../models/registration");

exports.render = (req, res) => {
    Registrations.find({}, (err, data) => {
        if (err) {
            res.send("error is", err);
        } else {
            res.render("index", { registrations: data });
        }
    });
};

exports.delete = (req, res) => {
    Registrations.findByIdAndDelete(req.body._id, (err, data) => {
        if (err) {
            res.send("error is", err);
        } else {
            res.redirect("/");
        }
    });
};

exports.update = (req, res) => {
    const { _id, leader_email, leader_phoneNumber, leader_roll_number, member_1_phoneNumber, member_1_name, member_1_roll_number, team_leader_name, team_name, teamsize, year, Status } = req.body;

    console.log(req.body);

    Registrations.findByIdAndUpdate(_id, {
        $set: {
            leader_email,
            leader_phoneNumber,
            leader_roll_number,
            member_1_phoneNumber,
            member_1_name,
            member_1_roll_number,
            team_leader_name,
            team_name,
            teamsize,
            year,
            Status
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
};
