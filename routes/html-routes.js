var db = require("../models");

module.exports = function(app, rp) {



app.get("/", function(req, res){
  var data = findUserData(req.user);
  res.render("index", {client : req.user, message: req.flash('Message'), clientData: data });
});

app.get("/map", function(req, res){
  var data = findUserData(req.user);
  res.render("map", {client : req.user, message: req.flash('Message'), clientData: data });
});

app.get("/beers", function(req, res){
  var data = findUserData(req.user);
    res.render("beer", {client : req.user, message: req.flash('Message'), clientData: data });
});

app.get("/brewery/:id?", function(req, res){
  var data = findUserData(req.user);
  res.render("brewery", {client : req.user, message: req.flash('Message'), clientData: data });
});

app.get("/signup", function(req, res){
  var data = findUserData(req.user);
  res.render("signup", {client : req.user, message: req.flash('Message'), clientData: data });
});

//Welcome Page
app.get("/welcome", function(req, res) {
  var data = findUserData(req.user);
    res.render("welcome",{ client : req.user, message: req.flash('Message'), clientData: data });
  });

//Logout
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/', function(req, res){
  res.redirect('/map');
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

function findUserData(client){
  var userData = {};
  // if (client){
  //   db.clientBeers.findMany({where: {clientID: req.user.id}})
  //   .then(function(data){
  //     if (data){
  //       userData.beers = data;
  //     }
  //   });
  //   db.clientBreweries.findMany({where: {clientID: req.user.id}})
  //   .then(function(data){
  //     if (data){
  //       userData.breweries = data;
  //     }
  //   });
  // }
  return userData;
}
