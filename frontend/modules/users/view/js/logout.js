$(document).ready(function () {
    $("#logout").click(function () {
        logout();
    });
});

function logout(){
  var user = Tools.readCookie("user");
  user = user.split("|");
  var data = {"token":user[0]};
  var data_login_JSON = JSON.stringify(data);

  $.post(amigable("?module=users&function=logout"),
          {login_json: data_login_JSON},
    function (response) { //Si la respuesta del controlador de PHP es positiva
      console.log(response);
      if (response) {
          Tools.eraseCookie("user");
          Tools.eraseCookie("tw"); //no recordaria que l'usuari ha entrat en Twitter, tindria que entrar en Twitter novament
          window.location.href = amigable("?module=main&function=begin");
      }
  }, "json").fail(function (xhr){
    console.log(xhr.responseText);

  });
}
