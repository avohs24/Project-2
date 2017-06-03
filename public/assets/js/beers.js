var fullJSON;
var catArray;
var styleObj;
var beerlist;
var results;
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

          function createList(results){
            $("#beerlist").empty();
            var list = "";
            for (var i = 0; i < Object.keys(results).length; i++){
                var thisDiv = "<div value='" + results[i].id +"'> ";
                thisDiv += "<p class='name'> Name: " + results[i].name + " </p> \n";
                if (results[i].description === undefined){
                thisDiv += "<p class='description'> Description: N/A </p> </div> \n";
                }
                else{
                thisDiv += "<p class='description'> Description:" + results[i].description + "</p> </div> \n";
                }

                list += thisDiv;
            }
            console.log(list, "List");
            $("#beerlist").html(list);
          }
          createList(results);
        });
    });
    // // bonus: how to access the download link
    // $model.change(function() {
    //     $('#download-link').attr('href', selectValues[$vendor.val()][$model.val()]).show();
    // });
});
