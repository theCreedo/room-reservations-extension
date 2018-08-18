# room-reservations-extension

Creating a room reservations manager, since managing room reservations can be a bit of a hassle in the long term if not done well, and making a manager will automate managing room reservations.

MVP Goal #1:
Read the University room reservation website for room reservation data, create a google sheets (need to be authed) and send that formatted data into the sheets

Checklist:
- [] - Google OAuth 2.0
- [] - Read html data from Room Reservations Website
- [] - Create Excel Spreadsheet
- [] - Format and set data to saved Excel Spreadsheet

Supported Reservation Sites:
- [] - [Dean Of Students](https://deanofstudents.utexas.edu/secure/sa/roomapp.php)

- [] - [Event Space Reservations](https://ems.universityunions.utexas.edu/VirtualEms/) - Union, SAC, HMA, SSB, Outdoor

Design:
- OAuth flow to get Token
- createSpreedsheet function
- button to read data from html

# Getting Started

I followed this [How to Create a Chrome Extension in 10 Minutes Flat](https://www.sitepoint.com/create-chrome-extension-10-minutes-flat/) guide. It took less than 10 mins to create - then about 30 mins to actually test and make sure it worked... I guess the advertising wasn't incorrect.


# Helpful Links

- [Oauth 2.0](https://developer.chrome.com/extensions/tut_oauth)
NOTE: Since working on this, the documentation has an a mistake in the `oauth.js` part of the file. The file missed single quotation marks in a json file. That took 1+ hour of debugging to find.

Correct `oauth.js` file format:
```
  window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
      chrome.identity.getAuthToken({'interactive': true}, function(token) {
        console.log(token);
      });
    });
  };
```

- [Google Sheets Browser Quickstart](https://developers.google.com/sheets/api/quickstart/js)

- [Append Row to Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#appendcellsrequest)

- [chrome.storage](https://developer.chrome.com/extensions/storage) - Didn't use

- [Stack Overflow for Chome Extension writing to Google Spreadsheet](https://stackoverflow.com/questions/20450438/chrome-extension-writing-to-google-spreadsheet)

- [Google Spreadsheet Loader Github Library](https://github.com/vkadam/gsloader)

- [Get Source HTML of current page from chrome extension StackOverflow](
https://stackoverflow.com/questions/11684454/getting-the-source-html-of-the-current-page-from-chrome-extension)

- [Replace All in Javascript code](https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript)

- [Chrome Extension to use jquery to manipulate dom](https://carl-topham.com/theblog/post/creating-chrome-extension-uses-jquery-manipulate-dom-page/)

# Self-Made Notes
May need to learn React, but for now, I just want to get a base product running
How do I read form data into data

# Tech Debt

- [] - Turn off reservation buttons when not on reservation screen

- [] - Turn off creating spreadsheet

- [] - Move all Javascript Files to a folder

- [] - 

# Log

8/17/2018

- Made Dean of Students Reservation data way more cleaner

- Redesigned chrome extension so that it displays 'Authorize Google', 'Create Spreadsheet', 'Get Room Info'

- Used Google Sheets API to create spreadsheet

- added `content.js` in order to send html to the chrome extensions

- Added Jquery.js file

- Injected Jquery through background.js into the activeTab in order to use Jquery to get room data

- TODO: Find a way to save spreadsheet id and such and change the button for 'Create Spreadsheet' unclickable

- TODO: Create row data to send to google spreadsheet

8/16/2018

- Created Design Specifications for MVP and created a checklist.

- Went through Google's OAuth 2.0 tutorial and solved 1+hour json formatting bug.

- Added 'storage' permissions in order to save token for OAuth 2.0

- Worked a bit on feature designs

- Added Dean of Students Reservation form data getter

- TODO: Need to make decision on either using Google Sheets api or other outside tutorial work

- TODO: Need to learn to make POST requests in Javascript


