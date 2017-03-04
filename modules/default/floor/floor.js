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
        wrapper.className= "wrapper_floor";
        if(!this.floors) {
            this.floors = [];
        }

        for(var i = 1;i<=10;i++) {
            var isPresent = false;
            for (var k = 0 ; k< this.floors.length ;k++) {
                if (this.floors[k] == i) {
                    isPresent = true;
                    break;
                }
            }
            var cls;
            if (isPresent) {
                cls  = 'class="key bright medium bold';
            } else {
                cls = 'class="key medium thin';
            }

            if(this.currentFloor == i) {
                cls += ' currentFloor"';
            } else {
                cls += '"';
            }

            var numberDom = '<div  rel="'+ i +'" ' + cls + '>' + i +'</div>';
            var numberWrapper = document.createElement("div");
            numberWrapper.innerHTML = numberDom;
            wrapper.appendChild(numberWrapper.firstElementChild);
        }

        return wrapper;
    },

    startModule: function() {
        this.currentFloor = null;
       this.floors = [];
    },

    getStyles: function () {
        return ["floorStyle.css", "font-awesome.css"];
    },
    notificationReceived: function(notification, payload) {
        if (notification == "FLOOR") {

            this.show(500);

            this.floors = [parseInt(payload.payload.VALUE)];
            this.updateDom();


        }

        if (notification == "UPDATE_CURRENT_FLOOR") {

            this.currentFloor = payload.payload;
            this.updateDom();

        }

        if (notification == "RESET") {

            this.currentFloor = null;
            this.floors = [];
            this.show(500)
            this.updateDom();

        }

        if (notification == "DEMO_3") {
            this.hide(500);
        }
    }
});