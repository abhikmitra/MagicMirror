var NodeHelper = require("node_helper");
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var detectedPeople = [
	"SHABAZ",
	"NIKHIL",
	"UNKNOWN",
];

var ws = require("nodejs-websocket");

detectedPeople[-1] = "UNKNOWN";
var queue = [];
module.exports = NodeHelper.create({
	socketNotificationReceived: function(notification, payload) {
		if (notification === "LISTEN_SOCKET") {
			this.listenForSocketFromElevator(payload.port)
			var self = this;
			// return;
			// setTimeout(function() {
			// 	self.onReceiveDataFromPi({
			// 		TYPE: "MIRROR_START"
			// 	})
			// }, 10000);
			// setTimeout(function() {
			// 	self.onReceiveDataFromPi({
			// 		TYPE: "MIRROR_LISTEN"
			// 	})
			// }, 12000);
            //
			// setTimeout(function() {
			// 	self.onReceiveDataFromPi({
			// 		TYPE: "FLOOR",
			// 		PAYLOAD: " 5 , INOX"
			// 	})
			// }, 16000);
            //
			// setTimeout(function() {
			// 	self.onReceiveDataFromPi({
			// 		TYPE: "DEMO_2",
			// 	})
			// }, 30000);



			// setTimeout(function() {
			// 	self.onReceiveDataFromKoneAPI({
			// 		TYPE: "KONE_API",
			// 		"motorTemp": 155.3793,
			// 		"currentFloor": 0,
			// 		"doorOpen": false,
			// 		"state": "stopped",
			// 		"numberOfFloors": 6,
			// 		"cabinTemp": 82,
			// 		"cabinSpeed": 4,
			// 		"direction": 1,
			// 		"load": 0,
			// 		"curtainOfLightBreak": 0,
			// 		"cleanessOfFloor": 1
			// 	});
			// }, 5000);


		}	
	},
	onReceiveDataFromKoneAPI: function (data) {
		var json = JSON.parse(data);
		console.log("sending KONE API message", json.TYPE);
		this.sendSocketNotification(json.TYPE, json);
	},
	listenForSocketFromElevator: function(port) {
		var self = this;
		this.server = ws.createServer(function (conn) {
			console.log("New connection")
			conn.on("text", function (str) {
				console.log("Received "+ str)


				self.onReceiveDataFromKoneAPI(str);



			})
			conn.on("close", function (code, reason) {
				console.log("Connection closed")
			})
		}).listen(port)
	},
	listenOnSocketForMessageFromPi: function(ip, port) {
		var self = this;
		server.on('listening', function () {
    		var address = server.address();
    		console.log('UDP Server listening on ' + address.address + ":" + address.port);
		});
		server.on('message', function (message, remote) {
    		console.log(remote.address + ':' + remote.port +' - ' + message);
    		self.onReceiveDataFromPi(JSON.parse(message))
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