  var setCookie = function(name, value, expiracy) {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + expiracy * 1000);
  var c_value = escape(value) + ((expiracy == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = name + "=" + c_value + '; path=/';
};

var getCookie = function(name) {
  var i, x, y, ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == name) {
      return y ? decodeURI(unescape(y.replace(/\+/g, ' '))) : y;
    }
  }
};

$('#downloadLink').click(function() {
  $('#fader').css('display', 'block');
  setCookie('downloadStarted', 0, 100);
  setTimeout(checkDownloadCookie, 500);
});
var downloadTimeout;
var checkDownloadCookie = function() {
  if (getCookie("downloadStarted") == 1) {
    setCookie("downloadStarted", "false", 100);
    $('#fader').css('display', 'none');
  } else {
    downloadTimeout = setTimeout(checkDownloadCookie, 1000);
  }
};