var beerlist = require("./Beerlist.json");

function category(beerlist){
  var catArray= [];
  for (var i = 0; i < beerlist.data.length; i++){
    var query = beerlist.data[i].category.name;
    var result = catArray.indexOf(query);
    if (result === -1){
      catArray.push(query);
    }
  }
  return catArray
}

function style(catArray, beerlist){
  var styles = {};
  for (var i = 0; i < catArray.length; i++){
    var thisStyle = [];
    for (var j = 0; j < beerlist.data.length; j++){
      var styleInfo = {};
      if (catArray[i] === beerlist.data[j].category.name){
        styleInfo.styleID = beerlist.data[j].id;
        styleInfo.name = beerlist.data[j].name;
        thisStyle.push(styleInfo);
      }
    }
    styles[catArray[i]] = thisStyle;
  }
  return styles
}

var catArray = category(beerlist);
var styleObj = style(catArray, beerlist);
console.log(styleObj["British Origin Ales"]);
