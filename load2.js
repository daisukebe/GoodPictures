var tagLoad = {
    get_list: function(re){
	var _start = 0, start, end = 1;
	var lists = [], i = 0;

	while(1){
	    var start = re.indexOf("/tagged/", _start);
	    if(start > _start){
		var end = re.indexOf("\"", start);
		//Ti.API.info(end);
		//Ti.API.info("tag:" + re.substr(start + 7, end - start - 7));
		lists[i] = re.substr(start + 8, end - start - 8);
		_start = end;
		i++;
	    }else{
		break;
	    }
	}
	return lists;
    },

    get_url: function(re){
	Ti.API.info("start");
	var urls = [];
	var _start = 0, start, end = 1;
	while(1){
	    var start = re.indexOf("http", re.indexOf("onload=\"if", _start));
	    if(start > _start){
		//Ti.API.info(start);
		var end = re.indexOf("500", start);
		//Ti.API.info(end);
		Ti.API.info("start:" + start + " - " + re.substr(start, end + 7 - start));
		_start = end;
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
    
    get: function(){
	var url = "http://www.tumblr.com/explore";
	Ti.API.info(url);
	var loader = Titanium.Network.createHTTPClient();
	loader.open('GET', url);
	loader.onload = function(){
	    var re = this.responseText;
	    //tagLoad.get_url(re);
	    //tagLoad.get_next(re);
	    return tagLoad.get_list(re);

	}
	loader.send();
    }
};
