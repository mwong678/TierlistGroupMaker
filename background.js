const CONTENT = "CONTENT",
      POPUP   = "POPUP",
			AVERAGE = "AVERAGE",
      UNDO    = "UNDO",
			IMAGE   = "IMAGE",
			RANK    = "RANK";

var currImageUrl = null,
    ranks        = null;

chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  if (tab.url.toLowerCase().indexOf("tiermaker.com") > -1) {
    chrome.pageAction.show(tab.id);
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, callback) {
    let source = request.sender;
    if (source == CONTENT){
      let type = request.type;
      if (type == IMAGE) {
        currImageUrl = request.imageUrl;
      } else if (type == RANK) {
        ranks = request.ranks
      } else {
        console.log("Invalid content message type")
      }
    } else if (source == POPUP){
      let type = request.type;
      if (type == AVERAGE) {
        sendMessageToContent(type, getAverage(request.scores));
      } else if (type == UNDO) {
        sendMessageToContent(type, "");
      } else {
        console.log("Invalid popup message type");
      }
    } else {
      console.log("Invalid message type");
    }

    return true;
  }
);

function getAverage(scores){
  const separatedScores = scores.split(",");
  let length = separatedScores.length,
      sum = 0;

  for (let i = 0; i < separatedScores.length; i++){
    if (separatedScores[i]){
      sum += parseFloat(separatedScores[i]);
    } else {
      length--;
    }
  }
  return sum / length;
}

function sendMessageToContent(type, message){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {type: type, average: message});
  });
}
