mainWin = Ti.UI.currentWindow;

Ti.include('load2.js');

function wait(a,func){
    if(a.length > 0){
	func();
    }else{
	var f = function(){wait(a,func)};
	setTimeout(f,100);
    }
};

var list = []
list = tagLoad.get();

wait(list, function(){
    for(var i = 0; i < 10; i++){
	Ti.API.info(list[i]);
    }
});



