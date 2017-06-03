var brewUrl="http://api.brewerydb.com/v2/brewery/";
var api ="?key=70a61c6760fc3a51e28ad788197d9359";
var brewId= JSON.parse(localStorage.getItem('brewId')); 

$.ajax({
    url: brewUrl + brewId + api,
    type: 'GET',
    success: function (resp) {
        console.log(resp);
        var name = resp.data.name;
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


    },
    error: function(e) {
        console.log('Error: '+e);
    }
});
