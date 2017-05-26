var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var db = require("./models");




app.set('port', (process.env.PORT || 5000));

app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
//
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/html-routes.js")(app);
require("./routes/sql-routes.js")(app);

// app.use("/", routes);


db.sequelize.sync().then(function() {
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
});
