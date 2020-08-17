const {app, BrowserWindow, Menu} = require('electron');
let win;

function createMenu() {
    let menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New game',
                    click: async() => {
                        win.reload();
                    }
                },
                { role: 'quit' }
            ]
        }
    ];
    let menuItems = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menuItems);
}

function main() {
    win = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false,
    });

    win.loadFile('index.html');
}

app.on('ready', () => {
    createMenu();
    main();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows() === 0) {
        main();
    }
});
