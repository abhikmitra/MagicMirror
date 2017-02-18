var NodeHelper = require("node_helper");
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var detectedPeople = [
	"SHABAZ",
	"NIKHIL",
	"UNKNOWN",
]
detectedPeople[-1] = "UNKNOWN";
var queue = [];
module.exports = NodeHelper.create({
	socketNotificationReceived: function(notification, payload) {
		if (notification === "LISTEN_SOCKET") {
			this.listenOnSocketForMessageFromPi(payload.ip, payload.port)
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
    		self.onReceiveDataFromPi(JSON.parse(message))
		});

		server.bind(port, ip);
	},

	onReceiveDataFromPi: function onReceiveDataFromPi(message) {
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