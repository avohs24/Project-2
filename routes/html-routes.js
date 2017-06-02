var db = require("../models");

module.exports = function(app) {

app.get("/", function(req, res){
  res.render("index", {client : req.user, message: req.flash('Message') });
});

app.get("/map:address*?", function(req, res){
  res.render("map", {client : req.user, message: req.flash('Message')});
});

app.get("/beers", function(req, res){
    res.render("beer", {client : req.user, message: req.flash('Message')});
});

app.get("/brewery/:id?", function(req, res){
  res.render("brewery", {client : req.user, message: req.flash('Message') });
});

app.get("/signup", function(req, res){
  res.render("signup", {client : req.user, message: req.flash('Message') });
});

//Welcome Page
app.get("/welcome", function(req, res) {
    res.render("welcome",{ client : req.user, message: req.flash('Message') });
  });

//Logout
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/', function(req, res){
  console.log(req.body);
  res.render("map", {address: req.body});

})

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
