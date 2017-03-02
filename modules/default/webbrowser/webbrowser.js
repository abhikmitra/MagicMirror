
/**
 * Module registering
 * @param: module name
 * @param: Object
 */
Module.register("webbrowser", {

    /**
     *   Default url to navidate.
     */
    defaults: {
        url: 'https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider1.jpg',
        height: '600px',
        width: '300px'
    },

    /**
     * Override DOM generator.
     * Gets the Url from the config file, or from default value
     * creates a iframe to that web and return the HTML to Magic Mirror
     */
    getDom: function () {
        var iframe = document.createElement('iframe');
        iframe.src = this.config.url;
        iframe.style.height = this.height;
        iframe.style.width = this.width;
        iframe.style.border = "0px";
        document.body.appendChild(iframe);
        var wrapper = document.createElement("div");
        wrapper.appendChild(iframe);
        return wrapper;
    }
});