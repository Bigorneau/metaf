var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

var mfbrowser = BrowserDetect.browser;
var mfversion = BrowserDetect.version;
if (document.cookie.indexOf('old_browser') == -1 && document.getElementById('errorPaneText').innerHTML == "") {
	if (mfbrowser == "Firefox" && mfversion < 4)
		displayError("<div onclick=\'closeError();\' class=\'closeButton\'></div><?php echo $LANG['OLD_BROWSER_TEXT1'];?> " + mfbrowser + " " + mfversion + "<div style='height:6px;'></div><?php echo $LANG['OLD_BROWSER_FIREFOX1'];echo $siteSettings['titlebase'];?>.<div style='height:6px;'></div><?php echo $LANG['OLD_BROWSER_TEXT3'];echo $siteSettings['titlebase'];echo $LANG['OLD_BROWSER_TEXT4'];echo $LANG['OLD_BROWSER_FIREFOX2'];?><u><a href='http://www.getfirefox.com' target='_blank'>Mozilla</a></u><div style='height:6px;'></div><a href='http://www.mozilla-europe.org/fr/' target='_blank'><img src='images/core/firefox.png' alt='' title='' /></a><div style='height:6px;'></div><input type='checkbox' name='ff_dontbother' id='ff_dontbother' style='vertical-align:middle;' /> <?php echo $LANG['OLD_BROWSER_DONT'];?>");
	else if (mfbrowser == "Explorer" && mfversion < 9)
		displayError("<div onclick=\'closeError();\' class=\'closeButton\'></div><?php echo $LANG['OLD_BROWSER_TEXT1'];?> " + "Internet Explorer" + " " + mfversion + "<div style='height:6px;'></div><?php echo $LANG['OLD_BROWSER_TEXT2'];?><div style='height:6px;'></div><?php echo $LANG['OLD_BROWSER_TEXT3'];echo $siteSettings['titlebase'];echo $LANG['OLD_BROWSER_TEXT4'];?> <div style='height:6px;'></div><a href='http://www.mozilla-europe.org/fr/' target='_blank'><img src='images/core/firefox_mini.png' /></a><a href='http://www.opera.com' target='_blank'><img src='images/core/opera.png' /></a><a href='http://www.google.fr/chrome' target='_blank'><img src='images/core/chrome.jpg' /></a><a href='http://www.apple.com/fr/safari/' target='_blank'><img src='images/core/safari.png' /></a><div style='height:6px;'></div><input type='checkbox' name='ie_dontbother' id='ie_dontbother' style='vertical-align:middle;' /> <?php echo $LANG['OLD_BROWSER_DONT'];?>");
}
