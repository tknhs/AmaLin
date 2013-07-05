var url = location.pathname;
var u_isbn = url.match(/\/(dp|gp)(\/product)?\/([0-9a-zA-Z]+)/).toString();
var isbn = RegExp.$3;
var lc = "http://linkit.kanazawa-it.ac.jp/opac/cgi/searchS.cgi?AC=1&RI10=IB&SW10="+isbn

/* send to globalpage */
safari.self.tab.dispatchMessage("URL", lc);

/* get from globalpage */
safari.self.addEventListener("message", function(evt){
  var bool = evt.message;
  //console.log(bool);

  /* LC have this Book. */
  var ele = document.createElement("p");
  if (bool == true) {
    ele.innerHTML = "<a href="+lc+" target='_blank'><font size='5' color='#006400'>LCに所蔵されています</font></a>";
  }
  else {
    ele.innerHTML = "<font size='5' color='#990012'>LCに所蔵されていません</font>";
  }
  document.getElementById("actualPriceExtraMessaging").appendChild(ele);
}, false);

