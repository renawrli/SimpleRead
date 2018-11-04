'use strict';

chrome.storage.sync.get(['nonMain'], function(result) {
  let currentNonMain = result.nonMain;
  toggleNonMainText.innerHTML = 'Non-main Content: ' + currentNonMain;
});

chrome.storage.sync.get(['nonMainCheck'], function(result) {
  let currentNonMainCheck = result.nonMainCheck;
  document.getElementById("toggleNonMain").checked = currentNonMainCheck;
});

chrome.storage.sync.get(['userSpeed'], function(result) {
  let currentTime = result.userSpeed;
  timeText.innerHTML = currentTime + " minute(s)";
});

// on off (text)
function getToggleNonMain() {
  chrome.storage.sync.get(['nonMain'], function(result) {
  let getNonMain = result.nonMain;
  getToggleNonMainCheck(getNonMain);
  });
}

// true false (toggle button)
function getToggleNonMainCheck(getNonMain) {
  chrome.storage.sync.get(['nonMainCheck'], function(result) {
  let getNonMainCheck = result.nonMainCheck;
  toggleNonMain(getNonMain, getNonMainCheck);
  });
}

function saveToggleNonMain(savedToggleNonMain, savedToggleNonMainCheck) {
  chrome.storage.sync.set({'nonMain': savedToggleNonMain, 'nonMainCheck': savedToggleNonMainCheck}, function() {
    // Notify that we saved.
    console.log('Settings updated');
  });
}

function toggleNonMain(nonMainStatus, nonMainCheckStatus) {
  if(nonMainStatus == "Off"){
    nonMainStatus = "On"
    nonMainCheckStatus = true
    toggleNonMainText.innerHTML = "Non-main Content: " + nonMainStatus;
    document.getElementById("toggleNonMain").checked = nonMainCheckStatus;
  }
  else {
    nonMainStatus = "Off"
    nonMainCheckStatus = false
    toggleNonMainText.innerHTML = "Non-main Content: " + nonMainStatus;
    document.getElementById("toggleNonMain").checked = nonMainCheckStatus;
  }
  // updates save
  saveToggleNonMain(nonMainStatus, nonMainCheckStatus)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'simplifyPage.js'}, function (result) {
    })
  });
}

// getting user input (don't save this, save user read speed)
function setUserTime() {
    wordCount(document.getElementById("userInput").value)
}

function wordCount(userTime) {
    var wordCount = 5000;
    var readSpeed = Math.floor(wordCount / userTime);
    if (readSpeed == 0) {
        readSpeed = 1;
    }
    saveReadSpeed(readSpeed);
    getReadSpeed(wordCount);
}

// update (save) readSpeed
function saveReadSpeed(readSpeed) {
    chrome.storage.sync.set({'userSpeed': readSpeed}, function() {
        // Notify that we saved.
        console.log('Settings updated');
    });
}

function getReadSpeed(wordCount) {
    chrome.storage.sync.get(['userSpeed'], function(result) {
        let getUserSpeed = result.userSpeed;
        var readTime = wordCount / getUserSpeed;
        displayReadTime(readTime);
    });
}

// display readTime
function displayReadTime(readTime) {
    timeText.innerHTML = readTime + " minute(s)";
}

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

getReadTime();

document.getElementById('toggleNonMain').addEventListener('click', getToggleNonMain);
document.getElementById('timeBtn').addEventListener('click', setUserTime);
document.getElementById('calcTime').addEventListener('click', wordCount);
