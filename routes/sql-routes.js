var db = require("../models");

module.exports = function(app) {

app.post("/signup", function(req, res) {
  db.client.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(data){
    if (data !== null) {
      res.redirect("/signup");
      return;
    }
  }).catch(function(err){
    console.log(err);
  });

  db.client.findOne({
    where: {
      userName: req.body.userName
    }
  }).then(function(data){
    if (data !== null) {
      res.redirect("/signup");
      return;
    }
  }).catch(function(err){
    console.log(err);
  });

  db.client.create({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    streetAddress: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode
  }).then(function(data){

  }).catch(function(err){
    console.log(err);
  });
  console.log(req.body);
})

}
