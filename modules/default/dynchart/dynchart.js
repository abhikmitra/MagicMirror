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

Module.register("dynchart",{

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
    getDom: function(){
        var wrapper = document.createElement("div");
        this.ctx = document.createElement("canvas");
        wrapper.appendChild(this.ctx);
        console.log("Moment", moment);
        console.log("Chart", Chart);
        //Line Chart Showing the Average motor temperature over the last 24 hrs
        
         var myChart = new Chart(this.ctx,{
         type: 'line',
         data: {
         labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15','16','17','18','19','20','21','22','23','24'],
         datasets: [{
         label: 'Motor Temperature',
         fill: false,
         lineTension: 0.1,
         data: [2.9, 3, 2.7, 3, 5.2, 2.9, 3,3.1, 3.1, 3, 3, 2.9, 2.95, 3,3.1, 3, 2.9, 3, 3, 3, 2.9,6.1, 3, 3],
         backgroundColor: "rgba(255,0,0,1)",
         borderColor: "rgba(255,0,0,1)"
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