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
    const { _id, name, email, phoneNumber, collegeName, rollNumber, txnID, paymentStatus } = req.body;
    console.log(req.body);
    Registrations.findByIdAndUpdate(_id, {
        $set: {
            name,
            email,
            phoneNumber,
            collegeName,
            rollNumber,
            txnID,
            paymentStatus
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
};