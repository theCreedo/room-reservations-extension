chrome.storage.sync.get("dean_students_info", function(items){
	var dean_students_info= items.dean_students_info;
	document.getElementById("event_name").value = dean_students_info.event_name;
	document.getElementById("rep_name").value = dean_students_info.rep_data.rep_name;
	document.getElementById("rep_phone_number").value = dean_students_info.rep_data.rep_phone_number;
	document.getElementById("rep_email").value = dean_students_info.rep_data.rep_email;
	document.getElementById("org_name").value = dean_students_info.org_name;
	document.getElementById("locations").value = dean_students_info.locations;
	document.getElementById("start_time").value = dean_students_info.times.start_time;
	document.getElementById("end_time").value = dean_students_info.times.end_time;
	console.log(dean_students_info);
});

window.onload = function() {
	document.getElementById('update-data').addEventListener('click', function() {
		chrome.storage.sync.get("dean_students_info", function(items){
			var dean_students_info= items.dean_students_info;

			dean_students_info.event_name = document.getElementById("event_name").value;
			dean_students_info.rep_data.rep_name = document.getElementById("rep_name").value;
			dean_students_info.rep_data.rep_phone_number = document.getElementById("rep_phone_number").value;
			dean_students_info.rep_data.rep_email = document.getElementById("rep_email").value;
			dean_students_info.org_name = document.getElementById("org_name").value;
			dean_students_info.locations = document.getElementById("locations").value;
			dean_students_info.times.start_time = document.getElementById("start_time").value;
			dean_students_info.times.endTime = document.getElementById("endTime").value;
			chrome.storage.sync.set({ "dean_students_info": dean_students_info }, function(){
			    console.log("Updated dean_students_info:");
			    console.log(dean_students_info);
			});
		});
	});
};