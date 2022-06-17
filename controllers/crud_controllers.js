const Registrations = require("../models/registration");

exports.render = (req, res) => {
    Registrations.find({}).lean().exec((err, data) => {
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
    const { 
        _id, 
        name,
        branch,
        year,
        rollNumber,
        email,
        phoneNumber,
        reason,
        status,
    } = req.body;

    Registrations.findByIdAndUpdate(_id, {
        $set: {
            name,
            branch,
            year,
            rollNumber,
            email,
            phoneNumber,
            reason,
            status,
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
};
