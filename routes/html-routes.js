var db = require("../models");

module.exports = function(app, passport) {

app.get("/", function(req, res){
  res.render("index", { message: req.flash('loginMessage') });
});

app.get("/map", function(req, res){
  res.render("map", { message: req.flash('loginMessage') });
});

app.get("/beers", function(req, res){
  res.render("beer", { message: req.flash('loginMessage') });
});

app.get("/brewery", function(req, res){
  res.render("brewery", { message: req.flash('loginMessage') });
});

app.get("/signup", function(req, res){
  res.render("signup", { message: req.flash('signupMessage') });
});

app.get('/profile', isLoggedIn, function(req, res) {
    res.render("profile", {
        user : req.user // get the user out of session and pass to template
    });
  });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
