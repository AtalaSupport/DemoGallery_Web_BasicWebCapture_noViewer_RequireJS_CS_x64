<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BasicWebCapture_noViewer_RequireJS._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>

    <!-- THe action happens whinin the scripts/webCapturenitialization.js -->
    <script data-main="/scripts/webCapturenitialization" src="/scripts/require.js" defer="defer"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="scanDiv">
        <h1>Basic WingScan Web Capture Demo</h1>
        <h3>Using WingScan and NO Viewer</h3>
        <h4>This is loading dependencies via RequireJS</h4>
        <p>Select your scanner and click the scan button... the file will be uploaded to /atala-capture-upload/ with a unique filename (the filename will appear in the status below)</p>
        <p>&nbsp;</p>
        <p>Select Scanner:
            <select class="atala-scanner-list" disabled="disabled" name="scannerList" style="width:22em">
                <option selected="selected">(no scanners available)</option>
            </select>
            &nbsp;
            <%-- 
                ========================
                DO NOT USE  - we need to do some extra work to use the scanner list 
                <input type="button" class="atala-scan-button" value="Scan" />  
                ========================
            --%>
            <input type="button" id="btn_press" value="Button" onclick="scanWithSelectedScanner(); return false;" />
        </p>

    </div>
    <div id="resultDiv">Status: NoUploads</div>
    </form>
</body>
</html>
