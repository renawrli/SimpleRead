function getText() {
  var arr = document.getElementsByTagName("p");
  var headerList = ["h1", "h2", "h3", "h4", "h6"];
  for (var i = 0; i<headerList.length; i++) {
    arr.concat(Array.from(document.getElementsByTagName(headerList[i])));
  }
}
