var db = require("../models");

module.exports = function(app) {

app.post("/signup", function(req, res) {
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
