$(document).ready(function () {

  var user = Tools.readCookie("user");
  if (user) {
      console.log(user); //yomogan|https://projects-alumnes-yomogan.c9users.io/proj_final_login/JoinElderly//media/flowers.png|client|yomogan
      user = user.split("|");
      $("#log").html("<a class='color4' href='#'>" + user[1] + "</a>");
      $("#log").after("<li><a class='color3' id='logout' href='#' >Log Out</a></li>");
      if ( (user[2] === "worker") || (user[2] === "client")  ) {

      } else if (user[2] === "admin") {

      }
  }

});
