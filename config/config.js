/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

	language: 'en',
	timeFormat: 24,
	units: 'metric',

	modules: [
		{
			module: 'triggerhack',
			position: "top_ bar"
		},
			
		{
			module: 'showtimings',
			position: "middle_center",
		},
		{
			module: 'welcome',
			position: "middle_center",
		},
		{
			module: 'dynchart',
			position: "top_left",
		},

		{
			module: 'dynchart2',
			position: "bottom_right",
		},

		{
			module: 'dynchart3',
			position: "bottom_left",
		},

		{
			module: 'dynchart4',
			position: "top_right",
		},
		{
			module: 'clock',
			position: 'top_left',
			timezone: 'Asia/Kolkata'
		},
		{
			module: 'currentweather',
			position: 'top_left',
			config: {
				location: 'Chennai',
				locationID: '',  //ID from http://www.openweathermap.org
				appid: '5ad59b5e1f16d86f53c1667a7cb9d0ed'
			}
		},
		{
			module: 'floor',
			position: 'top_right',
			config: {
				location: 'Chennai',
				locationID: '',  //ID from http://www.openweathermap.org
				appid: '5ad59b5e1f16d86f53c1667a7cb9d0ed'
			}
		},
		{
			module: 'newsfeed',
			position: 'bottom_bar',
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
