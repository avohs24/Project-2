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
  });

  app.post("/brewerysearch", function(req, res){
    var query = "http://api.brewerydb.com/v2/brewery/" + req.body.brewId + "?key=20e94042de6a11f1f132e80800e9e225"
    console.log(query);
    rp(query).then(function (body){
      res.send(body);
    });
  });

  app.post("/mapget", function(req, res){
    var query = "https://api.brewerydb.com/v2/locations?key=70a61c6760fc3a51e28ad788197d9359&region=" + req.body.longname;
    console.log(query);
    rp(query).then(function (body){
      // console.log(body);
      res.send(body);
    });
  })
}
