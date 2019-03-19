// 引入electron并创建一个Browserwindow
const {
	app,
	BrowserWindow,
	Menu
} = require('electron');
const path = require('path');
const url = require('url');

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
const electron = require('electron')

let template = [{
	label: '编辑',
	submenu: [{
		label: '撤销',
		accelerator: 'CmdOrCtrl+Z',
		role: 'undo'
	}, {
		label: '重做',
		accelerator: 'Shift+CmdOrCtrl+Z',
		role: 'redo'
	}, {
		type: 'separator'
	}, {
		label: '剪切',
		accelerator: 'CmdOrCtrl+X',
		role: 'cut'
	}, {
		label: '复制',
		accelerator: 'CmdOrCtrl+C',
		role: 'copy'
	}, {
		label: '粘贴',
		accelerator: 'CmdOrCtrl+V',
		role: 'paste'
	}, {
		label: '全选',
		accelerator: 'CmdOrCtrl+A',
		role: 'selectall'
	}]
}, {
	label: '查看',
	submenu: [{
		label: '重载',
		accelerator: 'CmdOrCtrl+R',
		click: function (item, focusedWindow) {
			if (focusedWindow) {
				// 重载之后, 刷新并关闭所有的次要窗体
				if (focusedWindow.id === 1) {
					BrowserWindow.getAllWindows().forEach(function (win) {
						if (win.id > 1) {
							win.close()
						}
					})
				}
				focusedWindow.reload()
			}
		}
	}, {
		label: '切换全屏',
		accelerator: (function () {
			if (process.platform === 'darwin') {
				return 'Ctrl+Command+F'
			} else {
				return 'F11'
			}
		})(),
		click: function (item, focusedWindow) {
			if (focusedWindow) {
				focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
			}
		}
	}, {
		label: '切换开发者工具',
		accelerator: (function () {
			if (process.platform === 'darwin') {
				return 'Alt+Command+I'
			} else {
				return 'Ctrl+Shift+I'
			}
		})(),
		click: function (item, focusedWindow) {
			if (focusedWindow) {
				focusedWindow.toggleDevTools()
			}
		}
	}, {
		type: 'separator'
	}, {
		label: '应用程序菜单演示',
		click: function (item, focusedWindow) {
			if (focusedWindow) {
				const options = {
					type: 'info',
					title: '应用程序菜单演示',
					buttons: ['好的'],
					message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
				}
				electron.dialog.showMessageBox(focusedWindow, options, function () {})
			}
		}
	}]
}, {
	label: '窗口',
	role: 'window',
	submenu: [{
		label: '最小化',
		accelerator: 'CmdOrCtrl+M',
		role: 'minimize'
	}, {
		label: '关闭',
		accelerator: 'CmdOrCtrl+W',
		role: 'close'
	}, {
		type: 'separator'
	}, {
		label: '重新打开窗口',
		accelerator: 'CmdOrCtrl+Shift+T',
		enabled: false,
		key: 'reopenMenuItem',
		click: function () {
			app.emit('activate')
		}
	}]
}, {
	label: '帮助',
	role: 'help',
	submenu: [{
		label: '学习更多',
		click: function () {
			electron.shell.openExternal('http://electron.atom.io')
		}
	}]
}]

function addUpdateMenuItems(items, position) {
	if (process.mas) return

	const version = electron.app.getVersion()
	let updateItems = [{
		label: `Version ${version}`,
		enabled: false
	}, {
		label: '正在检查更新',
		enabled: false,
		key: 'checkingForUpdate'
	}, {
		label: '检查更新',
		visible: false,
		key: 'checkForUpdate',
		click: function () {
			require('electron').autoUpdater.checkForUpdates()
		}
	}, {
		label: '重启并安装更新',
		enabled: true,
		visible: false,
		key: 'restartToUpdate',
		click: function () {
			require('electron').autoUpdater.quitAndInstall()
		}
	}]

	items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
	const menu = Menu.getApplicationMenu()
	if (!menu) return

	let reopenMenuItem
	menu.items.forEach(function (item) {
		if (item.submenu) {
			item.submenu.items.forEach(function (item) {
				if (item.key === 'reopenMenuItem') {
					reopenMenuItem = item
				}
			})
		}
	})
	return reopenMenuItem
}

if (process.platform === 'darwin') {
	const name = electron.app.getName()
	template.unshift({
		label: name,
		submenu: [{
			label: `关于 ${name}`,
			role: 'about'
		}, {
			type: 'separator'
		}, {
			label: '服务',
			role: 'services',
			submenu: []
		}, {
			type: 'separator'
		}, {
			label: `隐藏 ${name}`,
			accelerator: 'Command+H',
			role: 'hide'
		}, {
			label: '隐藏其它',
			accelerator: 'Command+Alt+H',
			role: 'hideothers'
		}, {
			label: '显示全部',
			role: 'unhide'
		}, {
			type: 'separator'
		}, {
			label: '退出',
			accelerator: 'Command+Q',
			click: function () {
				app.quit()
			}
		}]
	})

	// 窗口菜单.
	template[3].submenu.push({
		type: 'separator'
	}, {
		label: '前置所有',
		role: 'front'
	})

	addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
	const helpMenu = template[template.length - 1].submenu
	addUpdateMenuItems(helpMenu, 0)
}


function createWindow() {
	//创建浏览器窗口
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		// transparent: true,
		// frame: false,
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInWorker: false
		}
	});
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu);

	// build
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, './build/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// 加载应用中的index.html文件
	// mainWindow.loadURL('http://localhost:3010/');
	// mainWindow.loadFile('./build/index.html/');
	// mainWindow.webContents.openDevTools();

	// 关闭window时触发下列事件.
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

app.on('activate', function () {
	// macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
	if (mainWindow === null) {
		createWindow();
	}
});

app.on('browser-window-created', function () {
	let reopenMenuItem = findReopenMenuItem()
	if (reopenMenuItem) reopenMenuItem.enabled = false
})

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
	// macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
	if (process.platform !== 'darwin') {
		app.quit();
	}
	let reopenMenuItem = findReopenMenuItem()
	if (reopenMenuItem) reopenMenuItem.enabled = true
});