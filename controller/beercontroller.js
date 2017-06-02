var express = require("express");
var router = express.Router();
// Import the model (beers.js) to use its database functions.
var beers = require("../models/beers.js");
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  beers.all(function(data) {
    var hbsObject = {
      beers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
router.post("/", function(req, res) {
  beers.create([
    "catagory", "beers"
  ], [
    req.body.name, req.body.beers
  ], function() {
    res.redirect("/");
  });
});
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  beers.update({
    brewery: req.body.beers
  }, condition, function() {
    res.redirect("/");
  });
});
router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  beers.delete(condition, function() {
    res.redirect("/");
  });
});
// Export routes for server.js to use.
module.exports = router;