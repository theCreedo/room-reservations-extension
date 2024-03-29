window.onload = function() {

	
	// This runs when id=submitRoomapp gets hit
	document.getElementById('submitRoomapp').addEventListener('click', function() {
		
		chrome.identity.getAuthToken({'interactive': true}, function(token) {
			// Get all form data together
			var data = getDeanFormData();

			// Format data into excel format
			// let x = {
			//   "values": [
			//     {
			//       object(CellData)
			//     }
			//   ]
			// }
		});

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
	var startHour = parseInt($('#startHour option:selected').text());
	var startMinute = $('#startMinute option:selected').text();
	var startSuffix = $('#startSuffix option:selected').text();
	var startTime = ''
	if (startSuffix == 'noon') {
		startTime = '12:00PM';
	} else {
		startTime = startHour + ':' + startMinute + startSuffix.toUpperCase().replaceAll(".", "");
	}

	var endHour = parseInt($('#endHour option:selected').text());
	var endMinute = $('#endMinute option:selected').text()
	var endSuffix = $('#endSuffix option:selected').text();
	var endTime = ''
	if (endSuffix == 'noon') {
		endTime = '12:00PM';
	} else {
		endTime =  endHour + ':' + endMinute + endSuffix.toUpperCase().replaceAll(".", "");
	}


	var isRepeating = $('#restype1').is(':checked');
	var isHostSpeaker = $('#bOffCampusSpeaker1').is(':checked');
	var isCosponsored = $('#activity_sponsored_solely2').is(':checked');
	var isCollectingMoney= $('#collect_money1').is(':checked');
	var isDistributingFood = $('#sale_of_food1').is(':checked');

	var reservationDatesData = getReservationDates(isRepeating);
	var hostSpeakerData = getHostSpeakerData(isHostSpeaker);
	var cosponsorData = getCosponsorData(isCosponsored);
	var collectingMoneyData = getCollectingMoneyData(isCollectingMoney);
	var distributingFoodData = getDistributingFoodData(isDistributingFood);

	var additional_comments = document.getElementById('stu_comments').value;


	var data = {
		'orgname': orgName,
		'repData' : {
			'rep_name': rep,
			'rep_phone_number': rep_phone_number,
			'rep_email': rep_email,
		},
		'buildings': listOfBuildings,
		'proposed_user': proposed_use,
		'room_capacity': room_capacity,
		'times' : {
			'startTime': startTime,
			'endTime': endTime,
		},
		'reservationDatesData': reservationDatesData,
		'hostSpeakerData': hostSpeakerData,
		'cosponsorData': cosponsorData,
		'collectingMoneyData': collectingMoneyData,
		'distributingFoodData': distributingFoodData,
		'additional_comments': additional_comments
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

		var listOfDays = {
			isSun,
			isMon,
			isTues,
			isWed,
			isThur,
			isFri,
			isSat
		}

		var dateFrom = document.getElementById('dateFrom').value;
		var dateTo = document.getElementById('dateTo').value;

		var data = {
			'listOfDays': listOfDays, 
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

		var dateFrom = document.getElementById('dateFrom').value;
		var dateTo = document.getElementById('dateTo').value;


		var data = {
			'dates':listOfDates
		}
	}

	return data
}

function getHostSpeakerData(isHostSpeaker) {
	if (isHostSpeaker) {
		// implementation of data collection
		var speakerAffiliation = document.getElementById('speakercomp').value;
		var speakerName = document.getElementById('SpeakerName').value;
		var isSpeakerQuestions = $('#bSpeakerQuestions1').is(':checked');
		var speakerTopic = document.getElementById('SpeakerTopic').value;

		var speakerData = {
			'speakerAffiliation': speakerAffiliation,
			'speakerName': speakerName,
			'isSpeakerQuestions': isSpeakerQuestions,
			'speakerTopic': speakerTopic
		}

		return speakerData;
	}

	return null;
}

function getCosponsorData(isCosponsored) {
	if (isCosponsored) {
		// implementation of data collection
		var cosponsors = document.getElementById('co_sponsors').value;

		var cosponsorData = {
			'cosponsors': cosponsors
		}
		return cosponsorData;
	}

	return null;
}

function getCollectingMoneyData(isCollectingMoney) {
	if (isCollectingMoney) {
		// implementation of data collection
		var solicitation_desc = document.getElementById('solicitation_type').value;

		var collectingMoneyData = {
			'solicitation_desc': solicitation_desc
		}
		return collectingMoneyData;
	}
	
	return null;
}

function getDistributingFoodData(isDistributingFood) {
	if (isDistributingFood) {
		// implementation of data collection
		var distribution_descp = document.getElementById('describe_food').value;

		var distributionData = {
			'distribution_descp': distribution_descp
		}
		return distributionData;
	}
	
	return null;
}

String.prototype.replaceAll = function(search, replace)
{
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
};
