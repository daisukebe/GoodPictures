Titanium.UI.setBackgroundColor('#808080');

//var tabg = Ti.UI.createTabGroup();
var color = '#808080'; //#2C4762

/*
var scrollView = Ti.UI.createScrollableView({
    views:[Ti.UI.createImageView({image:null})],
    backgroundColor: color,
    top: Ti.Platform.displayCaps.platformHeight / 12,
    bottom: Ti.Platform.displayCaps.platformHeight / 48,
    left: Ti.Platform.displayCaps.platformWidth / 32,
    right: Ti.Platform.displayCaps.platformWidth / 32,
    showPagingControl:false,
    maxZoomScale:2.0
});
*/
/*
var list_scrollView = Ti.UI.createScrollableView({
    views:[Ti.UI.createImageView({image:null})],
    backgroundColor: color,
    top: Ti.Platform.displayCaps.platformHeight / 12,
    bottom: Ti.Platform.displayCaps.platformHeight / 48,
    left: Ti.Platform.displayCaps.platformWidth / 32,
    right: Ti.Platform.displayCaps.platformWidth / 32,
    showPagingControl:false,
    maxZoomScale:2.0
});
*/

var win = Ti.UI.createWindow({  
    backgroundColor: color,
    url:'dashboard.js'
});

win.open({fullscreen:true});