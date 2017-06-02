var db = require("../models");

module.exports = function(app, rp) {

  app.get("/categories", function(req, res){
    rp('http://api.brewerydb.com/v2/styles?key=20e94042de6a11f1f132e80800e9e225').then(function (body) {
      res.send(body);
    });
  });

  app.post("/beersearch", function(req, res){
    var query = "http://api.brewerydb.com/v2/beers?key=20e94042de6a11f1f132e80800e9e225&styleId=" + req.body.styleId
    console.log(query);
    rp(query).then(function (body) {
      res.send(body);
    });
  })
  
}
