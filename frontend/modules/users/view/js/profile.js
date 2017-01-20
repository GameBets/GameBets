
//Regular expressions
var name_user_reg = /^[0-9a-zA-z]+$/;
var password_reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
var name_reg = /^[a-zA-Z]+$/;
var surname_reg = /^[a-zA-Z\ ]+$/;
var date_birthday_reg = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;
var email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phone_reg = /^[0-9]{9}$/;

Dropzone.autoDiscover = false;
$(document).ready(function () {
  $('#submitBtn_user').click(function () {
      validate_modify_user();
  });


  $("#name_user, #surname, #passwd").keyup(function () {
      if ($(this).val() !== "") {
          $(".error").fadeOut();
          return false;
      }
  });

  //Corregir error
  //Hasta que no introduzcamos un valor que acepte la expresion regular, no se borrara el error
  $("#name_user").keyup(function () {
      if ($(this).val() !== "" && name_user_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#passwd").keyup(function () {
      if ($(this).val() !== "" && password_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#named").keyup(function () {
      if ($(this).val() !== "" && name_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#surname").click(function () {
      if ($(this).val() !== "" && surname_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#date_birthday").click(function () {
      if ($(this).val() !== "" && date_birthday_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#email").click(function () {
      if ($(this).val() !== "" && email_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#phone").keyup(function () {
      if ($(this).val() !== "" && phone_reg.test($(this).val())) {
          $(".error_javascript").fadeOut();
          return false;
      }
  });

  $("#progress").hide();

  // Date Picker DATE BIRTHDAY
  $('#date_birthday').datepicker({
		dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
		yearRange: '-50:',
		onSelect: function(selectedDate) {
		}
	});

  //Dropzone function
  $("#dropzone").dropzone({
      url: amigable("?module=users&fucntion=upload_avatar_users"),
      params:{'upload':true},
      addRemoveLinks: true,
      maxFileSize: 1000,
      dictResponseError: "Ha ocurrido un error en el server",
      acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
      init: function () { //Subir imagen
          this.on("success", function (file, response) {
              console.log(response);
              //alert(response);
              $("#progress").show();
              $("#bar").width('100%');
              $("#percent").html('100%');
              $('.msg').text('').removeClass('msg_error');
              $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'width': '100%; background-color: green;'}, 300);
          });
      },
      complete: function (file) {
          //if(file.status == "success"){
          //alert("El archivo se ha subido correctamente: " + file.name);
          //}
      },
      error: function (file) {
          //alert("Error subiendo el archivo " + file.name);
      },
      removedfile: function (file, serverFileName) {  //Borrar imagen
          var name = file.name;
          $.ajax({
              type: "POST",
              url: amigable("?module=users&function=delete_avatar_users"),
              data: {"filename": name, "delete":true},
              success: function (data) {
                  //console.log(data);
                  $("#progress").hide();
                  $('.msg').text('').removeClass('msg_ok');
                  $('.msg').text('').removeClass('msg_error');
                  $("#e_avatar").html("");

                  var json = JSON.parse(data);
                  if (json.res === true) {
                      var element;
                      if ((element = file.previewElement) !== null) {
                          element.parentNode.removeChild(file.previewElement);
                          //alert("Imagen eliminada: " + name);
                      } else {
                          return false;
                      }
                  } else { //json.res == false, elimino la imagen también
                      var element;
                      if ((element = file.previewElement) !== null) {
                          element.parentNode.removeChild(file.previewElement);
                      } else {
                          return false;
                      }
                  }
              }
          })
      }
  });


  load_countries_v1();
  $("#province").empty();
  $("#province").append('<option value="" selected="selected">Select a Province</option>');
  $("#province").prop('disabled', true);
  $("#town").empty();
  $("#town").append('<option value="" selected="selected">Select a Town</option>');
  $("#town").prop('disabled', true);

  $("#country").change(function() {
  var pais = $(this).val();
  var provincia = $("#province");
  var poblacion = $("#town");

  if(pais !== 'ES'){
     provincia.prop('disabled', true);
     poblacion.prop('disabled', true);
     $("#province").empty();
     $("#town").empty();
  }else{
     provincia.prop('disabled', false);
     poblacion.prop('disabled', false);
     load_provincias_v2();
  }
  });

  $("#province").change(function() {
  var prov = $(this).val();
  if(prov > 0){
      load_poblaciones_v2(prov);
  }else{
      $("#town").prop('disabled', false);
  }
  });

  fill();
});

//Validar y guardar datos
function validate_modify_user() {
  var result = true;

  //Recogemos los valores del usuario
  var name_user = document.getElementById('name_user').value;
  var passwd = document.getElementById('passwd').value;
  var named = document.getElementById('named').value;
  var surname = document.getElementById('surname').value;
  var date_birthday = document.getElementById('date_birthday').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var country = document.getElementById('country').value;
  var province = document.getElementById('province').value;
  var town = document.getElementById('town').value;

  $(".error").remove();

  //Pintar los errores
  //Si no hemos insertado correctamente el valor, se nos mostrara el mensaje de error
  if ($("#name_user").val() == "Nombre de usuario") {
      $("#name_user").focus().after("<span class='error_javascript'>Introduzca nombre de usuario</span>");
      result = false;
      return false;
  } else if (!name_user_reg.test($("#name_user").val()) && $("#name_user").val() !== "") {
      $("#name_user").focus().after("<span class='error_javascript'>Solo puede contener numeros y letras</span>");
      result = false;
      return false;
  }

  if ($("#passwd").val() == "Contraseña") {
      $("#passwd").focus().after("<span class='error_javascript'>Inserte contraseña</span>");
      result = false;
      return false;
  } else if (!password_reg.test($("#passwd").val()) && $("#passwd").val() !== "") {
      $("#passwd").focus().after("<span class='error_javascript'>Debe contener 8 caracteres minimo entre los cuales debe haber 1 letra, 1 numero y 1 caracter especial</span>");
      result = false;
      return false;
  }


  if ($("#named").val() == "Nombre") {
      $("#named").focus().after("<span class='error_javascript'>Inserte nombre</span>");
      result = false;
      return false;
  } else if (!name_reg.test($("#named").val()) && $("#named").val() !== "") {
      $("#named").focus().after("<span class='error_javascript'>Solo puede contener letras</span>");
      result = false;
      return false;
  }

  if ($("#surname").val() == "Apellidos") {
      $("#surname").focus().after("<span class='error_javascript'>Inserte apellidos</span>");
      result = false;
      return false;
  } else if (!surname_reg.test($("#surname").val()) && $("#surname").val() !== "") {
      $("#surname").focus().after("<span class='error_javascript'>Solo puede contener letras y 1 espacio</span>");
      result = false;
      return false;
  }

  if ($("#date_birthday").val() == "mm/dd/yyyy") {
      $("#date_birthday").focus().after("<span class='error_javascript'>Inserte fecha de nacimiento</span>");
      result = false;
      return false;
  } else if (!date_birthday_reg.test($("#date_birthday").val()) && $("#date_birthday").val() !== "") {
      $("#date_birthday").focus().after("<span class='error_javascript'>Error formato de fecha [mm/dd/yyyy]</span>");
      result = false;
      return false;
  }

  if ($("#email").val() == "Correo electrónico") {
      $("#email").focus().after("<span class='error_javascript'>Inserte correo electrónico</span>");
      result = false;
      return false;
  } else if (!email_reg.test($("#email").val()) && $("#email").val() !== "") {
      $("#email").focus().after("<span class='error_javascript'>Ejemplo: micorreo@ejemplo.com</span>");
      result = false;
      return false;
  }

  if ($("#phone").val() == "Telefono") {
      $("#phone").focus().after("<span class='error_javascript'>Inserte telefono</span>");
      result = false;
      return false;
  } else if (!phone_reg.test($("#phone").val()) && $("#phone").val() !== "") {
      $("#phone").focus().after("<span class='error_javascript'>Debe contener 9 digitos</span>");
      result = false;
      return false;
  }

  if (result) { //Si el resultado es positivo, cogemos todos los valores y se los enviamos al controlador de PHP  con un JSON
      if (province == null) {
         province = '';
      } else if (province.length == 0) {
         province = '';
      } else if (province === 'Select a Province') {
         return '';
      }

      if (town == null) {
         town = '';
      } else if (town.length == 0) {
         poblacion = '';
      } else if (town === 'Select a Town') {
         return '';
      }

      var data = {"name_user": name_user, "passwd": passwd, "named": named, "surname": surname, "date_birthday": date_birthday,
                  "email": email, "phone": phone, "country": country, "province": province, "town": town};

      var data_users_JSON = JSON.stringify(data);

      $.post(amigable('?module=users&function=modify'), {mod_user_json: data_users_JSON},
      function (response) {
          //console.log(response);
          if (response.success) {
             window.location.href = response.redirect;
          } else {
              if (response.redirect) {
                  window.location.href = response.redirect;
              } else {
                  if (response["datos"]["named"] !== undefined && response["datos"]["named"] !== null) {
                      $("#named").focus().after("<span class='error'>" + response["datos"]["named"] + "</span>");
                  }
                  if (response["datos"]["name_user"] !== undefined && response["datos"]["name_user"] !== null) {
                      $("#name_user").focus().after("<span class='error'>" + response["datos"]["name_user"] + "</span>");
                  }
                  if (response["datos"]["surname"] !== undefined && response["datos"]["surname"] !== null) {
                      $("#surname").focus().after("<span class='error'>" + response["datos"]["surname"] + "</span>");
                  }
                  if (response["datos"]["passwd"] !== undefined && response["datos"]["passwd"] !== null) {
                      $("#passwd").focus().after("<span class='error'>" + response.error.passwd + "</span>");
                  }
                  if (response["datos"]["date_birthday"] !== undefined && response["datos"]["date_birthday"] !== null) {
                      $("#date_birthday").focus().after("<span class='error'>" + response["datos"]["date_birthday"] + "</span>");
                  }
                  if (response["datos"]["phone"] !== undefined && response["datos"]["phone"] !== null) {
                      $("#phone").focus().after("<span class='error'>" + response["datos"]["phone"] + "</span>");
                  }
                  if (response["datos"]["country"] !== undefined && response["datos"]["country"] !== null) {
                      $("#country").focus().after("<span class='error'>" + response["datos"]["country"] + "</span>");
                  }
                  if (response["datos"]["province"] !== undefined && response["datos"]["province"] !== null) {
                      $("#province").focus().after("<span class='error'>" + response["datos"]["province"] + "</span>");
                  }
                  if (response["datos"]["town"] !== undefined && response["datos"]["town"] !== null) {
                      $("#town").focus().after("<span class='error'>" + response["datos"]["town"] + "</span>");
                  }
              }
          }
      }, "json").fail(function (xhr, textStatus, errorThrown) {
          console.log(xhr);
      });
  }
}

function fill() {
  var user = Tools.readCookie("user");
  user = user.split('|');
  data = {'token': user[0]};
  dataJSON = JSON.stringify(data);
  $.post(amigable('?module=users&function=profile_filler'), {userJSON: dataJSON},
      function(response){
      response = JSON.parse(response);
      //console.log(response);
      if(response.success){
          $("#named").val(response.user['named']);
          $("#surname").val(response.user['surname']);
          $("#date_birthday").val(response.user['date_birthday']);
          $("#passwd").val("");
          $("#name_user").val(response.user['name_user']);
          $("#phone").val(response.user['phone']);
          $("#country").empty();
          $("#avatar_user").attr('src',response.user['avatar']);
          $("#email").val(response.user['email']);

          load_countries_v1(response.user['country']);
          if (response.user['country'] == "ES") {
              $("#province").prop('disabled', false);
              $("#town").prop('disabled', false);
              load_provincias_v1(response.user['province']);
              load_poblaciones_v1(response.user['province'], response.user['town']);
          }
      }
  });
}


function load_countries_v2(cad, pais) {
  $.post( cad, function(data) {
      $("#country").empty();
      $("#country").append('<option value="" selected="selected">Select a Country</option>');

      $.each(data, function (i, valor) {
          if (valor.sName.length > 20) {
              valor.sName = valor.sName.substring(0, 19);
          }
          if (pais == valor.sISOCode){
              $("#country").append("<option value='" + valor.sISOCode + "' selected='selected' >" + valor.sName + "</option>");
          }else{
              $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
          }
      });
  }).fail(function() {
      alert( "error load_countries" );
  });
}

function load_countries_v1(pais) {
  $.post( amigable('?module=users&function=load_pais_users'),{'load_pais':true},
  function( response ) {
      if(response.match(/error/gi)){
          load_countries_v2("http://localhost/Gamebets/resources/ListOfCountryNamesByName.json", pais);
      }else{
          load_countries_v2(amigable('?module=users&function=load_pais_users'),{'load_pais':true}); //oorsprong.org
      }
  }).fail(function(response) {
      load_countries_v2("http://localhost/Gamebets/resources/ListOfCountryNamesByName.json", pais);
  });
}

function load_provincias_v2(prov) {
  $.post("../../resources/provinciasypoblaciones.xml", function (xml) {
      $("#province").empty();
      $("#province").append('<option value="" selected="selected">Select a Province</option>');

      $(xml).find("provincia").each(function () {
          var id = $(this).attr('id');
          var nombre = $(this).find('nombre').text();
          if (prov == id)
              $("#province").append("<option value='" + id + "' selected='selected'>" + nombre + "</option>");
          else
              $("#province").append("<option value='" + id + "'>" + nombre + "</option>");
      });
  }).fail(function() {
      alert( "error load_provincias" );
  });
}

function load_provincias_v1(prov) { //provinciasypoblaciones.xml - xpath
  $.post( amigable('?module=users&function=load_provincias_users'),{'load_provincias':true},
      function( response ) {
            $("#province").empty();
	          $("#province").append('<option value="" selected="selected">Select a Province</option>');

            var json = JSON.parse(response);
    		    var provincias=json.provincias;

            if(provincias === 'error'){
                load_provincias_v2(prov);
            }else{
              for (var i = 0; i <  provincias.length; i++) {
                  if (prov == provincias[i].id)
                      $("#province").append("<option value='" + provincias[i].id + "' selected='selected'>" + provincias[i].nombre + "</option>");
                  else
                      $("#province").append("<option value='" + provincias[i].id + "'>" + provincias[i].nombre + "</option>");
              }
            }
    }).fail(function(response) {
        load_provincias_v2(prov);
    });
}

function load_poblaciones_v2(prov, pobl) {
    $.post("../../resources/provinciasypoblaciones.xml", function (xml) {
		$("#town").empty();
	  $("#town").append('<option value="" selected="selected">Select a Town</option>');

		$(xml).find('provincia[id=' + prov + ']').each(function(){
    		$(this).find('localidad').each(function(){
         var text = $(this).text();
         if (text.length > 22)
             text = text.substring(0, 21);
         if (pobl == text)
             $("#town").append("<option value='" + text + "' selected='selected' >" + text + "</option>");
         else
             $("#town").append("<option value='" + text + "'>" + text + "</option>");
    		});
    });
	}).fail(function() {
        alert( "error load_poblaciones" );
  });
}

function load_poblaciones_v1(prov, pobl) { //provinciasypoblaciones.xml - xpath
  var datos = { idPoblac : prov  };
	$.post(amigable("?module=users&function=load_poblacion_users"), datos, function(response) {
      var json = JSON.parse(response);
    	var poblaciones=json.poblaciones;
    	$("#town").empty();
      $("#town").append('<option value="" selected="selected">Select a Town</option>');

      if(poblaciones === 'error'){
          load_poblaciones_v2(prov, pobl);
      }else{
          for (var i = 0; i < poblaciones.length; i++) {
              if (poblaciones[i].poblacion.length > 22)
                  poblaciones[i].poblacion = poblaciones[i].poblacion.substring(0, 21);
              if (pobl == poblaciones[i].poblacion)
                  $("#town").append("<option value='" + poblaciones[i].poblacion + "' selected='selected'>" + poblaciones[i].poblacion + "</option>");
              else
                  $("#town").append("<option value='" + poblaciones[i].poblacion + "'>" + poblaciones[i].poblacion + "</option>");
          }
      }
	}).fail(function() {
      load_poblaciones_v2(prov, pobl);
  });
}
