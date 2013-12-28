# CSS Detector
Written by Cam Wright

----
Just a quick heads up- if configured incorrectly, this can spit out a lot of console errors... but that's kind of the point.

This library uses the CustomEvent constructor so it probably won't work in IE 10 or below, maybe even IE 11.

You can trigger updates to the cssDetector object by adding a listener to the "cssDetectorRun" event. This will allow you to change the way the library reacts and deals with unused rules.

`cssDetector.consoleErrors = false;` will turn off the console errors that the library spits out by default.  
`cssDetector.removeBadSelectors = true` will remove the CSS Rules from the DOM and thus freeing up more memory on the user's machine.  
`cssDetector.exclude.push([]);` will add a css file to ignore. This uses indexOf of the href of the stylesheet so you may need to be a bit specific when defining the items inside the array.

Of course because I'm currently not supporting IE at all yet, you might not want to run this on production websites (unless you're also not support IE).
