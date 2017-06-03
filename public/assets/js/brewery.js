var resp;
    $.post("./brewerysearch", {"brewId" : reqId}
  ).done(function(data) {

            resp = JSON.parse(data);
            console.log(resp.data.name);
            var name = resp.data.name;
            console.log(resp.data.name);
            if (resp.data.established){
            var established = resp.data.established;
            $("#brewEstablished").html("<h5> <b> Established In: </b> " + established + "</h5>");
            }
            if (resp.data.description){
            var description = resp.data.description
            $("#brewDescription").html("<h5> <b> Description: </b>" + "<br />" +  description + "<br />" + "</h5>");
            }
            if (resp.data.images){
            var image = resp.data.images.medium
            $("#brewImage").html("<img src=" + image + ">");
            }
            if (resp.data.website){
            var website = resp.data.website
            $("#brewWebsite").html("<h5><a href='" + website + "' target='_blank' method='GET'> Visit Website </a> </h5>");
            }

            $("#brewName").html("<h1>" + name + "</h1>");

            $(".addClientBrewery").click(function(){

              $.post("./addBrewery", {"breweryID" : resp.data.id, "name" : resp.data.name}
            ).done(function(data){

            });



        });
    });
