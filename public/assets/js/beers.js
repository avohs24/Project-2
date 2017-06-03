var fullJSON;
var catArray;
var styleObj;
var beerlist;
var results;
var page = 0;
var thispageEnd = 3;
var createList;
var resultslength = 0;
$(document).ready(function() {

    $.ajax({
        url: "./categories",
    }).done(function(data) {
        fullJSON = JSON.parse(data);

        function category(beerlist) {
            var catArray = [];
            for (var i = 0; i < beerlist.data.length; i++) {
                var query = beerlist.data[i].category.name;
                var result = catArray.indexOf(query);
                if (result === -1) {
                    catArray.push(query);
                }
            }
            return catArray
        }

        function style(catArray, beerlist) {
            var styles = {};
            for (var i = 0; i < catArray.length; i++) {
                var thisStyle = [];
                for (var j = 0; j < beerlist.data.length; j++) {
                    var styleInfo = {};
                    if (catArray[i] === beerlist.data[j].category.name) {
                        styleInfo.styleID = beerlist.data[j].id;
                        styleInfo.name = beerlist.data[j].name;
                        thisStyle.push(styleInfo);
                    }
                }
                styles[catArray[i]] = thisStyle;
            }
            return styles
        }

        catArray = category(fullJSON);
        // catArray.unshift("---SELECT A CATEGORY---");
        styleObj = style(catArray, fullJSON);



        for (var i = 0; i < catArray.length; i++) {
          var opt = catArray[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          $("#category").append(el);
        }
    });

    var $category = $('#category');
    var $style = $('#style');
    $category.change(function() {
      if ($("#category").val() !== "---SELECT A CATEGORY---") {
        var thisCat = $( "#category" ).val();
        $style.empty().append(function() {
          for (var i = 0; i < styleObj[thisCat].length; i++) {
            var txt = styleObj[thisCat][i]["name"];
            var val = styleObj[thisCat][i]["styleID"];
            var el = document.createElement("option");
            el.textContent = txt;
            el.value = val;
            $("#style").append(el);
          }
        });
      }
    }).change();

    $("#getBeers").click(function(){
      page = 0;
      thispageEnd = 3;
      var styleId = $("#style").val();
      $.post("./beersearch", {"styleId" : styleId}
      ).done(function(data) {
          beerlist = JSON.parse(data);

          function findBeers(beerlist){
            var result = {};
              for (var i = 0; i < beerlist.data.length; i++){
                var val = {}
                val.name = beerlist.data[i].name;
                val.description = beerlist.data[i].description;
                val.id = beerlist.data[i].id;
                result[i] = val;
              }
            return result
          }

          results = findBeers(beerlist);

          resultslength = results.length;

          createList = function(results){
            $("#beerlist").empty();

            console.log("page", page);
            console.log("thispageEnd", thispageEnd);


            var thisList = "<div class='row'>";
              for (var i = page; i < thispageEnd; i++){
              var thisDiv = "<div class='col s4 beerItem' id='beerID" + i +"' bID='" + results[i].id +"'>\n ";
                  thisDiv += "<button value='" + [i] + "' class='addClientBeer btn waves-effect waves-light'> Save Beer </button> <button value='" + [i] + "' class='addClientBeer btn waves-effect waves-light blue'> More Info </button>"
                  thisDiv += "<h3 class='beerName'>Name: </h3> ";
                  thisDiv += "<p class='beerContent' id='name"+ i +"'>" + results[i].name + "</p> \n";
                  thisDiv += "<h3 class='beerDescription'>Description</h3>\n"
                  if (results[i].description === undefined){
                  thisDiv += "<p class='beerContent' id='description"+ i + "'> N/A </p> \n";
                  }
                  else{
                    if (results[i].description.length > 150){
                      thisDiv += "<p class='beerContent' id='description"+ i + "'>" + results[i].description.substr(0, 150) + "...</p> \n";
                    }
                    else {
                      thisDiv += "<p class='beerContent' id='description"+ i + "'>" + results[i].description + "</p> \n";
                    }

                  }
                  thisDiv += "</div>\n"
                  thisList += thisDiv;
            }
            thisList += "</div>\n"
            thisList += "<div class='row'>"
            thisList += "<div class='col s4 beerButton'> <button class='btn waves-effect waves-light brown darken-2 prevNext' id='previous'>Previous</button></div>\n"
            thisList += "<div class='col s4 offset-s4 beerButton'> <button class='btn waves-effect waves-light brown darken-2 prevNext' id='next'>Next</button></div>"
            $("#beerlist").html(thisList);

            $("#next").click(() =>{

                page +=3;
                thispageEnd +=3
                createList(results);

            });
            $("#previous").click(() =>{
              if (page - 3 > 0 ){
                page -=3;
                thispageEnd -=3
                createList(results);
              }
            });
          };
            createList(results);
            $("main").css("flex", "1 0 auto");



          $(".addClientBeer").click(function(){
            fired_button = $(this).val();
            var name = "#name" + fired_button;
            var description = "#description" + fired_button;
            var beerID = "#beerID" + fired_button;
            name = $(name).text();
            description = $(description).text();
            beerID = $(beerID).attr("bID");
            console.log(name);
            console.log(description);
            console.log(beerID);
            $.post("./addBeer", {"beerID" : beerID, "name" : name, "description" : description}
          ).done(function(data){

          });

          });
        });
    });



  });
