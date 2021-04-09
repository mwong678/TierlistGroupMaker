var currImageUrl = null;

chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  if (tab.url.toLowerCase().indexOf("tiermaker.com") > -1) {
    chrome.pageAction.show(tab.id);
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, callback) {
    console.log(request);
    currImageUrl = request.imageUrl;
  }
);