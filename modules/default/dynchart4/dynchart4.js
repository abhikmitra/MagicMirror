/**
 * Created by abhikmitra on 3/1/17.
 */
/* global Module */

/* Magic Mirror
 * Module: dynchart
 *
 * By Chris van Marle
 * MIT Licensed.
 */

Module.register("dynchart4",{

    // Default module config.
    defaults: {
    },

    getScripts: function() {
        return ["moment.js", this.file("node_modules/chart.js/dist/Chart.min.js")];
    },

    start: function() {

    },

    updateChartData: function() {

    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        this.ctx = document.createElement("canvas");
        wrapper.appendChild(this.ctx);
        console.log("Moment", moment);
        console.log("Chart", Chart);     
//Polar Area chart showing the amount of time in each action
       
         var myChart = new Chart(this.ctx,{
         type: 'doughnut',
         data: {
         labels: [
         "Door Close",
         "Door Open",
         "Car Start",
         "Brake to Brake"
         ],
         datasets: [
         {
         data: [50, 50, 30, 100],
         backgroundColor: [
         "#FF6384",
         "#36A2EB",
         "#FFCE56",
         "#00FF00"
         ]
         }],

         options: {
         circumference : 100 * Math.PI
         }
         }

         });
         
        return wrapper;
    },
  stopModule: function() {

    this.hide(2000);
  },
  startModule: function() {

    this.show(2000);
  },

  // Override notification handler.
  notificationReceived: function(notification, payload, sender) {

    if (notification === "STOP_MIRROR") {
      console.log("stopping dynchart");
      this.stopModule();
    }
    if (notification === "DEMO_3") {
      console.log("starting dynchart");
      this.startModule();
    }
  }
});