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

Module.register("dynchart2",{

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

        //Line Chart Showing the Average motor temperature over the last 24 hrs
        /*
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
         */

        // Bar chart for average close time for left and right doors
        /*
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
        */

        //Line Chart Showing the different time variations in last 24 hrs
        
         var myChart = new Chart(this.ctx,{
         type: 'line',
         data: {
         labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15','16','17','18','19','20','21','22','23','24'],
         datasets: [
             {
                 label: 'Car Start Time', //Door close time to elevator start time
                 fill: false,
                 lineTension: 0.1,
                 data: [0.2, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1,0.1, 0.1, 0.1, 0.1, 0.09, 0.095, 0.1,0.1, 0.1, 0.09, 0.1, 0.1, 0.1, 0.09,0.1, 0.1, 0.1],
                 backgroundColor: "rgba(255,0,0,1)",
                 borderColor: "rgba(255,0,0,1)"
             },
             {
                 label: 'Brake to Brake Time', //Elevator Start to Elevator Stop on a one floor run
                 fill: false,
                 lineTension: 0.1,
                 data: [4.9, 5, 4.7, 5, 5.4, 4.9, 5,5.1, 5.1, 5, 5, 4.9, 4.95, 5,5.1, 5, 4.9, 5, 5, 5, 4.9,6.1, 5, 5],
                 backgroundColor: "rgba(255,255,0,1)",
                 borderColor: "rgba(255,255,0,1)"
             },
             {
                 label: 'Floor to Floor Time', //Elevator door close Start to Elevator door complete open on a one floor run
                 fill: false,
                 lineTension: 0.1,
                 data: [6.9, 7, 6.7, 7, 7.3, 6.9, 7,7.1, 7.1, 7, 7, 6.9, 6.95, 7,7.1, 7, 6.9, 7, 7, 7, 6.9,7.3, 7, 7],
                 backgroundColor: "rgba(100,200,0,1)",
                 borderColor: "rgba(100,200,0,11)"
             },
             {
                 label: 'Door Open Time',
                 fill: false,
                 lineTension: 0.1,
                 data: [0.9, 0.8, 0.7, 0.5, 1.0, 0.9, 0.3,0.1, 0.1, 0.4, 0.2, 0.9, 0.95, 0.2,0.1, 0.2, 0.4, 0.4, 0.4, 0.4, 0.3,0.5, 0.4, 0.4],
                 backgroundColor: "rgba(100,50,100,1)",
                 borderColor: "rgba(100,50,100,1)"
             }
             ,
             {
                 label: 'Door Close Time',
                 fill: false,
                 lineTension: 0.1,
                 data: [0.9, 0.6, 0.6, 0.5, 1.0, 0.9, 0.5,0.1, 0.1, 0.5, 0.5, 0.9, 0.95, 0.5,0.1, 0.5, 0.9, 0.5, 0.5, 0.5, 0.9,1.2, 0.5, 0.5],
                 backgroundColor: "rgba(100,100,255,1)",
                 borderColor: "rgba(100,100,255,1)"
             }
         ]
         }
         });
        

        //Polar Area chart showing the amount of time in each action
/*
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
*/

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