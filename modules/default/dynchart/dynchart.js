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
    getDom: function() {
        var wrapper = document.createElement("div");
        this.ctx = document.createElement("canvas");
        wrapper.appendChild(this.ctx);
        console.log("Moment", moment);
        console.log("Chart", Chart);
        var myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        return wrapper;
    }
});