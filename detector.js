var cssDetector = {
    init: function() {
        var ruleCount = 0;
        for (var stylesheet in document.styleSheets) {
            if (typeof document.styleSheets[stylesheet].href === "undefined" || document.styleSheets[stylesheet].href === null) continue;
            var excluded = false;
            for (var ex in this.exclude) {
                console.log(this.exclude[ex]);
                if (document.styleSheets[stylesheet].href.indexOf(this.exclude[ex]) > -1) excluded = true;
            }
            if (excluded == true) continue;
            for (var rule in document.styleSheets[stylesheet].cssRules) {
                if (typeof document.styleSheets[stylesheet].cssRules[rule].selectorText === "undefined") continue; 
                if (document.querySelectorAll(document.styleSheets[stylesheet].cssRules[rule].selectorText).length == 0) {
                    console.error('Unused CSS rule: ', document.styleSheets[stylesheet].cssRules[rule].selectorText, '(' + document.styleSheets[stylesheet].href + ')');
                    ruleCount += 1;
                }
            }
        }
        return ruleCount;
    },
    
    exclude: [],
    
    runEvent: new CustomEvent("cssDetectorRun")
        
};

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        window.dispatchEvent(cssDetector.runEvent);
        // run only when the page has entirely loaded
        cssDetector.init();
    }
};