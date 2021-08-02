const {app,Menu,MenuItem,BrowserWindow} = require('electron');
const path = require('path');

function createWindow(){
    let win = new BrowserWindow({
        width:400,
        height:300,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
            contextIsolation: true, //←このコードを追加する。
            preload: path.join(__dirname, 'preload.js') //←このコードを追加する。
        }
    });
    win.loadFile('index.html');
}

function createMenu () {
    let menu_temp = [
        {
            label:'File',
            submenu:[
                {label:'New', click:()=>{
                    console.log('New menu');
                    createWindow();
                }},
                {
                    label:'File', click:()=>{
                        console.log('File menu');
                        createWindow();
                    },
                },
                {role:'close'},
                {type:'separator'},
                {role:'quit'}
            ]
        },
        {role:'editMenu'},
        {role:'viewMenu'},
        {role:'windowMenu'},
        {label:'Help',submenu:[
            {role:'about'},
            {type:'separator'},
            {role:'reload'},
            {role:'zoomIn'},
            {role:'zoomOut'}
        ]}
    ];
    let menu = Menu.buildFromTemplate(menu_temp);
    Menu.setApplicationMenu(menu);
}

createMenu();
app.whenReady().then(createWindow);


