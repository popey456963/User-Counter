window.onload = init
var elements;

function init() {
  testCookie()
  var elements = document.getElementsByClassName("user-counter");
  var currentCount

  for (i=0; i<elements.length; i++) {
    elements[i].innerHTML = 0
  }
  loop()
  window.setInterval(loop, 5000)
}

function loop() {
  data = {
    "location": window.location.href,
    "cookie": readCookie("user-counter-cookie")
  }
  httpGetAsync("http://127.0.0.1:3000/ping?" + serialize(data), function(text) {
    console.log(text)
    for (i=0; i<elements.length; i++) {
      elements[i].innerHTML = text
    }
  })
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


function testCookie() {
  if (!readCookie("user-counter-cookie")) {
    createCookie("user-counter-cookie", makeCookie(), 3650)
  }
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function makeCookie()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}