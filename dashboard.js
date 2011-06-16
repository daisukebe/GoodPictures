mainWin = Ti.UI.currentWindow;

Ti.include('account.js');
Ti.include('load.js');

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
    Load.run(start);
}

var activity = Ti.Android.currentActivity;
activity.onCreateOptionsMenu = function(e){
    var menu = e.menu;
    var refresh = menu.add({
	title: "refresh",
	itemId : 1,
	groupId : 0,
	order : 0
    });
    refresh.addEventListener('click', function(e){
	Load.blur();
	Load.run(start);
    });
    var setting = menu.add({
	title: "setting",
	itemId: 2
    });
    var search = menu.add({
	title: "search",
	itemId: 3
    });

};
