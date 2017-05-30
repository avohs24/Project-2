$("#formValidate").validate({
       rules: {
           userName: {
               required: true,
               minlength: 5
           },
           email: {
               required: true,
               email:true
           },
           password: {
       required: true,
       minlength: 5
     },
     passwordConfirm: {
       required: true,
       minlength: 5,
       equalTo: "#password"
     },
     zipcode:{
       require: true,
       minlength: 5,
       maxlength: 5,
       },
       //For custom messages
       messages: {
           userName:{
               required: "Enter a username",
               minlength: "Enter at least 5 characters"
           },
       },
       errorElement : 'div',
       errorPlacement: function(error, element) {
         var placement = $(element).data('error');
         if (placement) {
           $(placement).append(error)
         } else {
           error.insertAfter(element);
         }
       }
    });
