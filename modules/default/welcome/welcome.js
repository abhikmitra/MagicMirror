Module.register("welcome",{
	defaults: {
		customText: "welcome"
	},
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.html;					
		return wrapper;
	},
	state: {
		doorOpen: "false",
		state: "stopped",
	},
	start: function() {
		Log.log("Starting module: " + this.name);
		this.sendSocketNotification("LISTEN_SOCKET", {
			ip: "192.175.5.182",
			port:"5005"
		});

		var self = this;
		this.html = "<div class='wrapper bright xlarge wrapper'> Welcome <br> Which floor do you wish to go ? </div>";
	},
	getStyles: function () {
		return ["style.css", "font-awesome.css"];
	},
	stopModule: function() {
		this.hide(1000);
		this.updateDom();
	},
	startModule: function() {
		this.show(1000);
		this.updateDom();

	},
	hasStateChanged: function (payload) {
		if (payload.doorOpen != this.state.doorOpen) {
			return true;
		}

		if (payload.state != this.state.state) {
			return true;
		}

		return false


	},
	notificationReceived: function(notification, payload) {


		if (notification == "KONE_API") {
			if (!this.hasStateChanged(payload)) {
				return;
			}
			if (payload.state === "idle") {
				this.stopModule();
			}
			else if (payload.doorOpen) {
				console.log("starting which floor you want to go scenario ?");
				this.startModule();
			} else {
				this.stopModule();
			}
		}

		if (notification === "STOP_MIRROR") {
			console.log("stopping mirror");
			this.stopModule();

			this.html = "<div class='wrapper bright xlarge wrapper'> Welcome <br> Which floor do you wish to go ? </div>";
		}

		if (notification === "START_MIRROR") {
			this.text = payload.name
			console.log("starting mirror");
			this.startModule();
		}


		if (notification === "MIRROR_LISTEN") {
			
			this.html = "<div class='wrapper'><img src='"+ "https://karnacologynew.files.wordpress.com/2016/07/soundwave.gif" +"'></div>"
			this.updateDom(600);
		}

		if (notification === "FLOOR") {
			
			this.html = "<div class='wrapper bright large wrapper'>Taking you to floor " + payload.payload + "</div>"
			this.updateDom(600);

			var self = this;
			setTimeout(function() {
				self.sendNotification("START_SHOW", {
					
				});
				self.stopModule();
			}, 2000);
		}


		if (notification === "DEMO_2") {
				this.startModule();
				this.html = "<div class='wrapper'>" + 
				" <span class='bright large wrapper'>Hi Nikhil , taking you to floor 13</span>"+
				" <br/> <span class='medium wrapper'> All the best for your Interview! </span></div>";
				this.updateDom(600);
				var self = this;
				setTimeout(function(){
					self.html = "<div class='wrapper'><img src='"+ "https://s4.postimg.org/rls5esbwt/Interview.jpg" +"'></div>"
					self.updateDom(600);
				}, 2500)
				
		}		
	}
});