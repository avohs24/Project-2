var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;

var db = require("../models");

module.exports = function(app, passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      db.client.findOne({where: {id}})
      .then(function(user) {
          if (user) {
              done(null, user.get());
          }
      }).catch(function(err){
        console.log(err);
      });
  });

  //LOCAL signup
  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'p1',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
      //Create a Constructor for user password
      var generateHash = function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      };
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.client.findOne({
            where: {
                email: username
            }
        }).then(function(user) {
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('Message', 'That email is already taken...Maybe you forgot you signed up with us?'));
            } else {
                //generate hashed password
                password = generateHash(password);
                // if there is no user with that email, create the user
                const newUser = {
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    userName: req.body.userName,
                    email: username,
                    password: password,
                    streetAddress: req.body.street_address,
                    city: req.body.city,
                    state: req.body.state,
                    zipcode: req.body.zipcode
                };

                db.client.create(newUser).then(function(data) {
                    //If there is no data created
                    if (!data) {
                        return done(null, false, req.flash('Message', 'Something went wrong...please try again'));
                    }
                    //If a user has been created return with user object
                    if (data && data.dataValues) {
                        return done(null, data.dataValues, req.flash('Message', 'Welcome to Yo Brew! Time to hit the bars'));
                    }
                }).catch(function(err){
                  console.log(err);
                });
            };
          });
  }));

  // LOCAL LOG IN
  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) { // callback with email and password from our form
              // find a user whose email is the same as the forms email
              // we are checking to see if the user trying to login already exists
              db.client.findOne({ where: { email: username }})
                .then(function(data) {
                  // if no user is found, return the message
                  if (!data)
                      return done(null, false, req.flash('Message', "We can't find this email, maybe you dreamed you made an account with us? Let's make your dreams come true ;) ")); // req.flash is the way to set flashdata using connect-flash
                  // if the user is found but the password is wrong
                  if (!bcrypt.compareSync(password, data.password))
                      return done(null, false, req.flash('Message', 'Wrong password, please try again')); // create the loginMessage and save it to session as flashdata
                  // all is well, return successful user
                  return done(null, data.dataValues, req.flash('Message', 'Welcome Back!'));
                })
                .catch(function(err){
                  console.log(err);
                });
          }));
  };
