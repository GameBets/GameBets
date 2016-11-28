//JQUERY function focus and blur
//focus es si el usuario ha insertado el foco en ese valor
//blur es si el usuario ha retirado el foco de ese valor

jQuery.fn.fill_or_clean = function () {
    this.each(function () {
        if ($("#name_user").attr("value") === "") {
            $("#name_user").attr("value", "Nombre de usuario");
            $("#name_user").focus(function () {
                if ($("#name_user").attr("value") == "Nombre de usuario") {
                    $("#name_user").attr("value", "");
                }
            });
        }
        $("#name_user").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#name_user").attr("value") === "") {
                $("#name_user").attr("value", "Nombre de usuario");
            }
        });

        if ($("#name").attr("value") === "") {
            $("#name").attr("value", "Nombre");
            $("#name").focus(function () {
                if ($("#name").attr("value") == "Nombre") {
                    $("#name").attr("value", "");
                }
            });
        }
        $("#name").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#name").attr("value") === "") {
                $("#name").attr("value", "Nombre");
            }
        });

        if ($("#surname").attr("value") === "") {
            $("#surname").attr("value", "Apellidos");
            $("#surname").focus(function () {
                if ($("#surname").attr("value") == "Apellidos") {
                    $("#surname").attr("value", "");
                }
            });
        }
        $("#surname").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#surname").attr("value") === "") {
                $("#surname").attr("value", "Apellidos");
            }
        });

        if ($("#date_birthday").attr("value") === "") {
            $("#date_birthday").attr("value", "dd/mm/yyyy");
            $("#date_birthday").focus(function () {
                if ($("#date_birthday").attr("value") == "dd/mm/yyyy") {
                    $("#date_birthday").attr("value", "");
                }
            });
        }
        $("#date_birthday").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#date_birthday").attr("value") === "") {
                $("#date_birthday").attr("value", "dd/mm/yyyy");
            }
        });

        if ($("#email").attr("value") === "") {
            $("#email").attr("value", "Correo electrónico");
            $("#email").focus(function () {
                if ($("#email").attr("value") == "Correo electrónico") {
                    $("#email").attr("value", "");
                }
            });
        }
        $("#email").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#email").attr("value") === "") {
                $("#email").attr("value", "Correo electrónico");
            }
        });

        if ($("#phone").attr("value") === "") {
            $("#phone").attr("value", "Telefono");
            $("#phone").focus(function () {
                if ($("#phone").attr("value") == "Telefono") {
                    $("#phone").attr("value", "");
                }
            });
        }
        $("#phone").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#phone").attr("value") === "") {
                $("#phone").attr("value", "Telefono");
            }
        });
    });
    return this;
};

Dropzone.autoDiscover = false;
$(document).ready(function () {

  //Datepicker fecha nacimiento
	$('#date_birthday').datepicker({
		dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
		yearRange: '-100:-18',
		onSelect: function(selectedDate) {
		}
	});

  $("#submit_users").click(function () {
      validate_users();
  });

  load_countries_v1();
  $("#province").empty();
  $("#province").append('<option value="" selected="selected">Selecciona una Provincia</option>');
  $("#province").prop('disabled', true);
  $("#town").empty();
  $("#town").append('<option value="" selected="selected">Selecciona una Poblacion</option>');
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
     load_provincias_v1();
  }//fi else
});

$("#province").change(function() {
  var prov = $(this).val();
  if(prov > 0){
    load_poblaciones_v1(prov);
  }else{
    $("#town").prop('disabled', false);
  }
});

  //Control de seguridad para evitar que al volver atrás de la pantalla results a create, no nos imprima los datos
  $.get("../../users/load_data_users/", {'load_data':true},
    function (response) {
      //alert(response.user);
      if (response.users === "") {
        $("#name_user").val('');
        $("#password").val('');
        $("#repeat_password").val('');
        $("#name").val('');
        $("#surname").val('');
        $("#date_birthday").val('');
        $("#email").val('');
        $("#phone").val('');

        $(this).fill_or_clean();//siempre que creemos un plugin debemos llamarlo, sino no funcionará
      } else {
        $("#name_user").val(response.users.name_user);
        $("#password").val(response.users.password);
        $("#repeat_password").val(response.users.repeat_password);
        $("#name").val(response.users.name);
        $("#surname").val(response.users.surname);
        $("#date_birthday").val(response.users.date_birthday);
        $("#email").val(response.users.email);
        $("#phone").val(response.users.phone);
      }
    }, "json");

	//Dropzone function
    $("#dropzone").dropzone({
        url: "../../users/upload_avatar_users/",
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
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'width': '40vw'}, 300);
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
                url: "../../users/delete_avatar_users/",
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

    //Regular expressions
    var name_user_reg = /^[0-9a-zA-z]+$/;
    var password_reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    var name_reg = /^[a-zA-Z]+$/;
    var surname_reg = /^[a-zA-Z\ ]+$/;
    var date_birthday_reg = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;
    var email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phone_reg = /^[0-9]{9}$/;

    //Corregir error
    //Hasta que no introduzcamos un valor que acepte la expresion regular, no se borrara el error
    $("#name_user").keyup(function () {
        if ($(this).val() !== "" && name_user_reg.test($(this).val())) {
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

    $("#repeat_password").keyup(function () {
        if ($(this).val() !== "" && $(this).val() === $("#password").val()) {
            $(".error_javascript").fadeOut();
            return false;
        }
    });

    $("#name").keyup(function () {
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
});

//Validar y guardar datos
function validate_users() {

  var result = true;

  //Recogemos los valores del usuario
  var name_user = document.getElementById('name_user').value;
  var password = document.getElementById('password').value;
  var repeat_password = document.getElementById('repeat_password').value;
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var date_birthday = document.getElementById('date_birthday').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var country = document.getElementById('country').value;
  var province = document.getElementById('province').value;
  var town = document.getElementById('town').value;

  //Regular expressions
  var name_user_reg = /^[0-9a-zA-z]+$/;
  var password_reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-_])(?=.{8,})/;
  var name_reg = /^[a-zA-Z]+$/;
  var surname_reg = /^[a-zA-Z\ ]+$/;
  var date_birthday_reg = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;
  var email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var phone_reg = /^[0-9]{9}$/;

  $(".error").remove();

  //Pintar los errores
  //Si no hemos insertado correctamente el valor, se nos mostrara el mensaje de error
  if ($("#name_user").val() === "" || $("#name_user").val() == "Nombre de usuario") {
      $("#name_user").focus().after("<span class='error_javascript'>Introduzca nombre de usuario</span>");
      result = false;
      return false;
  } else if (!name_user_reg.test($("#name_user").val())) {
      $("#name_user").focus().after("<span class='error_javascript'>Solo puede contener numeros y letras</span>");
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

  if ($("#repeat_password").val() === "" || $("#repeat_password").val() == "Contraseña") {
      $("#repeat_password").focus().after("<span class='error_javascript'>Inserte contraseña</span>");
      result = false;
      return false;
  } else if ($("#repeat_password").val() !== $("#password").val()) {
      $("#repeat_password").focus().after("<span class='error_javascript'>La contraseña no coincide</span>");
      result = false;
      return false;
  }

  else if ($("#name").val() === "" || $("#name").val() == "Nombre") {
      $("#name").focus().after("<span class='error_javascript'>Inserte nombre</span>");
      result = false;
      return false;
  } else if (!name_reg.test($("#name").val())) {
      $("#name").focus().after("<span class='error_javascript'>Solo puede contener letras</span>");
      result = false;
      return false;
  }

  if ($("#surname").val() === "" || $("#surname").val() == "Apellidos") {
      $("#surname").focus().after("<span class='error_javascript'>Inserte apellidos</span>");
      result = false;
      return false;
  } else if (!surname_reg.test($("#surname").val())) {
      $("#surname").focus().after("<span class='error_javascript'>Solo puede contener letras y 1 espacio</span>");
      result = false;
      return false;
  }

  if ($("#date_birthday").val() === "" || $("#date_birthday").val() == "mm/dd/yyyy") {
      $("#date_birthday").focus().after("<span class='error_javascript'>Inserte fecha de nacimiento</span>");
      result = false;
      return false;
  } else if (!date_birthday_reg.test($("#date_birthday").val())) {
      $("#date_birthday").focus().after("<span class='error_javascript'>Error formato de fecha [mm/dd/yyyy]</span>");
      result = false;
      return false;
  }

  if ($("#email").val() === "" || $("#email").val() == "Correo electrónico") {
      $("#email").focus().after("<span class='error_javascript'>Inserte correo electrónico</span>");
      result = false;
      return false;
  } else if (!email_reg.test($("#email").val())) {
      $("#email").focus().after("<span class='error_javascript'>Ejemplo: micorreo@ejemplo.com</span>");
      result = false;
      return false;
  }

  if ($("#phone").val() === "" || $("#phone").val() == "Telefono") {
      $("#phone").focus().after("<span class='error_javascript'>Inserte telefono</span>");
      result = false;
      return false;
  } else if (!phone_reg.test($("#phone").val())) {
      $("#phone").focus().after("<span class='error_javascript'>Debe contener 9 digitos</span>");
      result = false;
      return false;
  }

  if (!validate_pais($("#country").val())){
    $("#country").focus().after("<span class='error_javascript'>Seleccione un pais</span>");
    result = false;
    return false;
  }

  if (!validate_provincia($("#province").val())){
    $("#province").focus().after("<span class='error_javascript'>Seleccione una provincia</span>");
    result = false;
    return false;
  }

  if (!validate_poblacion($("#town").val())){
    $("#town").focus().after("<span class='error_javascript'>Seleccione una poblacion</span>");
    result = false;
    console.log("8");
    return false;
  }

  if (result) { //Si el resultado es positivo, cogemos todos los valores y se los enviamos al controlador de PHP  con un JSON
    var data = {"name_user": name_user, "password": password, "name": name, "surname": surname, "date_birthday": date_birthday,
                "email": email, "phone": phone, "country": country, "province": province, "town": town};

    //Metemos todos los datos en un JSON
    var data_users_JSON = JSON.stringify(data);

    //Le enviamos el JSON al Controllador de PHP
    $.post("../../users/alta_users/",
            {create_users: data_users_JSON},
      function (response) { //Si la respuesta del controlador de PHP es positiva
        //console.log(response);
        if (response.success) {
          window.location.href =response.redirect;
        }
    }, "json").fail(function (xhr){
      //console.log(xhr);
      if (xhr.responseJSON.error.name_user){ //Si la respuesta del controlador de PHP es negativa, pintamos los errores
        $("#name_user").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.name_user + "</span>");
      }
      if (xhr.responseJSON.error.password){
        $("#password").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.password + "</span>");
      }
      if (xhr.responseJSON.success_avatar) {
          if (xhr.responseJSON.img_users !== "/media/default-avatar.png") {
              //$("#progress").show();
              //$("#bar").width('100%');
              //$("#percent").html('100%');
              //$('.msg').text('').removeClass('msg_error');
              //$('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right' : '300px' }, 300);
          }
      } else {
          $("#progress").hide();
          $('.msg').text('').removeClass('msg_ok');
          $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'width': '40vw'}, 300);
      }
      if (xhr.responseJSON.error.name){
        $("#name").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.name + "</span>");
      }
      if (xhr.responseJSON.error.surname){
        $("#surname").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.surname + "</span>");
      }
      if (xhr.responseJSON.error.date_birthday){
        $("#date_birthday").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.date_birthday + "</span>");
      }
      if (xhr.responseJSON.error.email){
        $("#email").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.email + "</span>");
      }
      if (xhr.responseJSON.error.phone){
        $("#phone").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.phone + "</span>");
      }
      if (xhr.responseJSON.error.country){
        $("#country").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.country + "</span>");
      }
      if (xhr.responseJSON.error.province){
        $("#province").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.province + "</span>");
      }
      if (xhr.responseJSON.error.town){
        $("#town").focus().after("<span class='error_javascript'>" + xhr.responseJSON.error.town + "</span>");
      }
    });
  }
}

function validate_pais(pais) {
    if (pais == null) {
        return false;
    }
    if (pais.length == 0) {
        return false;
    }
    if (pais === 'Selecciona un Pais') {
        return false;
    }
    if (pais.length > 0) {
        var regexp = /^[a-zA-Z]*$/;
        return regexp.test(pais);
    }
    return false;
}

function validate_provincia(provincia) {
    if (provincia == null) {
        return 'default_provincia';
    }
    if (provincia.length == 0) {
        return 'default_provincia';
    }
    if (provincia === 'Selecciona una Provincia') {
        //return 'default_provincia';
        return false;
    }
    if (provincia.length > 0) {
        var regexp = /^[a-zA-Z0-9, ]*$/;
        return regexp.test(provincia);
    }
    return false;
}

function validate_poblacion(poblacion) {
    if (poblacion == null) {
        return 'default_poblacion';
    }
    if (poblacion.length == 0) {
        return 'default_poblacion';
    }
    if (poblacion === 'Selecciona una Poblacion') {
        //return 'default_poblacion';
        return false;
    }
    if (poblacion.length > 0) {
        var regexp = /^[a-zA-Z/, -'()]*$/;
        return regexp.test(poblacion);
    }
    return false;
}

function load_countries_v2(cad) {
    $.post( cad, function(data) {
      $("#country").empty();
      $("#country").append('<option value="" selected="selected">Selecciona un Pais</option>');

      $.each(data, function (i, valor) {
        $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
      });
    }).fail(function() {
        alert( "error load_countries" );
    });
}

function load_countries_v1() {
    $.post( "../../users/load_pais_users/",{'load_pais':true},
        function( response ) {
            //console.log(response);
            if(response.match(/error/gi)){
                load_countries_v2("../../resources/ListOfCountryNamesByName.json");
            }else{
                load_countries_v2("../../users/load_pais_users/",{'load_pais':true}); //oorsprong.org
            }
    }).fail(function(response) {
        load_countries_v2(".../../resources/ListOfCountryNamesByName.json");
    });
}

function load_provincias_v2() {
    $.post("../../resources/provinciasypoblaciones.xml", function (xml) {
	    $("#province").empty();
	    $("#province").append('<option value="" selected="selected">Selecciona una Provincia</option>');

        $(xml).find("provincia").each(function () {
            var id = $(this).attr('id');
            var nombre = $(this).find('nombre').text();
            $("#province").append("<option value='" + id + "'>" + nombre + "</option>");
        });
    }).fail(function() {
        alert( "error load_provincias" );
    });
}

function load_provincias_v1() { //provinciasypoblaciones.xml - xpath
    $.post( "../../users/load_provincias_users/",{'load_provincias':true},
        function( response ) {
            $("#province").empty();
	          $("#province").append('<option value="" selected="selected">Selecciona una Provincia</option>');

            var json = JSON.parse(response);
    		    var provincias=json.provincias;

            if(provincias === 'error'){
                load_provincias_v2();
            }else{
                for (var i = 0; i < provincias.length; i++) {
            		    $("#province").append("<option value='" + provincias[i].id + "'>" + provincias[i].nombre + "</option>");
        		    }
            }
    }).fail(function(response) {
        load_provincias_v2();
    });
}

function load_poblaciones_v2(prov) {
    $.get("../../resources/provinciasypoblaciones.xml", function (xml) {
		$("#town").empty();
	  $("#town").append('<option value="" selected="selected">Selecciona una Poblacion</option>');

		$(xml).find('provincia[id=' + prov + ']').each(function(){
    		$(this).find('localidad').each(function(){
    			 $("#town").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
    		});
    });
	}).fail(function() {
        alert( "error load_poblaciones" );
  });
}

function load_poblaciones_v1(prov) { //provinciasypoblaciones.xml - xpath
    var datos = { idPoblac : prov  };
	$.post("../../users/load_poblacion_users/", datos, function(response) {
	  //alert(response);
    var json = JSON.parse(response);
		var poblaciones=json.poblaciones;
		//alert(poblaciones);
		//console.log(poblaciones);
		//alert(poblaciones[0].poblacion);

		$("#town").empty();
	  $("#town").append('<option value="" selected="selected">Selecciona una Poblacion</option>');

        if(poblaciones === 'error'){
            load_poblaciones_v2(prov);
        }else{
            for (var i = 0; i < poblaciones.length; i++) {
            		$("#town").append("<option value='" + poblaciones[i].poblacion + "'>" + poblaciones[i].poblacion + "</option>");
        		}
        }
	})
	.fail(function() {
        load_poblaciones_v2(prov);
    });
}
