chrome.storage.sync.get("deanStudentsInfo", function(items){
	var deanStudentsInfo= items.deanStudentsInfo;
	document.getElementById("rep_name").value = deanStudentsInfo.repData.rep_name;
	document.getElementById("rep_phone_number").value = deanStudentsInfo.repData.rep_phone_number;
	document.getElementById("rep_email").value = deanStudentsInfo.repData.rep_email;
	document.getElementById("orgname").value = deanStudentsInfo.orgname;
	document.getElementById("locations").value = deanStudentsInfo.locations;
	document.getElementById("startTime").value = deanStudentsInfo.times.startTime;
	document.getElementById("endTime").value = deanStudentsInfo.times.endTime;
	console.log(deanStudentsInfo);
});

window.onload = function() {
	document.getElementById('update-data').addEventListener('click', function() {
		chrome.storage.sync.get("deanStudentsInfo", function(items){
			var deanStudentsInfo= items.deanStudentsInfo;

			deanStudentsInfo.repData.rep_name = document.getElementById("rep_name").value;
			deanStudentsInfo.repData.rep_phone_number = document.getElementById("rep_phone_number").value;
			deanStudentsInfo.repData.rep_email = document.getElementById("rep_email").value;
			deanStudentsInfo.orgname = document.getElementById("orgname").value;
			deanStudentsInfo.listOfBuildings = document.getElementById("locations").value;
			deanStudentsInfo.times.startTime = document.getElementById("startTime").value;
			deanStudentsInfo.times.endTime = document.getElementById("endTime").value;
			chrome.storage.sync.set({ "deanStudentsInfo": deanStudentsInfo }, function(){
			    console.log("Updated deanStudentsInfo:");
			    console.log(deanStudentsInfo);
			});
		});
	});
};