exports.is_authenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}   

exports.is_authenticated_for_ticket_checking = function (req, res, next) {
    const DOMAIN = process.env.DOMAIN;
    const _id = req.params.id;
    const qr_url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${DOMAIN}/ticket/verify/${_id}`;
    if (req.isAuthenticated()) {
        // add id to request object
        req.user.ticket_id = _id;
        return next();
    }
    res.render("show_ticket", {qr_url});
} 