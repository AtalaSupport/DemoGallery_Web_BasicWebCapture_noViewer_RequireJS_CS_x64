requirejs.config({
    baseUrl: '/WebCapture',
    paths: {
        'jquery': 'jquery-3.5.1.min',
        'web-capture-service': 'atalaWebCapture'
    },
    shim: {
        // Web Capture Service at the moment is non-AMD script and requires a AMD shim config.
        'web-capture-service': {
            deps: ['jquery'],
            exports: 'Atalasoft',
        }
    }
});


requirejs(["web-capture-service", "jquery"], function RunApp(Atalasoft, jQuery) {
    Atalasoft.Controls.Capture.WebScanning.initialize({
        handlerUrl: 'WebCaptureHandler.ashx',
        onUploadCompleted: function (eventName, eventObj) {
            if (eventObj.success) {
                document.getElementById('resultDiv').innerHTML = "Status: Upload Success... " + eventObj.documentFilename;
                alert(eventObj.documentFilename);
                //_thumbs.openUrl('atala-capture-upload/' + eventObj.documentFilename, '');
            }
        },
        onScanError: scanErrorHandler,
        scanningOptions: { applyVRS: false, pixelType: 0, showScannerUI: false }
    });


    function scanErrorHandler(msg, params) {
        switch (msg) {
            case Atalasoft.Controls.Capture.Errors.badBrowser:
                alert(msg);
                break;
            case Atalasoft.Controls.Capture.Errors.activeX:
                alert(
		        "The ActiveX Scanning Control needs to be installed, updated or enabled.\n" +
		        "When prompted, please allow the WingScan Web Scanning Control to install itself,\n" +
		        "or Manage Add-ons through IE Settings. Refresh your browser when completed.");
                break;
            case Atalasoft.Controls.Capture.Errors.noTwain:
                alert(
	            "TWAIN is not installed on this computer.\n" +
	            "Contact your system administrator.");
                break;
            case Atalasoft.Controls.Capture.Errors.noPlugin:
                var pluginUrl = window.location.protocol + "//" + window.location.host + "/WebCapture/" + params.filename
                alert(
	            "The WingScan Web Scanning plugin is not available. \n\n" +
	            "Please download from : " + pluginUrl + "\n" +
	            "If you are not prompted to install, the plugin may be installed but disabled. \n" +
	            "enable it through Tools... Extensions. \n" +
	            "Refresh your browser when completed.");
                window.open(pluginUrl, '_downloadPlugin');
                break;
            case Atalasoft.Controls.Capture.Errors.oldPlugin:
                var pluginUrl = window.location.protocol + "//" + window.location.host + "/WebCapture/" + params.filename
                alert(
	            "The WingScan Web Scanning plugin is out of date.<br />" +
	            "To download and install the latest version from " +
	            params.filename);
                window.open(pluginUrl, '_downloadPlugin');
                break;
            case "VRS: No license or license expired":
                alert("Scanning aborted with a VRS licensing exception. \n\n" +
	            "VRS is enabled, but no VRS license is present.\n" +
	            "Either turn VRS off in your scanningOptions or \n" +
	            "activate a license with VRS.");
                break;
            default:
                alert(msg);
                break;
        }
    }
    //window._scanningOptions = Atalasoft.Controls.Capture.WebScanning.scanningOptions;
    //window._scanning = Atalasoft.Controls.Capture.WebScanning;
});


function scanWithSelectedScanner() {
    let selectedScanner = $('.atala-scanner-list').val();

    if (selectedScanner == "(no scanners available)") {
        alert("No Scanners available - please wait for the list to populate");
    } else {
        Atalasoft.Controls.Capture.WebScanning.scanningOptions.scanner = $('.atala-scanner-list').val();
        Atalasoft.Controls.Capture.WebScanning.scan();
    }
}


