/**
 * Created by abhikmitra on 3/2/17.
 */

/**
 * Module registering
 * @param: module name
 * @param: Object
 */
Module.register("floor", {

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.innerText = this.floors || "";
        return wrapper;
    },

    startModule: function() {
       this.floors = [];
    },
    notificationReceived: function(notification, payload) {
        if (notification == "FLOOR_SELECTED") {

            if (payload.VALUE.length == 0) {
                this.hide(1000);
            } else {
                this.show(500);
            }

            this.floors = payload.VALUE;
            this.updateDom();


        }


    }
});