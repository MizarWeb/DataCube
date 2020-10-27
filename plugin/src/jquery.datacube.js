/**
 * Plugin Jquery DataCube.
 * @example
	$( "#element" ).dataCubeWidget({
					appDataCube: true,
					appSpectre: false,
					appHistogramm: false,
                    appDescription: false,
                    appFile:"",
                    noLogin: false,
                    appendCSS: false
				});
 */
//folder where datacube plugin is launch
var folderPath =  "./templates/datacube/";
$.when(
    $.getScript( folderPath + "inline.datacube.bundle.js" ),
    $.getScript( folderPath + "polyfills.datacube.bundle.js" ),
    $.getScript( folderPath + "scripts.datacube.bundle.js" ),
    $.getScript( folderPath + "main.datacube.bundle.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){

   // the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

    "use strict";

        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variables rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = "dataCubeWidget",
            defaults = {
                appDataCube: true,
                appSpectre: true,
                appHistogramm: true,
                appDescription: true,
                appDescription: true,
                appFile:"",
                noLogin: false,
                apiRest: "",
                appendCSS: false
            };


        /**
        * @param {function Plugin(element: DOM, options: object)}
        */
        function Plugin ( element, options ) {
            this.element = element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            
            //folder where datacube plugin is launch
            this.folderPat =  "./templates/datacube/";
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend( Plugin.prototype, {					
            init: function() {

                // Place initialization logic here
                // You already have access to the DOM element and
                // the options via the instance, e.g. this.element
                // and this.settings
                // you can add more functions like the one below and
                // call them like the example below
                //this.fetchBeforeRender();
                this.setDatacube( "Div DataCube Widget" );
            },
            //basket.js version : problem when integration with Mizar
            /* fetchBeforeRender: function () {
                console.log('my loaded css files');
                basket.require({ url: this.folderPat + 'styles.4983a727ec7fe11bbdf4.bundle.css', execute: true }).then(function(responses) {
                    // HACK: function parameters for the promise method don't appear to be documented, but they contain the responses for now.
                    var css = responses[0];
                    _stylesheet.appendStyleSheet(css, function(err, style) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Stylesheet successfully load via basket.js");
                        }
                    });
                });
            }, */
            setDatacube: function( text ) {
            
                $( this.element )
                    .text( text )
                    .append("<app-root></app-root>")
                    .find("app-root")
                    .attr({
                        appDataCube: this.settings.appDataCube,
                        appSpectre: this.settings.appSpectre,
                        appHistogramm: this.settings.appHistogramm,
                        appDescription: this.settings.appDescription,
                        appFile: this.settings.appFile,
                        noLogin: this.settings.noLogin
                    });

                if (this.settings.appendCSS == true){
                    var style = "../templates/datacube/styles.datacube.bundle.css";
                    $('head').append('<link rel="stylesheet" href="'+style+'" type="text/css" />');
                }
            },
            
        });

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function( options ) {
            return this.each( function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" +
                        pluginName, new Plugin( this, options ) );
                }
            } );
        };

        // if (this.settings.appendCSS){
        //     var style = "../templates/datacube/styles.datacube.bundle.css";
        //     $('head').append('<link rel="stylesheet" href="'+style+'" type="text/css" />');
        // }
       
} )( jQuery, window, document );
});


