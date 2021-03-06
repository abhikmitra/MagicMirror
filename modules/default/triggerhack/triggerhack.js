Module.register("triggerhack",{
	defaults: {
		customText: "Smart Elevator!"
	},
	getDom: function() {
		var wrapper = document.createElement("div");
		if(this.isStopped) {
			wrapper.innerHTML = "";	
		} else {
			wrapper.innerHTML =  "Smart Elevator";
		}
		wrapper.className= "bright xlarge wrapper"					
		return wrapper;
	},
	start: function() {
		Log.log("Starting module: " + this.name);
		this.sendSocketNotification("LISTEN_SOCKET", {
			ip: "192.175.5.182",
			port:"5006"
		});

		var self = this;
		setTimeout(function(){
				self.sendNotification("STOP_MIRROR", {
					name: "NONE"
				});
				self.stopModule();
		}, 1000);
		// setTimeout(function(){
		// 		self.sendNotification("START_MIRROR", {
		// 			name: "NONE"
		// 		});
		// 		self.startModule();
		// }, 20000);
	},
	getStyles: function () {
		return ["style.css", "font-awesome.css"];
	},
	stopModule: function() {
		this.hide(2000);
		this.updateDom();
	},
	startModule: function() {
		this.show(2000);
		this.updateDom();

	},
	socketNotificationReceived:  function(notification, payload) {


		if (notification === "STOP_MIRROR") {
			console.log("stopping mirror");
			this.sendNotification("STOP_MIRROR", {
					name: "NONE"
			});
			this.stopModule();
		}

		if (notification === "START_MIRROR") {
			console.log("starting mirror");
			this.sendNotification("START_MIRROR", {
					name: "NONE"
			});
			this.startModule();
		}	

		if (notification === "MIRROR_LISTEN") {
			this.sendNotification("MIRROR_LISTEN", {
					
			});
		}

		if (notification === "FLOOR") {
			this.sendNotification("FLOOR", {
					payload: payload.payload
			});
		}

		if (notification === "DEMO_2") {
			this.sendNotification("DEMO_2", {
					
			});
		}

		if (notification === "RESET") {
			this.sendNotification("STOP_MIRROR", {
					name: "NONE"
			});
			this.stopModule();
		}

		if (notification === "KONE_API") {
			this.sendNotification("KONE_API", payload);

			if (payload.doorOpen) {
				console.log("starting which floor you want to go scenario ?");
				this.startModule();
			} else if (!payload.doorOpen && payload.state == "moving") {
				console.log("starting moving scenario");
				this.startModule();
			} else {
				console.log("stopping forecast");
				this.stopModule();
			}
		}

		if (notification === "FLOOR_SELECTED") {
			this.sendNotification("FLOOR_SELECTED", payload);
		}
	},
	notificationReceived: function(notification, payload) {
		if (notification === "STOP_MIRROR") {
			console.log("stopping mirror");
			this.stopModule();
		}

		if (notification === "START_MIRROR") {
			this.config.customText = payload.name
			console.log("starting mirror");
			this.startModule();
		}	
	},


});