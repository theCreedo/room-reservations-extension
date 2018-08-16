  window.onload = function() {
    document.getElementById('oauth').addEventListener('click', function() {
      chrome.identity.getAuthToken({'interactive': true}, function(token) {
        chrome.storage.sync.set({'oauth': token}, function() {
          console.log('Token is set to ' + token);
        });
      });
    });
    document.getElementById('print').addEventListener('click', function() {
	    chrome.storage.sync.get(['oauth'], function(result) {
	      console.log('Token currently is ' + result);
	    });
    });
    document.getElementById('create').addEventListener('click', function() {
	    // Create the spreedsheets
    });
  };