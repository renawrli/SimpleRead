chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
  })
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
chrome.storage.sync.set({
    nonMain: "On",
    nonMainCheck: true,
    speedText: 250,
    timeText: 10,
}, function() {
})
});