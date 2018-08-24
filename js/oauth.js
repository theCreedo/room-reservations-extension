window.onload = function() {

	document.getElementById('oauth').addEventListener('click', function() {
	  chrome.identity.getAuthToken({'interactive': true}, function(token) {
	  	console.log('Successfuly logged in: ' + token);
	  });
	});

	document.getElementById('create_spreadsheet').addEventListener('click', function() {
	  chrome.identity.getAuthToken({'interactive': true}, function(token) {
	  	(async () =>  {
	  		let init = {
	          method: 'POST',
	          body: JSON.stringify({
	          	"properties": {
    				"title": "Organization's Room Reservations"
  				}
	          }),
	          headers: {
	            Authorization: 'Bearer ' + token,
	            'Content-Type': 'application/json'
	          },
	          'contentType': 'json'
	        };
			const raw_response = await fetch('https://sheets.googleapis.com/v4/spreadsheets',
			init);
			const content = await raw_response.json();
			chrome.storage.sync.set({ "spreadsheet_id": content.spreadsheetId }, function(){
			    //  A data saved callback omg so fancy
			    console.log("spreadsheet_id " + content.spreadsheetId + " has been saved")
			});
			chrome.storage.sync.get("spreadsheet_id", function(items){
				(async () =>  {
						var spreadsheet_id = items.spreadsheet_id
						var range = '!A:A';
						let init = {
					      method: 'POST',
			          	  body: JSON.stringify({
							"range": range,
							"majorDimension": "ROWS",
							"values": [
								['Rep Name', 'Name of Event', 'Date of Event', 'Time of Event', 'Proposed activity', 'Locations', 'Additional Comments']
							]
						  }),
					      headers: {
					        Authorization: 'Bearer ' + token
					      },
					      'contentType': 'json'
					    };
						const raw_response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheet_id + '/values/' + range + ':append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS',
						init);
						const content = await raw_response.json();

						console.log(content);

				})();
			});
	     })();
	  });
	});

	document.getElementById("get_room_data").addEventListener('click', () => {
	    console.log("Popup DOM fully loaded and parsed");
		function getDeanFormData() {
			function getReservationDates(is_repeating) {
				if (is_repeating) {
					var day_names_enms = {
						SUNDAY: 1,
						MONDAY: 2,
						TUESDAY: 3,
						WEDNESDAY: 4,
						THURSDAY: 5,
						FRIDAY: 6,
						SATURDAY: 7,
					};

					var is_sun = $('#proposed_day1').is(':checked');
					var is_mon = $('#proposed_day2').is(':checked');
					var is_tues = $('#proposed_day3').is(':checked');
					var is_wed = $('#proposed_day4').is(':checked');
					var is_thurs = $('#proposed_day5').is(':checked');
					var is_fri = $('#proposed_day6').is(':checked');
					var is_sat = $('#proposed_day7').is(':checked');

					var list_of_days = {
						is_sun,
						is_mon,
						is_tues,
						is_wed,
						is_thurs,
						is_fri,
						is_sat
					}

					var date_from = document.getElementById('dateFrom').value;
					var date_to = document.getElementById('dateTo').value;

					var data = {
						'list_of_days': list_of_days, 
						'date_from':date_from,
						'date_to':date_to,
						'is_repeating': is_repeating
					}
				} else {
					var list_of_dates = [
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

					var date_from = document.getElementById('dateFrom').value;
					var date_to = document.getElementById('dateTo').value;


					var data = {
						'dates': list_of_dates,
						'date_from': date_from,
						'date_to': date_to,
						'is_repeating': is_repeating
					}
				}

				return data
			}

			function getHostSpeakerData(is_host_speaker) {
				if (is_host_speaker) {
					// implementation of data collection
					var speak_affiliation = document.getElementById('speakercomp').value;
					var speaker_name = document.getElementById('SpeakerName').value;
					var is_speaker_questions = $('#bSpeakerQuestions1').is(':checked');
					var speaker_topic = document.getElementById('SpeakerTopic').value;

					var speaker_data = {
						'speak_affiliation': speak_affiliation,
						'speaker_name': speaker_name,
						'is_speaker_questions': is_speaker_questions,
						'speaker_topic': speaker_topic,
						'is_host_speaker': is_host_speaker
					}

					return speaker_data;
				} else {
					return {
						'is_host_speaker': is_host_speaker
					};
				}
			}

			function getCosponsorData(is_cosponsored) {
				if (is_cosponsored) {
					// implementation of data collection
					var cosponsors = document.getElementById('co_sponsors').value;

					var cosponsor_data = {
						'cosponsors': cosponsors,
						'is_cosponsored': is_cosponsored
					}
					return cosponsor_data;
				} else {
					return {
						'is_cosponsored': is_cosponsored
					};
				}
			}

			function getCollectingMoneyData(is_collecting_money) {
				if (is_collecting_money) {
					// implementation of data collection
					var solicitation_desc = document.getElementById('solicitation_type').value;

					var collecting_money_data = {
						'solicitation_desc': solicitation_desc,
						'is_collecting_money': is_collecting_money
					}
					return collecting_money_data;
				} else {
					return {
						'is_collecting_money': is_collecting_money
					};
				}
			}

			function getDistributingFoodData(is_distributing_food) {
				if (is_distributing_food) {
					// implementation of data collection
					var distribution_descp = document.getElementById('describe_food').value;

					var distributing_food_data = {
						'distribution_descp': distribution_descp,
						'is_distributing_food': is_distributing_food
					}
					return distributing_food_data;
				} else {
					return {
						'is_distributing_food': is_distributing_food
					};
				}
			}

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

			var list_of_buildings =
			building_choice1[0].value + ' ' + room_choice1[0].value + ', ' +
			building_choice2[0].value + ' ' + room_choice2[0].value + ', ' +
			building_choice3[0].value + ' ' + room_choice3[0].value;

			var list_of_orgs = document.getElementsByClassName('orgsdropdown');

			// need to add null condition for list_of_orgs
			var org_dropdown_name =  Array.prototype.slice.call(list_of_orgs).find(function(element) {
				return element.attributes.style.value.includes('visible');
			}).name;
			var org_name = $('#' + org_dropdown_name + ' option:selected').text();
			var proposed_use = document.getElementById('proposed_use').value;

			var room_capacity =document.getElementById('number_expected').value;
			var start_hour = parseInt($('#startHour option:selected').text());
			var start_minute = $('#startMinute option:selected').text();
			var start_suffix = $('#startSuffix option:selected').text();
			var start_time = ''
			if (start_suffix == 'noon') {
				start_time = '12:00PM';
			} else {
				start_time = start_hour + ':' + start_minute + start_suffix.toUpperCase().split(".").join("");
			}

			var end_hour = parseInt($('#endHour option:selected').text());
			var end_minute = $('#endMinute option:selected').text()
			var end_suffix = $('#endSuffix option:selected').text();
			var end_time = ''
			if (end_suffix == 'noon') {
				end_time = '12:00PM';
			} else {
				end_time =  end_hour + ':' + end_minute + end_suffix.toUpperCase().split(".").join("");
			}

			var is_repeating = $('#restype1').is(':checked');
			var is_host_speaker = $('#bOffCampusSpeaker1').is(':checked');
			var is_cosponsored = $('#activity_sponsored_solely2').is(':checked');
			var is_collecting_money = $('#collect_money1').is(':checked');
			var is_distributing_food = $('#sale_of_food1').is(':checked');

			var reservation_dates_data = getReservationDates(is_repeating);
			var host_speaker_data = getHostSpeakerData(is_host_speaker);
			var cosponsor_data = getCosponsorData(is_cosponsored);
			var collecting_money_data = getCollectingMoneyData(is_collecting_money);
			var distributing_food_data = getDistributingFoodData(is_distributing_food);

			var additional_comments = document.getElementById('stu_comments').value;


			var data = {
				'org_name': org_name,
				'rep_data' : {
					'rep_name': rep,
					'rep_phone_number': rep_phone_number,
					'rep_email': rep_email,
				},
				'locations': list_of_buildings,
				'proposed_use': proposed_use,
				'room_capacity': room_capacity,
				'times' : {
					'start_time': start_time,
					'end_time': end_time,
				},
				'event_name': 'Generic Event',
				'reservation_dates_data': reservation_dates_data,
				'host_speaker_data': host_speaker_data,
				'cosponsor_data': cosponsor_data,
				'collecting_money_data': collecting_money_data,
				'distributing_food_data': distributing_food_data,
				'additional_comments': additional_comments
			};

			return data;
		}


		chrome.identity.getAuthToken({'interactive': true}, function(token) {
		    // We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
		    chrome.tabs.executeScript({
		        code: '(' + getDeanFormData + ')();' //argument here is a string but function.toString() returns function's code
		    }, (results) => {
		    	var data = results[0]
				chrome.storage.sync.set({ "dean_students_info": data }, function(){
				    //  A data saved callback omg so fancy
				    console.log("Dean of Students info saved:\n");
				    console.log(data);
				});
		    });
		});
	});

	document.getElementById('display_info').addEventListener('click', function() {
		window.open("/info.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
	});

	document.getElementById('append_row').addEventListener('click', function() {
	  chrome.identity.getAuthToken({'interactive': true}, function(token) {
		chrome.storage.sync.get("dean_students_info", function(items){
			chrome.storage.sync.get("spreadsheet_id", function(spread_sheet_content){
				console.log(items.dean_students_info);
				var dean_students_info = items.dean_students_info;
				var spreadsheet_id = spread_sheet_content.spreadsheet_id;
				var dates = '';
				if (dean_students_info.is_repeating) {
					dates = dean_students_info.reservation_dates_data.date_from + ' - ' + dean_students_info.reservation_dates_data.date_to;
				} else {
					var i = 0;
					for (i = 0; i < dean_students_info.list_of_dates.size; i++) {
						dates += dean_students_info.list_of_dates[i];
					}
				}
				var range = '!A:A';
				(async () =>  {
					let init = {
				      method: 'POST',
		          	  body: JSON.stringify({
						"range": range,
						"majorDimension": "ROWS",
						"values": [
							[dean_students_info.rep_data.rep_name,
							"INSERT EVENT NAME",
							dates,
							dean_students_info.times.start_time + "-" + dean_students_info.times.end_time,
							dean_students_info.proposed_use,
							dean_students_info.locations,
							dean_students_info.additional_comments]
						]
					  }),
				      headers: {
				        Authorization: 'Bearer ' + token
				      },
				      'contentType': 'json'
				    };
					const raw_response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheet_id + '/values/' + range + ':append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS',
					init);
					const content = await raw_response.json();

					console.log(content);
				})();
			});
		});
	  });
	});

};