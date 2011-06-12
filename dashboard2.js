mainWin = Ti.UI.currentWindow;

//Ti.include('findtags.js');

var url = "http://www.tumblr.com/tagged/" + "fashion";

var loader = Titanium.Network.createHTTPClient();
loader.open('GET', url);
loader.onload = function(){
    var re = this.responseText;
    Ti.API.info(re.indexOf("this.src"));
};
//loader.send({email:mail, password:pswd});
loader.send();
