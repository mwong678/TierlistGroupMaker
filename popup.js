const imageSize = "150px",
			sender = "POPUP",
			AVERAGE = "AVERAGE",
      UNDO    = "UNDO";
let rankMap = null;

$(document).ready(function() {
	let imageUrl = chrome.extension.getBackgroundPage().currImageUrl;
	rankMap = chrome.extension.getBackgroundPage().ranks;

	setScoreSystem(rankMap);

	$("#current").attr("src", imageUrl);
	$("#current").css("height", imageSize);
	$("#current").css("width", imageSize);


	$("#submitScores").click(function(event) {
	  event.preventDefault();
		submitScores();
	});

	$("#undo").click(function(event) {
	  event.preventDefault();
		undo();
	});

	$("#scoreEntry").focus();
});

function setScoreSystem(rankMap) {
	const sortedKeys = Object.keys(rankMap).sort(function(a, b) {return a - b});

	for (let i = 0; i < sortedKeys.length; i++){
		if (i == sortedKeys.length - 1){
			$("<p class='tiertext'></p>").text(`${rankMap[sortedKeys[i]]}: ${sortedKeys[i]} - 10.00`).prependTo($("#scoreSystem"));
		} else {
			$("<p class='tiertext'></p>").text(`${rankMap[sortedKeys[i]]}: ${sortedKeys[i]} - ${sortedKeys[i + 1]}`).prependTo($("#scoreSystem"));
		}

	}
}

$(document).on("keypress", function(e) {
    if (e.which == 13) {
			submitScores();
    }
});

function submitScores(){
	if (!$("#scoreEntry").val()){
		return;
	}
	let scores = $("#scoreEntry").val().replace(/ /g,'');
	
	chrome.runtime.sendMessage({type: AVERAGE, sender: sender, scores: scores});
	location.reload();
}

function undo(){
	chrome.runtime.sendMessage({type: UNDO, sender: sender});
	location.reload();
}
