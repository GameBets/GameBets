
function amigable(url) {
    var link="";
    url = url.replace("?", "");
    url = url.split("&");

    for (var i=0;i<url.length;i++) {
        var aux = url[i].split("=");
        link +=  "/"+aux[1];
    }
    return "http://92.222.89.83/Gamebets" + link;
}
