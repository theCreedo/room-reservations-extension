

window.onload = function() {

	// This runs when id=submitRoomapp gets hit
	document.getElementById('submitRoomapp').addEventListener('click', function() {
		// Get all form data together
		var data = getDeanFormData();
	});
}

function getDeanFormData() {
	// This runs when id=submitRoomapp gets hit
	window.setTimeout(function() {
		var jq = document.createElement('script');
		jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
		document.getElementsByTagName('head')[0].appendChild(jq);
		// ... give time for script to load, then type (or see below for non wait option)
		jQuery.noConflict();
	},1000);

	var rep = document.getElementById('rep').value;
	var rep_phone_number = document.getElementById('rep_phone').value;
	var rep_email = document.getElementById('rep_email').value;

	var building_choice1 = document.getElementsByName('building_choice1');
	var building_choice2 = document.getElementsByName('building_choice2');
	var building_choice3 = document.getElementsByName('building_choice3');

	var room_choice1 = document.getElementsByName('room_choice1');
	var room_choice2 = document.getElementsByName('room_choice2');
	var room_choice3 = document.getElementsByName('room_choice3');

	var listOfBuildings =
	building_choice1[0].value + ' ' + room_choice1[0].value + ', ' +
	building_choice2[0].value + ' ' + room_choice2[0].value + ', ' +
	building_choice3[0].value + ' ' + room_choice3[0].value;

	var listOfOrgs = document.getElementsByClassName('orgsdropdown');
	var orgDropdownName =  Array.prototype.slice.call(listOfOrgs).find(function(element) {
		return element.attributes.style.value.includes('visible');
	}).name;
	var orgName = $('#' + orgDropdownName + ' option:selected').text();
	var proposed_use = document.getElementById('proposed_use').value;

	var room_capacity =document.getElementById('number_expected').value;

	var isRepeating = $('#restype1').is(':checked');
	var isHostSpeaker = $('#bOffCampusSpeaker1').is(':checked');
	var isCosponsored = $('#activity_sponsored_solely2').is(':checked');
	var isCollectingMoney= $('#collect_money1').is(':checked');
	var isDistributingFood = $('#sale_of_food1').is(':checked');

	var reservationDatesData = getReservationDates(isRepeating);
	var hostSpeakerData = getHostSpeakerData(isHostSpeaker);
	var cosponsoredData = getCosponsoreData(isCosponsored);
	var collectingMoneyData = getCollectingMoneyData(isCollectingMoney);
	var distributingFoodData = getDistributingFoodData(isDistributingFood);

	var additional_comments = document.getElementById('stu_comments').value;


	var data = {
		'orgname': orgName,
		'rep': rep,
		'rep_phone_number': rep_phone_number,
		'rep_email': rep_email,
		'buildings': listOfBuildings,
		'proposed_user': proposed_use,
		"room_capacity": room_capacity,
		'reservationDatesData': reservationDatesData,
		'hostSpeakerData': hostSpeakerData,
		'cosponsoredData': cosponsoredData,
		'collectingMoneyData': collectingMoneyData,
		'distributingFoodData': distributingFoodData,
		"additional_comments": additional_comments
	};

	return data;
}



function getReservationDates(isRepeating) {
	if (isRepeating) {
		var DayNamesEnums = {
			SUNDAY: 1,
			MONDAY: 2,
			TUESDAY: 3,
			WEDNESDAY: 4,
			THURSDAY: 5,
			FRIDAY: 6,
			SATURDAY: 7,
		};

		var isSun = $('#proposed_day1').is(':checked');
		var isMon = $('#proposed_day2').is(':checked');
		var isTues = $('#proposed_day3').is(':checked');
		var isWed = $('#proposed_day4').is(':checked');
		var isThur = $('#proposed_day5').is(':checked');
		var isFri = $('#proposed_day6').is(':checked');
		var isSat = $('#proposed_day7').is(':checked');

		var dateFrom = document.getElementById('dateFrom').value;
		var dateTo = document.getElementById('dateTo').value;

		var data = {
			'dateFrom':dateFrom,
			'dateFrom':dateTo
		}
	} else {
		var listOfDates = [
			 document.getElementById('firstDate').value,
			 document.getElementById('secondDate').value,
			 document.getElementById('thirdDate').value,
			 document.getElementById('fourthDate').value,
			 document.getElementById('fifthDate').value,
			 document.getElementById('sixthDate').value,
			 document.getElementById('seventhDate').value,
			 document.getElementById('eigthDate').value,
			 document.getElementById('ninthDate').value
		];

		var data = {
			'dates':listOfDates
		}
	}

	return data
}

	function getHostSpeakerData(isRepeating) {
	if (isRepeating) {
		// implementation of data collection
		return null;
	}

	return null;
}

function getCosponsoreData(isHostSpeaker) {
	if (isHostSpeaker) {
		// implementation of data collection
		return null;
	}

	return null;
}

function getCosponsoreData(isCosponsored) {
	if (isCosponsored) {
		// implementation of data collection
		return null;
	}
	
	return null;
}

function getCollectingMoneyData(isCollectingMoney) {
	if (isCollectingMoney) {
		// implementation of data collection
		return null;
	}
	
	return null;
}

function getDistributingFoodData(isDistributingFood) {
	if (isDistributingFood) {
		// implementation of data collection
		return null;
	}
	
	return null;
}