module.exports.islogin = (req, res, next) => {
    if (!req.session.userId) {

        res.redirect("/login")
    }
    else {

        next();
    }
}
