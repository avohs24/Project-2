var db = require("../models");

module.exports = function(app, passport) {

app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/', // redirect to the Home Page
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
}));

app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/', // redirect to the secure profile section
       failureRedirect : '/signup', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));


}
