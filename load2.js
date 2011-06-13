var tagLoad = {
    get_url: function(re){
	Ti.API.info("start");
	var urls = [];
	var _start = 0, start, end = 1;
	var c = 9;
	while(1){
	    
	    var start = re.indexOf("http", re.indexOf("onload=\"if", _start));
	    if(start > _start){
		//Ti.API.info(start);
		var end = re.indexOf("500", start);
		//Ti.API.info(end);
		Ti.API.info("start:" + start + " - " + re.substr(start, end + 7 - start));
		_start = end;
		c = c - 1;
	    }else{
		break;
	    }
	}
	
    },
    
    get_next: function(re){
	//next_page_link
	var start = re.indexOf("/tagged", re.indexOf("next_page_link"));
	//Ti.API.info(start);
	var end = re.indexOf(">", start);
	//Ti.API.info(end);
	var next = "http://www.tumblr.com" + re.substr(start, end - 1 - start)
	Ti.API.info(next);
	
    },
    
    get: function(key){
	var url = "http://www.tumblr.com/tagged/" + key;
	Ti.API.info(url);
	var loader = Titanium.Network.createHTTPClient();
	loader.open('GET', url);
	loader.onload = function(){
	    var re = this.responseText;
	    tagLoad.get_url(re);
	    tagLoad.get_next(re);

	}
	loader.send();
    }
};
