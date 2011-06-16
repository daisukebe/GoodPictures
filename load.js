var color = 'black'; //#2C4762

var scrollView = Ti.UI.createScrollableView({
    views:{},
    backgroundColor: color,
    showPagingControl:false,
    maxZoomScale:2.0
});

var actInd = Titanium.UI.createActivityIndicator({
    height:Ti.Platform.displayCaps.platformHeight / 1.6,
    width:80,
    message:"Loading Dashboard..."
});

var reblogkey = [];
var postid = [];

var Load = {
    reblog : function(id, key){
	Ti.API.info(id + ':' + key);
	if(Ti.Network.online == false){
	    Ti.API.info('network offline');
	    return;
	}
	var n = Ti.UI.createNotification({message: "..Reblogged"});

	try{
	    Ti.API.info('reblogging...');
	    var url = "http://www.tumblr.com/api/reblog";
	    var post = Ti.Network.createHTTPClient();
	    post.open('POST', url);
	    post.send({
		email:mail,
		password:pswd,
		"post-id":id,//postid[scrollView.currentPage],
		"reblog-key":key//reblogkey[scrollView.currentPage]
	    });
	}catch(error){
	    Ti.API.info(error);
	}
	Ti.API.info('rebloged...');
	setTimeout(function(){
	    n.show();
	},500);
    },

    blur: function(){
	scrollView = null;
	scrollView = Ti.UI.createScrollableView({
	    views:{},
	    backgroundColor: color,
	    showPagingControl:false,
	    maxZoomScale:2.0
	});
    },

    run : function(start){
	Ti.API.info('reloading from ' + start);

	var views = [];
	//var url = 'http://daisukebe15.tumblr.com/api/read/json?debug=1&num=5';
	//http://www.tumblr.com/api/dashboard/json?debug=1&start=0&email=&password=&num=20&
	var url = 'http://www.tumblr.com/api/dashboard/json?debug=1&start=' + start + '&email=' + mail + '&password=' + pswd + '&num=20' + '&type=photo';
	Ti.API.info("start:" + start);
	
	var loader = Titanium.Network.createHTTPClient();
	loader.open('GET', url);
	loader.onload = function(){
	    actInd.show();
	
	    var re = this.responseText;
	    var data = JSON.parse(re);
	    data = data.posts;
	    for(var i = 0; i < data.length; i++){
		Ti.API.info(i + ":" + data[i].type);
		//Ti.API.info(e["photo-url-400"]);
		//Ti.API.info(e["photo-caption"]);
		//Ti.API.info(e.id + ':' + e["reblog-key"]);
		(function(post){
		    var image = Ti.UI.createImageView({
			image:post["photo-url-250"]
		    });
		    image.addEventListener('doubletap', function(e){
			Ti.API.info('doubletaped:' + scrollView.currentPage);
			Load.reblog(post.id, post["reblog-key"]);
		    });
		    scrollView.addView(image);
		})(data[i]);
	    }
	    actInd.hide();
	};
	loader.onerror = function(e){
	    var diag = Ti.UI.createAlertDialog({
		title: "Can't load posts",
		message: "Please sign in again",
		textAlign: 'center',
		buttonNames:['OK']
	    });
	    diag.show();

	    diag.addEventListener('click', function(ev){
		Account.set();
	    });
	};
	loader.send();

	mainWin.add(scrollView);
    }
};

scrollView.addEventListener('scroll', function(e){
    Ti.API.info('current page:' + scrollView.currentPage);
    
    if(scrollView.currentPage > start + 10){
	start += 20;
	Load.run(start);
    }

    
});

