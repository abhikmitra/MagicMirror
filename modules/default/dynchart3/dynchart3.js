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

Module.register("dynchart3",{

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
        // Bar chart for average close time for left and right doors
        
         var myChart = new Chart(this.ctx,{
         type: 'bar',
         data: {
         labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15','16','17','18','19','20','21','22','23','24'],
         datasets: [{
         label: 'Left Door',
         data: [3, 3.01, 3, 3, 3.01, 3.03, 3,3.02, 3.0, 3, 3, 3, 3.0, 3,3.02, 3.01, 3.01, 3.01, 3, 3, 3,3.01, 3, 3],
         backgroundColor: "rgba(153,255,51,1)"
         }, {
         label: 'Right Door',
         data: [3, 3, 3, 3, 3, 3, 3,3.01, 2.99, 3, 3, 2.99, 2.99, 3,3.01, 3, 2.99, 3, 3, 3, 2.98,3, 3, 3],
         backgroundColor: "rgba(255,153,0,1)"
         }]
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