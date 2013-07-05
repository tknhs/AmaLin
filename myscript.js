var url = location.pathname;
var u_isbn = url.match(/\/(dp|gp)(\/product)?\/([0-9a-zA-Z]+)/).toString();
var isbn = RegExp.$3;

var lc = "http://linkit.kanazawa-it.ac.jp/opac/cgi/searchS.cgi?AC=1&RI10=IB&SW10="+isbn
var xhr = new XMLHttpRequest();
xhr.open("GET", lc, true);
xhr.onreadystatechange = function() {

  if (xhr.readyState == 4 && xhr.status==200) {
    var linkit = document.createElement("linkit");
    linkit.innerHTML = xhr.responseText;
    var book = linkit.getElementsByTagName("a")[1];

    // LC have this Book.
    if (book != null) {
      console.log('ok');
      var ele = document.createElement("p");
      ele.innerHTML = "<a href="+lc+" target='_blank'><font size='5' color='#006400'>LCに所蔵されています</font></a>";
      document.getElementById("actualPriceExtraMessaging").appendChild(ele);
    }
    else {
      console.log('NG');
    }
  }
}
xhr.send();

