const baseUrl = "https://tiermaker.com/",
			sender = "CONTENT",
			AVERAGE = "AVERAGE",
      UNDO    = "UNDO",
			IMAGE   = "IMAGE",
			RANK    = "RANK";

let currIndex = 0,
		rankThresholds = [],
		rankMap = {};

window.onload = init;

chrome.runtime.onMessage.addListener(
  function(request, sender, callback) {
		const type = request.type;
		if (type == AVERAGE) {
			let score = request.average,
					tier  = getTier(score),
					added = false;

			if ($(`#${currIndex + 1}.character`).length) {
				$(`#${currIndex + 1}.character`).attr("score", score);
				$("div[class='tier sort']").eq(tier).children().each(function () {
					let currentScore = $(this).attr("score");

					if (!added && currentScore && score > currentScore){
						$(`#${currIndex + 1}.character`).insertBefore($(this));
						currIndex++;
						updatePhoto();
						added = true;
						return true;
					}
				});

				if (added == false) {
					$(`#${currIndex + 1}.character`).appendTo($("div[class='tier sort']").eq(tier));
					currIndex++;
					updatePhoto();
					return true;
				}
			}

			return true;
		} else if (type == UNDO) {
			if (currIndex == 0) {
				return true;
			}

			currIndex--;
			$(`#${currIndex + 1}.character`).insertAfter($("#char.sort > div:eq(0)"));
			updatePhoto();
			return true;
		}
  }
);

function init() {
	setUpRanks($("div[class='tier sort']").length);
	updatePhoto()
}

function updatePhoto(){
	let currElement = $(".character").eq(currIndex),
			message = currElement.attr("style");
			
	const extractImage = message.substring(message.indexOf("\"") + 1, message.lastIndexOf("\"")),
				imageUrl = `${baseUrl}${extractImage}`;

	chrome.runtime.sendMessage({type: IMAGE, sender: sender, id: currIndex + 1, imageUrl: imageUrl});
}

function getTier(score){
	for (let i = 0; i < rankThresholds.length; i++){
		if (score >= rankThresholds[i]){
			return i;
		}
	}
}

function setUpRanks(numberOfTiers) {
	let	maxScore = 10,
	 		interval = parseFloat(maxScore / numberOfTiers).toFixed(2);

	for (let i = 0; i < numberOfTiers; i++){
		maxScore -= interval;
		if (maxScore < 0) {
			maxScore = 0;
		}
		rankThresholds.push(maxScore.toFixed(2));
	}

	$(".label-holder > .label").each(function(index) {
			rankMap[rankThresholds[index]] = $(this).text();
	});

	chrome.runtime.sendMessage({type: RANK, sender: sender, ranks: rankMap});
}
