var db = require("../models");

module.exports = function(app, passport) {

app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/welcome', // redirect to the Home Page
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
}));

app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/', // redirect to the secure profile section
       failureRedirect : '/signup', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));

app.post('/addBeer', function(req, res){
  if (req.user === undefined){
    res.send("Please Log In First!");
  }
  db.beers.findOne({ where: { beerID: req.body.beerID }})
    .then(function(data){
      var dbBeer = 0;
      function clientBeer(dbBeer, clientID){
        var clientBeer = {
          "clientID" : clientID,
          "beerID" : dbBeer
        }
        db.clientBeer.findOne({where: clientBeer})
        .then(function(data){
          if (!data){
            db.clientBeer.create(clientBeer).then( (data) => {
              if (!data){
                res.redirect("/", req.flash('Message', "An Error Occured Saving Your Beer. Please Try Again"));
              }
              if (data){
                res.send("TEST");
              }
            });
          }
          if (data){

            console.log("ALERT ALERT ALERT");
          }
        });

      }

      if (data){
        dbBeer = data.dataValues.id;
        clientBeer(dbBeer, req.user.id);
      }
      if (!data){
        const newBeer = {
          beerID : req.body.beerID,
          beerName : req.body.name,
        };
        db.beers.create(newBeer).then( (data) => {
          if (!data){
            res.send("TEST");
          }
          dbBeer = data.dataValues.id;
          clientBeer(dbBeer, req.user.id);
        })
        .catch((err) => {console.log(err)});
      }
    });

});

}
