//IE Polyfill - Custom Event Constructor 
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   };

  CustomEvent.prototype = window.CustomEvent.prototype;

  window.CustomEvent = CustomEvent;
})();

// Create cssDetector object
var cssDetector = {
    init: function() {
        var excluded = false;
        for (var stylesheet in document.styleSheets) {
            if (typeof document.styleSheets[stylesheet].href === "undefined") continue;
            for (var ex in this.exclude) {
                if (document.styleSheets[stylesheet].href !== null && document.styleSheets[stylesheet].href.indexOf(this.exclude[ex]) > -1) excluded = true;
            }
            if (excluded == true) continue;
            for (var rule in document.styleSheets[stylesheet].cssRules) {
                if (typeof document.styleSheets[stylesheet].cssRules[rule].selectorText === "undefined") continue; 
                if (document.querySelectorAll(document.styleSheets[stylesheet].cssRules[rule].selectorText).length == 0) {
                    if (this.consoleErrors) {
                        console.error('Unused CSS rule: ', document.styleSheets[stylesheet].cssRules[rule].selectorText, '(' + document.styleSheets[stylesheet].href + ')');
                    }
                    if (this.removeBadSelectors) {
                        document.styleSheets[stylesheet].deleteRule(rule);
                    }
                }
            }
        }
    },
    
    exclude: [],
    consoleErrors: true,
    removeBadSelectors: false,
    runEvent: new CustomEvent("cssDetectorRun")
        
};

// run event and init only when the entire page has loaded.
document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        window.dispatchEvent(cssDetector.runEvent);
        cssDetector.init();
    }
};