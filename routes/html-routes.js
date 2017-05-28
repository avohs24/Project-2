var db = require("../models");

module.exports = function(app) {
app.get("/", function(req, res){
  res.render("index");
});

app.get("/map", function(req, res){
  res.render("map");
});

app.get("/beers", function(req, res){
  res.render("beer");
});

app.get("/brewery", function(req, res){
  res.render("brewery");
});

app.get("/signup", function(req, res){
  res.render("signup");
});


}
