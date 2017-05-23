
var db = require("../models");

module.exports = function(app) {

//Populate profile page
app.get("/profile/:id", function(req, res) {
    var profileObject = {};
    var beerObject = {};
    var breweryObject = {};
    var object = {};
    var cTrue = false;
    var beTrue = false;
    var brTrue = false;

    function profileF() {
        db.client.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            cTrue = true;
            profileObject = {
                profile: data
            };
        });
    }

    function beerF() {
        db.clientBeer.findAll({
            where: {
                clientID: req.params.id
            }
        }).then(function(data) {
            beTrue = true;
            beerObject = {
                beer: data
            };
        });
    }

    function breweryF() {
        db.clientBrewery.findAll({
            where: {
                clientID: req.params.id
            }
        }).then(function(data) {
            brTrue = true;
            breweryObject = {
                brewery: data
            };
        });
    }

    function redirect() {
        if (cTrue === true && brTrue === true && beTrue === true) {
            object = Object.assign({}, profileObject, beerObject, breweryObject);
            res.render("index", object);
        }
    }
    profileF();
    beerF();
    breweryF();
    redirect();
});


app.post("/profile", function(req, res){
  db.client.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state
  }).then(function(dbBrew){
    res.redirect("/");
  });
});

app.put("/:id", function(req, res){
  db.client.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state
  }, {
  where: {
    id : req.params.id
  }
}).then(function(dbBrew){
    res.redirect("/profile");
  });
});
