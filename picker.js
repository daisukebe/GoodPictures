
mainWin = Ti.UI.currentWindow;
//Ti.API.info(Ti.Platform.displayCaps.platformHeight + ":" + Ti.Platform.displayCaps.platformWidth);
var color = '#808080';
var re = null;
var data = [];
var views = [];
var list_scrollView = null;

data[0] = Ti.UI.createPickerRow({title:"My Dashboard"});
var picker = Ti.UI.createPicker({
    columns: data,
    //top: Ti.Platform.displayCaps.platformHeight * 0.792,
    top: 0,
    height: Ti.Platform.displayCaps.platformHeight / 12,
    width: Ti.Platform.displayCaps.platformWidth
});
picker.addEventListener('change', function(e){
    tagLoad.run(e.row);
});
mainWin.add(picker);

var tagLoad = {
    get_list: function(){
	var url = "http://www.tumblr.com/explore";
	var loader = Titanium.Network.createHTTPClient();
	loader.open('GET', url);
	loader.onload = function(){
	    re = this.responseText;
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

	    for(var i = 0; i < lists.length; i++){
		data[i+1] = Ti.UI.createPickerRow({title:lists[i]});
	    }
	    picker.selectionIndicator = true;
	    picker.add(data);

	}
	loader.send();
    },

    get_url: function(re){
	var urls = [], i = 0;
	var _start = 0, start, end = 1;
	while(1){
	    var start = re.indexOf("http", re.indexOf("onload=\"if", _start));
	    if(start > _start){
		//Ti.API.info(start);
		//var end = re.indexOf("500", start);
		var end = re.indexOf("\';", start);
		//Ti.API.info(end);
		//Ti.API.info("start:" + start + " - " + re.substr(start, end + 7 - start));
		//Ti.API.info("start:" + start + " - " + re.substr(start, end - start));
		urls[i++] = re.substr(start, end - start);
		_start = end;
	    }else{
		break;
	    }
	}
	return urls;
	
    },
    
    get_next: function(re){
	//next_page_link
	var start = re.indexOf("/tagged", re.indexOf("next_page_link"));
	//Ti.API.info(start);
	var end = re.indexOf(">", start);
	//Ti.API.info(end);
	var next = "http://www.tumblr.com" + re.substr(start, end - 1 - start)
	//Ti.API.info(next);
	return next;
	
    },

    set: function(urls, next){
	var n = Ti.UI.createNotification({message: "...loaded"});

	for(var i = 0; i < urls.length; i++){
	    Ti.API.info(urls[i]);
	    views[i] = Ti.UI.createImageView({image:urls[i]});
	}
	list_scrollView = Ti.UI.createScrollableView({
	    views:views,
	    backgroundColor: color,
	    top: Ti.Platform.displayCaps.platformHeight / 12,
	    bottom: Ti.Platform.displayCaps.platformHeight / 48,
	    left: Ti.Platform.displayCaps.platformWidth / 32,
	    right: Ti.Platform.displayCaps.platformWidth / 32,
	    showPagingControl:false,
	    maxZoomScale:2.0
	});
	mainWin.add(list_scrollView);
	mainWin.add(picker);
	setTimeout(function(){
	    n.show();
	},500);
	actInd.hide();
    },

    
    
    run: function(word){
	actInd.show();
	var url = "http://www.tumblr.com/tagged/" + word;
	var urls = null, next = null;
	//Ti.API.info(url);
	var loader = Titanium.Network.createHTTPClient();
	loader.open('GET', url);
	loader.onload = function(){
	    re = this.responseText;
	    urls = tagLoad.get_url(re);
	    next = tagLoad.get_next(re);
	    tagLoad.set(urls, next);
	}
	loader.send();
    }
};
