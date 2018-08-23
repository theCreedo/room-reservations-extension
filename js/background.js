// Need to update if there's no internet even though we also want to do this with internet
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// window.onload = function() {
// 	console.log('Water melon');
// }

// chrome.webNavigation.onCompleted.addListener(function() {
//       alert("This is my favorite website!");
//   }, {url: [{urlMatches : '*://deanofstudents.utexas.edu/secure/sa/roomapp.php*'}]});

// console.log('Water melon');
// function codeAddress() {
// 	console.log('Executing script');
//     chrome.tabs.executeScript({
// 		code: '(' + submitButton + ')();' //argument here is a string but function.toString() returns function's code
// 	}, (results) => {
//     	console.log('Successful');
//     });

// 	function submitButton(){
// 		document.getElementById('restype1').addEventListener('click', function() {
// 			console.log('Clicked on the submit room app button');
// 		});
// 	};
// }

// window.onload = codeAddress;