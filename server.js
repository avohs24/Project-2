// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
// Create an instance of the express app.
var app = express();
// Specify the port.
var port = 3000;
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Data
var breweries = [
  {
    breweries: "Best beer in town."
  }, {
    breweries: "Endless Beer in the brewery near you."
  }
];
// Routes
app.get("/beer", function(req, res) {
  res.render("index", breweries[0]);
});
// app.get("/beer", function(req, res) {
//   res.render("index", breweries[1]);
// });
app.get("/breweries", function(req, res) {
  res.render("all-breweries", {
    beer: breweries,
  });
});

// Initiate the listener.
app.listen(port, function() {
  console.log("I'm listening on: " + port);
});