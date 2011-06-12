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
