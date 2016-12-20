$(document).ready(function () {

  $("#recovery").click(function () {
      recovery();
  });

  $('.message').hide();
});

function recovery() {
  var email = $("#email").val();
  var value;

  $(".error_javascript").remove();
  if (!email) {
      $("#email").focus().after("<span class='error_javascript'>Email vacío</span>");
      value = false;
  } else {
      value = true;
  }

  var data = {"email": email};
  var recovery_JSON = JSON.stringify(data);

  if(value){
    $.post(amigable("?module=users&function=recovery_password"), {recovery_json: recovery_JSON},
       function (response) {
         response = JSON.parse(response);
         console.log(response);
         if (!response) {
           $('.recovery').hide();
           $('.message').show();
         } else {
             $("#email").focus().after("<span class='error_javascript'>" + response.datos + "</span>");
         }
       }).fail(function (xhr) {
         console.log(xhr);
       });
     }
}
