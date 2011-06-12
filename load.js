var color = 'black'; //#2C4762

var scrollView = Ti.UI.createScrollableView({
    views:{},
    backgroundColor: color,
    showPagingControl:false,
    maxZoomScale:2.0
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
    
    run : function(start){
	Ti.API.info('reloading from ' + start);

	var views = [];
	//var url = 'http://daisukebe15.tumblr.com/api/read/json?debug=1&num=5';
	//http://www.tumblr.com/api/dashboard/json?debug=1&start=0&email=poleon.kd@gmail.com&password=28160tumblr&num=20&
	var url = 'http://www.tumblr.com/api/dashboard/json?debug=1&start=' + start + '&email=' + mail + '&password=' + pswd + '&num=20' + '&type=photo';
	Ti.API.info("start:" + start);
	
	var loader = Titanium.Network.createHTTPClient();
	loader.open('GET', url);
	loader.onload = function(){
	    var re = this.responseText;
	    var data = JSON.parse(re);
	    data = data.posts;
	    for(var i = 0; i < data.length; i++){
		Ti.API.info(i + ":" + data[i].type);
		if(data[i].type == "regular"){
		    //Ti.API.info(e["regular-title"]);
		    //Ti.API.info(e["regular-body"]);
		    //Ti.API.info(e["reblog-key"]);
		    /*
		    (function(post){
			var view = Ti.UI.createScrollView({
			    backgroundColor:color,
			    contentHeight:'auto',
			    top:0,
			    showVerticalScrollIndicator:true
			});
			var v = Ti.UI.createWebView({
			    backgroundColor:'white',
			    height:'auto'
			});
			v.html = post["regular-title"] + '<br>' + post["regular-body"];
			
			v.addEventListener('doubletap', function(e){
			    Ti.API.info('doubletaped:' + scrollView.currentPage);
			    Load.reblog(post.id, post["reblog-key"]);
			});
			view.add(v);
			scrollView.addView(view);
		    })(data[i]);
		    */
		}else if(data[i].type == "link"){
		    //Ti.API.info(e["link-text"]);
		    //Ti.API.info(e["link-description"]);
		    //Ti.API.info(e["reblog-key"]);
		    /*
		    (function(post){
			var view = Ti.UI.createScrollView({
			    backgroundColor:color,
			    contentHeight:'auto',
			    top:0,
			    showVerticalScrollIndicator:true
			});
			var v = Ti.UI.createWebView({
			    backgroundColor:'white',
			    height:'auto'
			});
			v.html = post["link-text"] + '<br>' + post["link-description"];
			v.addEventListener('doubletap', function(e){
			    Ti.API.info('doubletaped:' + scrollView.currentPage);
			    
			    Load.reblog(post.id, post["reblog-key"]);
			});
			view.add(v);
			scrollView.addView(view);
		    })(data[i]);
		    */
		}else if(data[i].type == "photo"){
		    //Ti.API.info(e["photo-url-400"]);
		    //Ti.API.info(e["photo-caption"]);
		    //Ti.API.info(e.id + ':' + e["reblog-key"]);
		    (function(post){

			var view = Ti.UI.createView({
			    backgroundColor:color,
			    top:0,
			    canScale: true
			});

			var image = Ti.UI.createImageView({
			    image:post["photo-url-250"]
			});
			image.addEventListener('doubletap', function(e){
			    Ti.API.info('doubletaped:' + scrollView.currentPage);
			    Load.reblog(post.id, post["reblog-key"]);
			});
			view.add(image);
			scrollView.addView(view);
		    })(data[i]);
		}else if(data[i].type == "quote"){
		    //Ti.API.info(e["quote-text"]);
		    //Ti.API.info(e["reblog-key"]);
		    /*
		    (function(post){
			var view = Ti.UI.createScrollView({
			    backgroundColor:'black',
			    //contentHeight:'auto',
			    top:0,
			    showVerticalScrollIndicator:false
			});
			var v = Ti.UI.createWebView({
			    backgroundColor:'white',
			    top:0
			});
			v.html = post["quote-text"] + '<br>' + post["quote-source"];
			v.addEventListener('doubletap', function(e){
			    Ti.API.info('doubletaped:' + scrollView.currentPage);
			    
			    Load.reblog(post.id, post["reblog-key"]);
			});
			view.add(v);
			scrollView.addView(view);
		    })(data[i]);
		    */
		}else if(data[i].type == "conversation"){
		    //Ti.API.info(e.type);
		    //Ti.API.info(e["conversation-title"]);
		    //Ti.API.info(e["conversation-text"]);
		    /*
		    (function(post){
			var view = Ti.UI.createScrollView({
			    backgroundColor:color,
			    contentHeight:'auto',
			    top:0,
			    showVerticalScrollIndicator:true
			});
			var v = Ti.UI.createWebView({
			    backgroundColor:'white',
			    height:'auto'
			});
			v.html = post["conversation-title"] + '<br>' + post["conversation-text"];
			v.addEventListener('doubletap', function(e){
			    Ti.API.info('doubletaped:' + scrollView.currentPage);
			    Load.reblog(post.id, post["reblog-key"]);
			});
			view.add(v);
			scrollView.addView(view);
		    })(data[i]);
		    */
		}else if(data[i].type == "video"){
		    //Ti.API.info(e["reblog-key"]);
		    /*
		      Ti.API.info("video");
		      view = Ti.UI.createView({backgroundColor:'black'});
		      v = Ti.UI.createWebView({
		      backgroundColor:'white'
		      });
		      v.html = e["video-caption"] + '<br>' + e["video-source"] + '<br>'+ e["video-player"];
		      var f = (function(e){
		      return function(){
		      Ti.API.info('doubletaped:' + scrollView.currentPage);
		      
		      Load.reblog(e.id, e["reblog-key"]);
		      };
		      })(e);
		      v.addEventListener('doubletap', f);
		      view.add(v);
		      scrollView.addView(view);
		    */
		    
		}
	    }
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

