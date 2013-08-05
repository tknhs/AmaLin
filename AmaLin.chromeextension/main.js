/**
 *
 *  Title  : Amazon.co.jp with LINKIT-II
 *  Author : tknhs
 *
 **/

function AmazonLinkit(prf, nw){
  if (prf == nw){
    nw = location.href + location.search;
  }
  else{
    prf = location.href + location.search;
    nw  = location.href + location.search;
    var local_url = location.pathname;
    var isbn;
    var lc_url = "http://linkit.kanazawa-it.ac.jp/opac/cgi/searchS.cgi?AC=1&SC=F&RI10=IB&SW10=";

    if (local_url.search("/(dp|gp)(\/product)?\/([0-9]+)(X)?") != -1){
      /* a book page */
      isbn = RegExp.$3 + RegExp.$4;
      lc = lc_url + isbn;
      request(lc, 0);
    }
    if (local_url.search("/s/") != -1){
      /* search results page */
      var sp = search_page();
      $.each(sp.id, function(i){
        lc = lc_url + sp.isbn[i];
        request(lc, 1, i, sp);
      });
    }
  }
  setTimeout(function(){ AmazonLinkit(prf, nw); }, 1500);
}

function search_page(){
  var divtag = document.getElementsByTagName("div");
  var d_id = new Array();
  var d_isbn = new Array();
  var cnt = 0;
  for (var i = 0; i < divtag.length; i++){
    if (divtag[i].id.search("result_[0-9]*") != -1){
      if (divtag[i].outerHTML.search('name=\"\([0-9]+)(X)?\"') != -1){
        d_id[cnt] = divtag[i].id;
        d_isbn[cnt] = RegExp.$1 + RegExp.$2;
        cnt++;
      }
    }
  }
  return {id : d_id, isbn : d_isbn};
}

function request(lc, whichreq, repeat, srch){
  /**
   *  XMLHttpRequest
   *  @param lc       : required
   *  @param whichreq : required
   */
  var url = lc;
  var wr = whichreq;
  var rep = (repeat === undefined) ? 0 : repeat;
  var sp = (srch === undefined) ? 0 : srch;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var linkit = document.createElement("linkit");
      linkit.innerHTML = xhr.responseText;
      var book = linkit.getElementsByTagName("a")[1];

      // LC have this Book.
      var ele = document.createElement("p");
      ele.innerHTML = (
          (book == null)
          ? "<font size='3' color='#990012'>LCに所蔵されていません</font>"
          : "<a href="+lc+" target='_blank'><font size='3' color='#006400'>LCに所蔵されています</font></a>"
      );

      // which request?
      if (wr == 0){
        /* book page */
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
      }
      else if(wr == 1){
        /* search result page */
        var getID = document.getElementById(sp.id[rep]);
        if (getID.attributes[2].nodeValue == sp.isbn[rep]){
          getID.childNodes[3].nextSibling.appendChild(ele);
        }
      }
    }
  }
  xhr.send();
}

var nw = "";
var prf = location.href + location.search;
AmazonLinkit(prf, nw);

