var express = require("express");
var request = require("request");
var rp = require('request-promise');
var app = express();
var methodOverride = require("method-override");
var passport = require('passport');
var flash = require('connect-flash');
var path = require("path");
var env = require('dotenv').load();

var morgan = require('morgan');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require("express-validator");

var db = require("./models");

app.set('port', (process.env.PORT || 5000)); //Set up port
app.use(express.static(process.cwd() + "/public")); //set path dependencies to public folder

//Middleware
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash()); // use connect-flash for flash messages stored in session

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars for templating
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Express Session
app.use(session({
    secret: 'gwbootcampiscool',
    saveUninitialized: true,
    resave: true,
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Import routes and give the server access to them.
require("./routes/html-routes.js")(app);
require("./routes/sql-routes.js")(app, passport);
require('./config/passport')(app, passport); // pass passport for configuration
require("./routes/brewerydb-routes.js")(app, rp);



db.sequelize.sync().then(function() {
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
});
