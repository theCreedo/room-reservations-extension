window.onload = function() {

document.getElementById('oauth').addEventListener('click', function() {
  chrome.identity.getAuthToken({'interactive': true}, function(token) {
  	console.log('Successfuly logged in: ' + token);
  });
});

document.getElementById('create-spreadsheet').addEventListener('click', function() {
  chrome.identity.getAuthToken({'interactive': true}, function(token) {
  	(async () =>  {
  		let init = {
          method: 'POST',
          body: JSON.stringify({}),
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json'
        };
		const rawResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets',
		init);
		const content = await rawResponse.json();

		console.log(content);
     })();
  });
});

};