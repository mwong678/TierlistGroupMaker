const imageSize = "150px";

//function 

$(document).ready(function() {
	let imageUrl = chrome.extension.getBackgroundPage().currImageUrl;
	$("#current").attr("src", imageUrl); 
	$("#current").css("height", imageSize); 
	$("#current").css("width", imageSize); 


	$("#scoreForm").submit(function(event) {
	  alert("Handler for .submit() called.");
	  event.preventDefault();
	  //calculate the average of the ratings
	  //determine which row it needs to be placed in
	  //iterate through and place where appropiate; can go
	  //from top to bottom
	  //increment id and change the picture 
	});
});