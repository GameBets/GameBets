$(document).ready(function () {

  $("#login").click(function () {
      login();
  });

  $("#email").keyup(function () {
      if ($(this).val().length !== "") {
          $(".error_javascript").fadeOut();
          return false;
      }
  });
  $("#password").keyup(function () {
      if ($(this).val().length !== "") {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#email").keypress(function (event) {
    if(event.key === "Enter") {
      $("#password").focus();
    }
  });
  $("#password").keypress(function (event) {
    if(event.key === "Enter") {
      login();
    }
  });
});

function login(){
   var email = $("#email").val();
   var password = $('#password').val();

   $(".error_javascript").remove();
   if (!email) {
       $("#email").focus().after("<span class='error_javascript'>Email vacío</span>");
       value = false;
   } else {
       if (!password) {
           $("#password").focus().after("<span class='error_javascript'>Contraseña vacía</span>");
           value = false;
       } else
           value = true;
   }

   var data = {"email": email, "password": password};
   var login_JSON = JSON.stringify(data);

   if(value){
     $.post(amigable("?module=users&function=signin_users"), {login_json: login_JSON},
        function (response) {
          console.log(response);

          response = JSON.parse(response);
          if (!response.error) {
              Tools.createCookie("user", response[0]['token'] + "|" + response[0]['email'] + "|" + response[0]['avatar'] + "|" + response[0]['type'], 1);
              window.location.href = amigable("?module=main&function=begin");
          } else {
              $("#title").focus().after("<span class='error_javascript'>" + response.datos + "</span>");
          }
        }).fail(function (xhr) {
          console.log(xhr);
        });
   }
}
