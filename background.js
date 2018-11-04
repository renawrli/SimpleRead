chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
  })
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    // alert('tab changed');
    // getReadTime();
chrome.storage.sync.set({
    nonMain: "On",
    nonMainCheck: true,
    speedText: 250,
    timeText: 10,
}, function() {
})
});

// chrome.tabs.onCreated.addListener(function(tab) {
//    getReadTime();
// });

// function getReadTime() {
//     alert('tab changed getReadTime');

//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       {file: 'getTextElements.js'}, function (result) {
//         timeText.innerHTML = Math.floor(result/250) + ' minute(s)';
//     })
//   });
// }