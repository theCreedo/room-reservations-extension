window.onload = function() {

	// This runs when id=submitRoomapp gets hit
	document.getElementById('get-sheets').addEventListener('click', function() {
	  chrome.identity.getAuthToken({'interactive': true}, function(token) {
		chrome.storage.sync.get("spreadsheetId", function(items){
			//  items = [ { "yourBody": "myBody" } ]
			(async () =>  {
			    var spreadsheetId = items.spreadsheetId;
				let init = {
			      method: 'GET',
			      headers: {
			        Authorization: 'Bearer ' + token
			      },
			      'contentType': 'json'
			    };
				const rawResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '?&fields=sheets.properties',
				init);
				const content = await rawResponse.json();
				chrome.storage.sync.set({ "sheetsIds": content.sheets }, function(){
					console.log("Saved sheetsIds");
					console.log(content.sheets);

					console.log("This is the sheetsId: " + content.sheets[0].properties.sheetId);
				});
			})();
		});
	  });
	});

	document.getElementById('append-row').addEventListener('click', function() {
	  chrome.identity.getAuthToken({'interactive': true}, function(token) {
		chrome.storage.sync.get("deanStudentsInfo", function(items){
			chrome.storage.sync.get("spreadsheetId", function(spreadsheetContent){
				chrome.storage.sync.get("sheetsIds", function(sheetContent){
					//  items = [ { "yourBody": "myBody" } ]
					console.log(items.deanStudentsInfo);
					var deanStudentsInfo = items.deanStudentsInfo;
					console.log(sheetContent.sheetsIds[0].properties.sheetId);
					var sheetId = sheetContent.sheetsIds[0].properties.sheetId
					var spreadsheetId = spreadsheetContent.spreadsheetId;
					var range = '!A:A'; // Fix this?
					(async () =>  {
						let init = {
					      method: 'POST',
					      // Build out the correct body
			          	  body: JSON.stringify({
							"range": range,
							"majorDimension": "ROWS",
							"values": [
								[deanStudentsInfo.repData.rep_name,
								"INSERT DATE",
								deanStudentsInfo.times.startTime + "-" + deanStudentsInfo.times.endTime,
								deanStudentsInfo.proposed_use,
								deanStudentsInfo.locations,
								deanStudentsInfo.additional_comments]
							]
						  }),
					      headers: {
					        Authorization: 'Bearer ' + token
					      },
					      'contentType': 'json'
					    };
					    // Build out the correct endpoint
						const rawResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + range + ':append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS',
						init);
						const content = await rawResponse.json();

						console.log(content);
					})();
				});
			});
		});
	  });
	});


	document.getElementById("submitRoomapp").addEventListener('click', () => {
	    console.log("Popup DOM fully loaded and parsed");
		function getDeanFormData() {
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
						'dateFrom':dateTo,
						'isRepeating': isRepeating
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
						'dates':listOfDates,
						'isRepeating': isRepeating
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
						'speakerTopic': speakerTopic,
						'isHostSpeaker': isHostSpeaker
					}

					return speakerData;
				} else {
					return {
						'isHostSpeaker': isHostSpeaker
					};
				}
			}

			function getCosponsorData(isCosponsored) {
				if (isCosponsored) {
					// implementation of data collection
					var cosponsors = document.getElementById('co_sponsors').value;

					var cosponsorData = {
						'cosponsors': cosponsors,
						'isCosponsored': isCosponsored
					}
					return cosponsorData;
				} else {
					return {
						'isCosponsored': isCosponsored
					};
				}
			}

			function getCollectingMoneyData(isCollectingMoney) {
				if (isCollectingMoney) {
					// implementation of data collection
					var solicitation_desc = document.getElementById('solicitation_type').value;

					var collectingMoneyData = {
						'solicitation_desc': solicitation_desc,
						'isCollectingMoney': isCollectingMoney
					}
					return collectingMoneyData;
				} else {
					return {
						'isCollectingMoney': isCollectingMoney
					};
				}
			}

			function getDistributingFoodData(isDistributingFood) {
				if (isDistributingFood) {
					// implementation of data collection
					var distribution_descp = document.getElementById('describe_food').value;

					var distributionData = {
						'distribution_descp': distribution_descp,
						'isDistributingFood': isDistributingFood
					}
					return distributionData;
				} else {
					return {
						'isDistributingFood': isDistributingFood
					};
				}
			}

			// This runs when id=submitRoomapp gets hit
			var script = document.createElement('script');
			script.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
			script.type = 'text/javascript';
			document.getElementsByTagName('head')[0].appendChild(script);

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

			// need to add null condition for listOfOrgs
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
				startTime = startHour + ':' + startMinute + startSuffix.toUpperCase().split(".").join("");
			}

			var endHour = parseInt($('#endHour option:selected').text());
			var endMinute = $('#endMinute option:selected').text()
			var endSuffix = $('#endSuffix option:selected').text();
			var endTime = ''
			if (endSuffix == 'noon') {
				endTime = '12:00PM';
			} else {
				endTime =  endHour + ':' + endMinute + endSuffix.toUpperCase().split(".").join("");
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
				'locations': listOfBuildings,
				'proposed_use': proposed_use,
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


		chrome.identity.getAuthToken({'interactive': true}, function(token) {
		    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
		    chrome.tabs.executeScript({
		        code: '(' + getDeanFormData + ')();' //argument here is a string but function.toString() returns function's code
		    }, (results) => {
		    	var data = results[0]
		        //Here we have just the innerHTML and not DOM structure
		        console.log('Popup script:')
		        console.log(data);
		        console.log(data.orgname);

				chrome.storage.sync.set({ "deanStudentsInfo": data }, function(){
				    //  A data saved callback omg so fancy
				    console.log("Dean of Students info saved:\n");
				    console.log(data);
				});

		        // Create spreadsheet row data and send to Google

		    });
		});
	});

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
			chrome.storage.sync.set({ "spreadsheetId": content.spreadsheetId }, function(){
			    //  A data saved callback omg so fancy
			    console.log("spreadsheetId " + content.spreadsheetId + " has been saved")
			});
	     })();
	  });
	});
};