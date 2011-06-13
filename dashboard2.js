mainWin = Ti.UI.currentWindow;

Ti.include('load2.js');

var search = Titanium.UI.createSearchBar({
        barColor:'#000', 
        showCancel:true,
        height:43,
        top:0,
});
search.addEventListener('return', function(e){
    Ti.API.info(e.value);
    tagLoad.get(e.value);
});

mainWin.add(search);



