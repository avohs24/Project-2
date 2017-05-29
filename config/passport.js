var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;

var db = require("../models");

module.exports = function(passport) {

        // required for persistent login sessions
        // passport needs ability to serialize and unserialize users out of session

        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            console.log('serializing user:', user);
            done(null, user.id);
        });
        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            db.client.findById(id).then(function(err, user) {
                if (user) {
                    done(null, user.get());
                } else {

                    done(err, null);
                }

            });
        });

        //LOCAL signup

        // we are using named strategies since we have one for login and one for signup
        // by default, if there was no name, it would just be called 'local'

        passport.use('local-signup', new LocalStrategy({
                    // by default, local strategy uses username and password, we will override with email
                    usernameField: 'email',
                    passwordField: 'password',
                    passReqToCallback: true // allows us to pass back the entire request to the callback
                },
                function(req, email, password, done) {

                    //Create a Constructor for user password
                    var generateHash = function(password) {
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                    };

                    // asynchronous
                    // User.findOne wont fire unless data is sent back
                    process.nextTick(function() {

                            // find a user whose email is the same as the forms email
                            // we are checking to see if the user trying to login already exists
                            db.client.findOne({
                                where: {
                                    email: email
                                }
                            }).then(function(err, user) {
                                    // if there are any errors, return the error
                                    if (err)
                                        return done(err);

                                    // check to see if theres already a user with that email
                                    if (user) {
                                        return done(null, false, req.flash('errorMessage', 'That email is already taken.'));
                                    } else {

                                        var password = generateHash(password);
                                        // if there is no user with that email
                                        // create the user
                                        var data = {
                                            firstName: req.body.first_name,
                                            lastName: req.body.last_name,
                                            userName: req.body.userName,
                                            email: email,
                                            password: password,
                                            streetAddress: req.body.street_address,
                                            city: req.body.city,
                                            state: req.body.state,
                                            zipcode: req.body.zipcode
                                        };

                                        db.client.create(data).then(function(newUser, created) {
                                            if (!newUser) {
                                                return done(null, false, req.flash('errorMessage', 'Something went wrong...please try again'));
                                            }
                                            if (newUser) {
                                                return done(null, newUser, req.flash('successMessage', 'Your account has been created'));
                                            }
                                        });
                                    };
                            });
                    });
                  }));

            // LOCAL LOG IN
            // we are using named strategies since we have one for login and one for signup
            // by default, if there was no name, it would just be called 'local'

            passport.use('local-login', new LocalStrategy({
                    // by default, local strategy uses username and password, we will override with email
                    usernameField: 'email',
                    passwordField: 'password',
                    passReqToCallback: true // allows us to pass back the entire request to the callback
                },
                function(req, email, password, done) { // callback with email and password from our form

                    // find a user whose email is the same as the forms email
                    // we are checking to see if the user trying to login already exists
                    db.client.findOne({
                        where: {
                            email: req.body.email
                        }
                    }).then(function(err, user) {
                        // if there are any errors, return the error before anything else
                        if (err)
                            return done(err);

                        // if no user is found, return the message
                        if (!user)
                            return done(null, false, req.flash('errorMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                        // if the user is found but the password is wrong
                        if (!user.validPassword(password))
                            return done(null, false, req.flash('errorMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                        // all is well, return successful user
                        return done(null, user);
                    });

                }));

        };
