var resp;
var brewId="eRrmuR";
$(document).ready(function() {




    console.log(brewId);
    $.post("./brewerysearch", {"brewId" : brewId}
  ).done(function(data) {

            resp = JSON.parse(data);
            console.log(resp.data.name);
            var name = resp.data.name;
            console.log(resp.data.name);
            var established = resp.data.established;
            var description = resp.data.description
            var image = resp.data.images.medium
            var website = resp.data.website
            $("#brewImage").html("<img src=" + image + ">");
            $("#brewName").html("<h4>" + name + "</h4>");
            $("#brewEstablished").html("<h5> <b> Established In: </b> " + established + "</h5>");
            $("#brewDescription").html("<h5> <b> Description: </b>" + "<br />" +  description + "<br />" + "</h5>");
            $("#brewWebsite").html("<h5> <a href=" + website + "> Visit Website </a> </h5>");

            console.log("****NAME****");
            console.log(resp.data.name);
            console.log("****ESTABLISHED****");
            console.log(resp.data.established);
            console.log("****DESCRIPTION****");
            console.log(resp.data.description);
            console.log("****IMAGE****");
            console.log(resp.data.images.medium);
            console.log("****WEBSITE****");
            console.log(resp.data.website);


        })
        .catch((err) =>{console.log('Error: ', err)});

      });
