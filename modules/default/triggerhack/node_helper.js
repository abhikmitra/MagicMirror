var NodeHelper = require("node_helper");
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var detectedPeople = [
	"SHABAZ",
	"NIKHIL",
	"UNKNOWN",
]
var say = require('say');
detectedPeople[-1] = "UNKNOWN";
var queue = [];
module.exports = NodeHelper.create({
	socketNotificationReceived: function(notification, payload) {
		if (notification === "LISTEN_SOCKET") {
			this.listenOnSocketForMessageFromPi(payload.ip, payload.port)
			var self = this;
			return;
			setTimeout(function() {
				self.onReceiveDataFromPi({
					TYPE: "MIRROR_START"
				})
			}, 10000);

			setTimeout(function() {
				self.onReceiveDataFromPi({
					TYPE: "READ_OUT",
					PAYLOAD: "Which floor do you wish to go ?"
				})
			}, 11000);
			setTimeout(function() {
				self.onReceiveDataFromPi({
					TYPE: "MIRROR_LISTEN"
				})
			}, 13000);

			setTimeout(function() {
				self.onReceiveDataFromPi({
					TYPE: "FLOOR",
					PAYLOAD: " 5 , INOX"
				})
			}, 17000);

			setTimeout(function() {
				self.onReceiveDataFromPi({
					TYPE: "DEMO_2",
				})
			}, 30000);
		}	
	},

	listenOnSocketForMessageFromPi: function(ip, port) {
		var self = this;
		server.on('listening', function () {
    		var address = server.address();
    		console.log('UDP Server listening on ' + address.address + ":" + address.port);
		});
		server.on('message', function (message, remote) {
    		console.log(remote.address + ':' + remote.port +' - ' + message);
    		self.onReceiveDataFromPi(JSON.parse(message));
		});

		server.bind(port, ip);
	},

	onReceiveDataFromPi: function onReceiveDataFromPi(message) {

		if (message.TYPE == "MIRROR_START") {
			// switch on the mirror
			console.log("STRATING THE MIRROR")
			this.sendSocketNotification("START_MIRROR", {
					
			});
		}

		if (message.TYPE == "MIRROR_LISTEN") {
			// switch on the mirror
			console.log("Changing THE MIRROR  listening gif")
			this.sendSocketNotification("MIRROR_LISTEN", {
					
			});
		}

		if (message.TYPE == "FLOOR") {
			// switch on the mirror
			console.log("Changing THE FLOOR")
			this.sendSocketNotification("FLOOR", {
					payload : message.PAYLOAD
			});
		}

		if (message.TYPE == "DEMO_2") {
			// switch on the mirror
			console.log("Starting DEMO 2")
			this.sendSocketNotification("DEMO_2", {
					
			});
		}

		if (message.TYPE == "RESET") {
			// switch on the mirror
			console.log("RESET")
			this.sendSocketNotification("RESET", {
					
			});
		}

		if (message.TYPE == "READ_OUT") {
			console.log("READ_OUT", message.PAYLOAD);
			// switch on the mirror
			// console.log("READ_OUT", message.PAYLOAD);
			// say.speak(message.PAYLOAD, 'Good News', 1.0, function(err) {
			// 	if (err) {
			// 		return console.error(err);
			// 	}
            //
			// 	console.log('Text has been spoken.');
			// });
			this.sendSocketNotification("READ_OUT",  message.PAYLOAD);
			var exec = require('child_process').exec;
			var cmd = 'flite -voice -slt -t' + '"' + message.PAYLOAD.replace("!", "") + '"';
			console.log('Executing cmd',cmd);
			exec(cmd, function(error, stdout, stderr) {
				console.log('std',stdout);
				console.log('err',error);
				// command output is in stdout
			});


		}

		return;
		var detected = "NONE"
		console.log("message.identities", message.identities)
		if (!message.identities.length) {
			detected = "NONE"
		} else {
			detected = detectedPeople[message.identities[0]];
		}
		this.debounceDetection(detected)

	},

	debounceDetection : function debounceDetection(detected) {
		if(queue.length < 5) {
			queue.push(detected)
		} else {
			queue.shift()
			queue.push(detected)
		}

		var name;
		name = queue[0];
		for(var i = 0; i<queue.length;i++) {
			if (name != queue[i]) {
				return;
			}
		}
		console.log("person found", name);
		this.onPersonFound(name);

	},

	onPersonFound: function onPersonFound(name) {
		if (name == "NONE") {
				console.log("STOPPING MIRROR", name);
				this.sendSocketNotification("STOP_MIRROR", {
					name: "NONE"
				});
			
		} else {
			console.log("STARTING MIRROR", name);
			this.sendSocketNotification("START_MIRROR", {
					name: name
				});
		}
	}


});