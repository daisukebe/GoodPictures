mainWin = Ti.UI.currentWindow;

//Ti.include('findtags.js');

var url = "http://www.tumblr.com/tagged/" + "fashion";
//var url = "http://www.tumblr.com/api/dashboard/json?debug=1&start=0&email=poleon.kd@gmail.com&password=28160tumblr&tagged=fashion";

var loader = Titanium.Network.createHTTPClient();
loader.open('GET', url);
loader.onload = function(){
    var re = this.responseText;
    Ti.API.info(re.indexOf("this.src"));
};
//loader.send({email:mail, password:pswd});
loader.send();
