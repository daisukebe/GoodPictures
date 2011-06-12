Titanium.UI.setBackgroundColor('#000');

var tabg = Ti.UI.createTabGroup();

var win1 = Ti.UI.createWindow({  
    backgroundColor:'#fff',
    //url:'dashboard.js'
});
var tab1 = Ti.UI.createTab({
    title: 'tab1',
    window: win1
})

var win2 = Ti.UI.createWindow({
    backgroundColor:'#fff',
    url:'dashboard2.js'
})
var tab2 = Ti.UI.createTab({
    title: 'Tab2',
    window: win2
})

tabg.addTab(tab1);
tabg.addTab(tab2);
tabg.open();
//win1.open();