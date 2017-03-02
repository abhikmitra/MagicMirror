Module.register("showtimings",{
	defaults: {
		customText: "Magic Mirror!"
	},
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "wrapperWidget"
		var contentWrapper = document.createElement("div");
		contentWrapper.className= "contentWrapper"
		var imageWrapper = document.createElement("div");
		imageWrapper.className="imageWrapper"
		var ratingWrapper = document.createElement("div");
		ratingWrapper.className = "ratingWrapper"
		var showtimeWrapper = document.createElement("div");
		showtimeWrapper.className = "showtimeWrapper";


		if (this.movies[this.index].type == "add") {
			imageWrapper.innerHTML = '<img src = "' + this.movies[this.index].image + '"  height="900px">'
			showtimeWrapper.innerHTML = '<span class="bright medium light"> '
			+ this.movies[this.index].offerText + ' </span>' ;
			ratingWrapper.innerHTML = '<span class="bright small light"> ' + this.movies[this.index].subOfferText + " </span>";
			contentWrapper.appendChild(imageWrapper)
			contentWrapper.appendChild(showtimeWrapper)
			contentWrapper.appendChild(ratingWrapper)

		} else {
			imageWrapper.innerHTML = '<img src = "' + this.movies[this.index].image + '"  height="900px" >'
			ratingWrapper.innerHTML = this.movies[this.index].stars
			showtimeWrapper.innerHTML = '<span class="bright medium light"> '+ this.movies[this.index].movieName + ' </span>' + 
			'<br>' +
			'<span style="font-size: 16px;margin-left: 5px" class="bright small light">' + this.movies[this.index].time[0] + '&nbsp;</span>' +
			'<span style="font-size: 16px;margin-left: 5px" class="bright small light">' + this.movies[this.index].time[1] +'&nbsp;</span>' +
			'<span style="font-size: 16px;margin-left: 5px" class="bright small light">' + this.movies[this.index].time[2] + '&nbsp;</span>';
			contentWrapper.appendChild(imageWrapper)
			contentWrapper.appendChild(ratingWrapper)
			contentWrapper.appendChild(showtimeWrapper)
		}


		
		if(this.isStopped) {
			wrapper.innerHTML = "";	
		} else {
			wrapper.appendChild(contentWrapper)
		}					
		return wrapper;
	},
	getStyles: function () {
		return ["showtimings.css", "font-awesome.css"];
	},

	stopModule: function() {
		this.hide(2000);
		this.updateDom()
	},
	startModule: function() {
		this.show(2000);
		this.updateDom()
		this.index = 0;
	},
	start: function() {
		var self = this;
		this.index = 0;
		this.movies = [
				{
					movieName : "Dark Knight",
					image:"http://cdn.collider.com/wp-content/uploads/the-dark-knight-rises-teaser-poster.jpg",
					stars : '<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>',
					time:["1:30 PM", "7:30 PM" , "11:00 PM"]

				},
				
				{
					movieName : "Arrival",
					image:'http://cdn3-www.comingsoon.net/assets/uploads/gallery/arrival/arrivalposter.jpg"',
					stars : '<span>☆</span><span>☆</span><span>☆</span>',
					time:["12:30 PM", "4:30 PM" , "6:00 PM"]

				},
				{
					movieName : "Lego Movie",
					image:'http://t3.gstatic.com/images?q=tbn:ANd9GcT_DB_4HOWU1oYdvra7wEM1nRRUZl3PtM6Xba6VOQ3VAFXjvP6g',
					stars : '<span>☆</span><span>☆</span><span>☆</span>',
					time:["11:30 AM", "2:30 PM" , "5:00 PM"]

				},
				{
					type:"add",
					image:"http://www.freeiconspng.com/uploads/popcorn-png-6.png",
					offerText : "Get Rs 200 off !!!",
					subOfferText: "When you buy a popcorn and combo."

				}
		]
		setInterval(function(){
			++self.index;
			self.index = self.index%4;
			self.updateDom(2000);
		}, 4000)
	},
	notificationReceived: function(notification, payload) {

		if (notification == "KONE_API") {
			if (payload.doorOpen) {
				console.log("starting forecast");
				this.startModule();
			} else if (!payload.doorOpen && payload.state == "moving") {
				console.log("starting forecast");
				this.startModule();
			} else {
				console.log("stopping forecast");
				this.stopModule();
			}
		}
		
		if (notification === "STOP_MIRROR") {
			console.log("stopping showtimings");
			this.stopModule();
		}

		if (notification === "START_SHOW") {
			console.log("starting showtimings");
			this.index = 0;
			this.startModule();
		}	
		if (notification === "DEMO_2") {
			console.log("stopping showtimings");
			this.hide(500);
		}	
	},
});