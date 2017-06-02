var express = require("express");
var router = express.Router();
// Import the model (beer-brewery.js) to use its database functions.
var beerBrewery = require("../models/beer-brewery.js");
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  beerBrewery.all(function(data) {
    var hbsObject = {
      brewery: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
router.post("/", function(req, res) {
  beerBrewery.create([
    "catagory", "brewery"
  ], [
    req.body.name, req.body.brewery
  ], function() {
    res.redirect("/");
  });
});
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  beerBrewery.update({
    brewery: req.body.brewery
  }, condition, function() {
    res.redirect("/");
  });
});
router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  beerBrewery.delete(condition, function() {
    res.redirect("/");
  });
});
// Export routes for server.js to use.
module.exports = router;