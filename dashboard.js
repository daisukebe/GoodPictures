mainWin = Ti.UI.currentWindow;
/*
Ti.API.info("height:" + Ti.Platform.displayCaps.platformHeight +
	   " width:" + Ti.Platform.displayCaps.platformWidth);
var image1 = Ti.UI.createImageView({
    image:"http://25.media.tumblr.com/tumblr_lmyqu3ztp01qgswsxo1_250.jpg"
});
var image2 = Ti.UI.createImageView({
    image:"http://24.media.tumblr.com/tumblr_lmyqtncOy71qgswsxo1_250.jpg"
});

var scrollView = Ti.UI.createScrollableView({
    views:[],//[image1, image2],
    backgroundColor: '#808080',
    top: Ti.Platform.displayCaps.platformHeight / 12,
    bottom: Ti.Platform.displayCaps.platformHeight / 24,
    left: Ti.Platform.displayCaps.platformWidth / 32,
    right: Ti.Platform.displayCaps.platformWidth / 32,
    showPagingControl:false,
    maxZoomScale:2.0
});
scrollView.addView(image1);
scrollView.addView(image2);
mainWin.add(scrollView);
*/
Ti.include('account.js');
Ti.include('load.js');
Ti.include('picker.js');

var mail = null, pswd = null;
var start = 0;

//Ti.App.Properties.removeProperty("ml");

if(!Ti.App.Properties.hasProperty("ml") || !Ti.App.Properties.hasProperty("pw")){
    Ti.API.info("can't find the account");
    Account.set();

}else{
    Ti.API.info("already set the account");
    mail = Ti.App.Properties.getString("ml");
    pswd = Ti.App.Properties.getString("pw");
    Load.run_at_first(start);
    tagLoad.get_list();
}

var activity = Ti.Android.currentActivity;
activity.onCreateOptionsMenu = function(e){
    var menu = e.menu;
    var refresh = menu.add({
	title: "Refresh",
	itemId : 1,
	groupId : 0,
	order : 0
    });
    refresh.addEventListener('click', function(e){
	Load.blur();
	Load.run_at_first(start);
	mainWin.add(picker);
	tagLoad.get_list();
    });
    var setting = menu.add({
	title: "Setting",
	itemId: 2
    });

};
