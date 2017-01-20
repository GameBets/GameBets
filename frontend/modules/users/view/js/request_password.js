
var password_reg = /^(?=.*[0-9])(?=.*[!@#$%^&*-])[a-zA-Z0-9!@#$%^&*-]{8,}$/;

$(document).ready(function () {

  $("#request").click(function () {
      request();
  });

  $('.message').hide();
});

function request() {
  //Recogemos los valores del usuario
  var password = document.getElementById('password').value;
  var result = true;

  $(".error_javascript").remove();

  if ($("#password").val() === "" || $("#password").val() == "Contraseña") {
      $("#password").focus().after("<span class='error_javascript'>Inserte contraseña</span>");
      result = false;
      return false;
  } else if (!password_reg.test($("#password").val())) {
      $("#password").focus().after("<span class='error_javascript'>Debe contener 8 caracteres minimo entre los cuales debe haber 1 letra, 1 numero y 1 caracter especial</span>");
      result = false;
      return false;
  }

  if (result) { //Si el resultado es positivo, cogemos todos los valores y se los enviamos al controlador de PHP  con un JSON

    var token = window.location.href;
    token = token.split("/");

    var data = {"password": password, "token": token[6]};

    //Metemos todos los datos en un JSON
    var data_users_JSON = JSON.stringify(data);
    //Le enviamos el JSON al Controllador de PHP
    $.post(amigable("?module=users&function=request_password"),
            {change_password: data_users_JSON},
      function (response) { //Si la respuesta del controlador de PHP es positiva
        response = JSON.parse(response);
        console.log(response);
        if (response) {
          $('.recovery').hide();
          $('.message').show();
        }
    }, "json").fail(function (xhr){
      console.log(xhr);

    });
  }
}
