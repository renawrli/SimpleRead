var result
var toggleStatus  = 1;
function getTextElements() {
  toggleStatus *= -1;
  // alert("getTextElements called");
  var arr = Array.from(document.getElementsByTagName("p"));

  // arr[0].style.visibility = "none";
  // alert(arr.length);
  var headerList = ["h1", "h2", "h3", "h4", "h5", "h6"];
  for (var i = 0; i < headerList.length; i++) {
    var temp = Array.from(document.getElementsByTagName(headerList[i]));
    arr = arr.concat(temp);
  }
  // alert(arr.length);
  var wordCount = 0;
  var wordString = ""
  for (var i = 0; i<arr.length; i++) {
    var elem = arr[i];
    var words = getTextOfElement(elem);
    wordString += words
    // wordCount += words.split(' ').length;
  }
  // toggleReadTime.innerHTML = "Read time: "+wordCount/250.0;
  // alert( wordCount/250.0);
  wordCount = wordString.trim().split(/\s+/).length;
  console.log(wordCount)
  return wordCount/250.0;
}

function getTextOfElement(elem) {
    var ret = "";
    var length = elem.childNodes.length;
    for(var i = 0; i < length; i++) {
        var node = elem.childNodes[i];
        if(node.nodeType != 8) {
            ret += node.nodeType != 1 ? node.nodeValue : getTextOfElement(node);
        }
    }
    return ret;
}

result = getTextElements();

if(toggleStatus == -1) {
  "Read time: " + result + " minutes"
}
