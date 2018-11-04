'use strict';


chrome.storage.sync.get(['nonMain'], function(result) {
  let currentNonMain = result.nonMain;
  if (currentNonMain != undefined) {
    toggleNonMainText.innerHTML = 'Non-main Content: ' + currentNonMain;
  }
});

chrome.storage.sync.get(['nonMainCheck'], function(result) {
  let currentNonMainCheck = result.nonMainCheck;
  if (currentNonMainCheck != undefined) {
    document.getElementById("toggleNonMain").checked = currentNonMainCheck;
  }
});

chrome.storage.sync.get(['userSpeed'], function(result) {
  let currentSpeed = result.userSpeed;
  if (currentSpeed != undefined) {
    speedText.innerHTML = Math.floor(currentSpeed) + ' word(s) per minute';
  }
});

chrome.storage.sync.get(['userTime'], function(result) {
  let currentTime = result.userTime;
  if (currentTime != undefined) {
    timeText.innerHTML = Math.floor(currentTime) + ' minute(s)';
  }
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
    toggleNonMainText.innerHTML = 'Non-main Content: ' + nonMainStatus;
    document.getElementById("toggleNonMain").checked = nonMainCheckStatus;
  }
  else {
    nonMainStatus = "Off"
    nonMainCheckStatus = false
    toggleNonMainText.innerHTML = 'Non-main Content: ' + nonMainStatus;
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
  var time = document.getElementById("userInput").value;
  if (time == null) {
    getReadTime();
  }
  wordCount(time)
  chrome.storage.sync.set({'userTime': time}, function() {
    displayReadTime();
  });
}

function wordCount(userTime) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'getTextElements.js'}, function (result) {
        var count = result;
        var readSpeed = count / userTime;
        if (readSpeed == 0) {
            readSpeed = 1;
        }
        saveReadSpeed(readSpeed);
        getReadSpeed(count);
      })
  });
}

// update (save) readSpeed
function saveReadSpeed(readSpeed) {
    chrome.storage.sync.set({'userSpeed': readSpeed}, function() {
    });
}

function getReadSpeed(count) {
    chrome.storage.sync.get(['userSpeed'], function(result) {
        let getUserSpeed = result.userSpeed;
        speedText.innerHTML = Math.floor(getUserSpeed) + ' word(s) per minute';
        var readTime = (count / getUserSpeed);
    });
}

// display readTime
function displayReadTime() {
  chrome.storage.sync.get(['userTime'], function(result) {
    let getReadTime = result.userTime;
    // alert('display ' + getReadTime)
    timeText.innerHTML = Math.floor(getReadTime) + ' minute(s)';
  });
}

function getReadTime() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'getTextElements.js'}, function (result) {
        timeText.innerHTML = Math.floor(result/250) + ' minute(s)';
        speedText.innerHTML = '250 word(s) per minute';
    })
  });
}

// getReadTime();
document.getElementById('toggleNonMain').addEventListener('click', getToggleNonMain);
document.getElementById('timeBtn').addEventListener('click', setUserTime);
document.getElementById('userInput').addEventListener('change', setUserTime);
document.getElementById('calcTime').addEventListener('click', setUserTime);
