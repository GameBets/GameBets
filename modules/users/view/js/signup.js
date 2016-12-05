
//Regular expressions
var password_reg = /^(?=.*[0-9])(?=.*[!@#$%^&*-])[a-zA-Z0-9!@#$%^&*-]{8,}$/;
var email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

$(document).ready(function () {
    $("#content").hide();

    $("#name_email").html("<h3>Email</h3>");
    $("#input_email").html("<input type='email' id='email' name='email' autocomplete='off'>");
    $("#name_password").html("<h3>Password</h3>");
    $("#input_password").html("<input type='password' id='password' name='password'>");

    //we do this so that  details_prod  appear
    $("#signup").show();

  $("#dialog").dialog({
      width: 600, //<!-- ------------- ancho de la ventana -->
      height: 'auto', //<!--  ------------- altura de la ventana -->
      //show: "scale", <!-- ----------- animación de la ventana al aparecer -->
      //hide: "scale", <!-- ----------- animación al cerrar la ventana -->
      resizable: false, //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
      //position: 'center center',//<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
      modal: false, //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
      buttons: {
          Registrar: function () {
              var check =validate();
              console.log(check);
              if(check){
                  $(this).dialog("close");
              }
          }
      },
      show: {
          effect: "fade",
          duration: 1000
      },
      hide: {
          effect: "puff",
          duration: 1000
      }
  });

  $("#email").keyup(function () {
      if ($(this).val() !== "" && email_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#password").keyup(function () {
      if ($(this).val() !== "" && password_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });
});

function validate() {

    var result = true;

    //Recogemos los valores del usuario
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    $(".error_javascript").remove();

    //Pintar los errores
    //Si no hemos insertado correctamente el valor, se nos mostrara el mensaje de error
    if ($("#email").val() === "" || $("#email").val() == "Correo electrónico") {
        $("#email").focus().after("<span class='error_javascript'>Inserte correo electrónico</span>");
        result = false;
        return false;
    } else if (!email_reg.test($("#email").val())) {
        $("#email").focus().after("<span class='error_javascript'>Ejemplo: micorreo@ejemplo.com</span>");
        result = false;
        return false;
    }

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
      var data = {"password": password, "email": email};

      //Metemos todos los datos en un JSON
      var data_users_JSON = JSON.stringify(data);
      console.log(data_users_JSON);
      //Le enviamos el JSON al Controllador de PHP
      $.post("../../users/signup_users/",
              {alta_users: data_users_JSON},
        function (response) { //Si la respuesta del controlador de PHP es positiva
          console.log(response);
          var correct;
          if (response.success) {
            $("#content").show();
            $("#content").html("<span>"+response.msje+"</span>");
            result = true;
          }else{
            if (response.error.password){
              $("#password").focus().after("<span class='error_javascript'>" + response.error.password + "</span>");
            }
            if (response.error.email){
              $("#email").focus().after("<span class='error_javascript'>" + response.error.email + "</span>");
            }
            result = false;
          }
      }, "json").fail(function (xhr){
        console.log(xhr.responseText);

      });
    }

    return result;
}
