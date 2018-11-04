'use strict';

var simplePage = 1;
function getReadTime() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'getTextElements.js'}, function (result) {
        toggleReadTime.innerHTML = result;
    })
  });
}

function simplifyPage() {
  simplePage*=-1;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'simplifyPage.js'}, function (result) {

    })
  });
  if(simplePage == 1) {
    toggleSimple.innerHTML = "Simplify page: Off";
  }
  else {
    toggleSimple.innerHTML = "Simplify page: On";
  }
}
getReadTime();

document.getElementById('simplify').addEventListener('click', simplifyPage);
