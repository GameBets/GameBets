function load_users_ajax() {
    $.ajax({
        type: 'POST',
        url: "../../users/load_result_users/",
        load: true,
        //dataType: 'json',
        async: false
    }).success(function (data) {
        var json = JSON.parse(data);

        //alert(json.user.usuario);

        mostrar_products(json);

    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}

////////////////////////////////////////////////////////////////
function load_users_get_v1() {
    $.post("../../users/load_result_users/",{"load":true}, function (data, status) {
        var json = JSON.parse(data);
        //$( "#content" ).html( json.msje );
        //alert("Data: " + json.user.usuario + "\nStatus: " + status);

        mostrar_products(json);
    });
}

////////////////////////////////////////////////////////////////
function load_users_get_v2() {
    var jqxhr = $.post("../../users/load_result_users/",{"load":true}, function (data) {
        var json = JSON.parse(data);
        //console.log(json);
        mostrar_products(json);
        //alert( "success" );
    }).done(function () {
        //alert( "second success" );
    }).fail(function () {
        //alert( "error" );
    }).always(function () {
        //alert( "finished" );
    });

    jqxhr.always(function () {
        //alert( "second finished" );
    });
}

$(document).ready(function () {
    //load_users_ajax();
    //load_users_get_v1();
    load_users_get_v2();
});

function mostrar_products(data) {
  console.log(data);
  var content = document.getElementById("content");
  var div_users = document.createElement("div");
  var parrafo = document.createElement("p");

  //Preparamos los datos que queremos mostrar
  var msje = document.createElement("span");
  msje.innerHTML += data.msje;

  //Pintamos los datos que hemos preparado antes
  content.appendChild(div_users);
  div_users.appendChild(parrafo);
  parrafo.appendChild(msje);

}
