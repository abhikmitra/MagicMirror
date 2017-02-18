Module.register("triggerhack",{
	defaults: {
		customText: "Hello World!"
	},
	getDom: function() {
		var wrapper = document.createElement("div");
		if(this.isStopped) {
			wrapper.innerHTML = "";	
		} else {
			wrapper.innerHTML =  "Welcome " + this.config.customText ;			
		}					
		return wrapper;
	},
	start: function() {
		Log.log("Starting module: " + this.name);
		this.sendSocketNotification("LISTEN_SOCKET", {
			ip: "192.175.5.182",
			port:"5005"
		});
		this.isStopped = true;
	},
	stopModule: function() {
		if(this.isStopped) {
			return;
		}
		this.isStopped = true;
		this.updateDom()
	},
	startModule: function() {
		if(!this.isStopped) {
			return;
		}
		this.isStopped = false;
		this.updateDom()
	},
	socketNotificationReceived: function(notification, payload) {
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