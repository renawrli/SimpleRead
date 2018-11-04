

bodyElements = document.body.children

var hasBeenRunBefore = false;

if (bodyElements[0].getAttribute(customTag)) {
  hasBeenRunBefore = true
  // for (var j = 0; j < para.length; j++) {
  //   para[i].hidden = false;
  // }
}

if (!hasBeenRunBefore) {
  var body = document.getElementsByTagName("body");
  var para = Array.from(document.getElementsByTagName("p"));
  console.log(para);

  var customTag = 'data-extension-simple-hidden';
  var distanceTag = 'data-extension-para-distance';

  var headers = [];
  var headerList = ["h1", "h2", "h3", "h4", "h5", "h6"];
  for (var i = 0; i < headerList.length; i++) {
    var temp = Array.from(document.getElementsByTagName(headerList[i]));
    headers = headers.concat(temp);
  }
  para = para.concat(headers);

  for (let i = 0; i < bodyElements.length; i++) {
    let element = bodyElements[i];
    element.setAttribute(customTag, "not-hidden");
  }

  // var numbers = [4, 2, 5, 1, 3];
  para.sort(function(a, b) {
    return a - b;
  });
  console.log(para);



  // for (var j = 0; j < para.length; j++) {
  //   para[i].hidden = false;
  // }

  let getTopOffset = function(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition;
  }

  for (var j = 0; j < para.length; j++) {
    para[j].setAttribute(distanceTag, getTopOffset(para[j]));
  }

  para.sort(function(a, b) {
    return a.getAttribute(distanceTag) - b.getAttribute(distanceTag);
  });


  for (let i = 0; i < para.length; i++) {
    para[i] = para[i].cloneNode(true);
  }

  for (var j = 0; j < para.length; j++) {
    let element = para[j]
    element.setAttribute(customTag, "hidden");
    element.hidden = true;
    body[0].appendChild(element);
    console.log(element);
  }
  bodyElements = document.body.children

}


for (let i = 0; i < bodyElements.length; i++) {
  let element = bodyElements[i];
  let currAttribute = element.getAttribute(customTag);
  if (currAttribute !== "hidden") {
    element.setAttribute(customTag, "hidden");
    element.hidden = true
  } else {
    element.setAttribute(customTag, "not-hidden");
    element.hidden = false
  }
}
// for (var j = 0; j < para.length; j++) {
//   let element = para[j]
//   element.setAttribute(customTag, "not-hidden");
//   element.hidden = false;
//   // body[0].appendChild(element);
//   console.log(element);
// }



function simplify() {
  body.style.visibility = "hidden";
  // document.append
  //save p and h* tagged elements
  //nuke html body
  //apply saved p and h*
}
