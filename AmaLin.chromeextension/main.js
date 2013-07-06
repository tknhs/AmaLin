var url = location.pathname;

/* Only the books */
try {
  var u_isbn = url.match(/\/(dp|gp)(\/product)?\/([0-9]+)(X)?/).toString();
  var isbn = RegExp.$3 + RegExp.$4;

  var lc = "http://linkit.kanazawa-it.ac.jp/opac/cgi/searchS.cgi?AC=1&SC=F&RI10=IB&SW10="+isbn
  var xhr = new XMLHttpRequest();
  xhr.open("GET", lc, true);
  xhr.onreadystatechange = function() {

    if (xhr.readyState == 4 && xhr.status==200) {
      var linkit = document.createElement("linkit");
      linkit.innerHTML = xhr.responseText;
      var book = linkit.getElementsByTagName("a")[1];

      // LC have this Book.
      var ele = document.createElement("p");
      if (book != null) {
        //console.log('ok');
        ele.innerHTML = "<a href="+lc+" target='_blank'><font size='5' color='#006400'>LCに所蔵されています</font></a>";
      }
      else {
        //console.log('NG');
        ele.innerHTML = "<font size='5' color='#990012'>LCに所蔵されていません</font>";
      }
      document.getElementById("actualPriceExtraMessaging").appendChild(ele);
    }
  }
  xhr.send();
}
catch(e) {
  /* Except the books */
}
