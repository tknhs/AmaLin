var url = location.pathname;

/* Only the books */
try {
  var u_isbn = url.match(/\/(dp|gp)(\/product)?\/([0-9]+)(X)?/).toString();
  var isbn = RegExp.$3 + RegExp.$4;
  var lc = "http://linkit.kanazawa-it.ac.jp/opac/cgi/searchS.cgi?AC=1&SC=F&RI10=IB&SW10="+isbn

  /* send to globalpage */
  safari.self.tab.dispatchMessage("URL", lc);

  /* get from globalpage */
  safari.self.addEventListener("message", function(evt){
    var bool = evt.message;
    //console.log(bool);

    /* LC have this Book. */
    var ele = document.createElement("p");
    if (bool == true) {
      console.log("have? : yes");
      ele.innerHTML = "<a href="+lc+" target='_blank'><font size='5' color='#006400'>LCに所蔵されています</font></a>";
    }
    else {
      console.log("have? : no");
      ele.innerHTML = "<font size='5' color='#990012'>LCに所蔵されていません</font>";
    }

    // insert place
    var i = 0;
    var nodelist = document.getElementsByClassName("buying");
    for (var nl = 0; nl < nodelist.length; nl++){
      if (nodelist[nl].id == ""){
        i++;
        if (i == 2){
          nodelist[nl].parentNode.insertBefore(ele, nodelist[nl]);
        }
      }
    }
  }, false);
}
catch(e) {
  /* Except the books */
  console.log(e.name);
  console.log(e.message);
}

