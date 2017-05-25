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
// require("./routes/burger-api-routes.js")(app);

// app.use("/", routes);


db.sequelize.sync().then(function() {
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./login.html"));
});

app.post("/", function(req, res) {
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
