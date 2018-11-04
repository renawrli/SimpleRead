chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green');
  })
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
chrome.storage.sync.set({
    nonMain: "On",
    nonMainCheck: true,
    userSpeed: 250,
}, function() {
})
});