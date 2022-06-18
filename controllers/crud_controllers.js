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
        present
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
            present
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/");
        }
    });
};

exports.ticket_verification = (req, res) => {
    const id = req.params.id;
    Registrations.findByIdAndUpdate(id, {
        $set: {
            present: "Yes",
        }
    }, (err, data) => {
        if (err) {
            res.send("Can't verify the ticket");
        } else {
            res.redirect(`/#${id}`);
        }
    });
}
