const baseUrl = "https://tiermaker.com/",
	  sTier = 0;
let currIndex = 0;

$(document).ready(function() {
	let currElement = $(".character").eq(currIndex),
		message = currElement.attr("style");

	console.log(currElement);
	const extractImage = message.substring(message.indexOf("\"") + 1, message.lastIndexOf("\"")),
		  imageUrl = `${baseUrl}${extractImage}`;

	//$(`#${currIndex + 1}`).appendTo($("div[class='tier sort']").eq(sTier));

	chrome.runtime.sendMessage({id: currIndex + 1, imageUrl: imageUrl}, function(response) {});

	
});