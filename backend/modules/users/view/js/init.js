$(document).ready(function () {

  var user = Tools.readCookie("user");
  if (user) {
      console.log(user); //yomogan|https://projects-alumnes-yomogan.c9users.io/proj_final_login/JoinElderly//media/flowers.png|client|yomogan
      user = user.split("|");
      $("#log").html("");
      $("#log").after("<li><a class='color3' id='logout' href='#' >Log Out</a></li>");
      if ( (user[3] === "worker") || (user[3] === "client")  ) {
        $("#log").after('<li><a class="color5" href="#/user/profile">Chat</a></li>');

      } else if (user[3] === "admin") {

      }
  }

});