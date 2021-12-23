const User = require("../models/auth/user");
const passport = require("passport");

exports.get_logout = function (req, res) {
  req.logout();
  res.redirect("/");
};

exports.get_login = function (req, res) {
  res.render("login");
};

exports.post_login = function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
};

// exports.post_register = function (req, res) {
//   User.register(
//     { username: req.body.username },
//     req.body.password,
//     function (err, user) {
//       if (err) {
//         console.log(err);
//         res.render("error", {
//           error: "Email already registered.",
//           message: err,
//         });
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           res.redirect("/");
//         });
//       }
//     }
//   );
// };