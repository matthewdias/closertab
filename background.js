//Methods
function highlight(dir) {
	chrome.tabs.query({ currentWindow: true, highlighted: true }, function(tabs) {
		var highlights = [];
		var target;
		if(dir === 'left') {
			target = tabs[0].index - 1
		}
		else {
			target = tabs[Object.keys(tabs)[Object.keys(tabs).length - 1]].index + 1
		}
		highlights.push(target)

		for(key in tabs) {
			tab = tabs[key]
			highlights.push(tab.index)
			// console.log(highlights)
		}
		// console.log(highlights)
		chrome.tabs.highlight({tabs: highlights})
	});
}

function newtab(method) {
	chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
		chrome.tabs.create(closerTab(tab));
	});
}

function closerTab(tabs, url) {
	tab = tabs[0];
	// console.log("id: " + tab.id);
	// console.log("index: " + tab.index + 1);

	return {
		index: tab.index + 1,
		openerTabId: tab.id,
		url: url
	}
}

function closerOpen(info, tabs) {
	chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
		chrome.tabs.create(closerTab(tabs, info.linkUrl));
	});
}

function openHere(info, tabs) {
	chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
		chrome.tabs.update(tabs[0].id, { url: info.linkUrl });
	});
}

function popTabs() {
	var pops = [];
	chrome.tabs.query({ currentWindow: true, highlighted: true }, function(tabs) {
		for(key in tabs) {
			tab = tabs[key]
			pops.push(tab.id)
		}
		console.log(pops)
	});
	chrome.windows.create({}, function (window) {
		chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
			chrome.tabs.remove(tabs[0].id);
		});
		chrome.tabs.move(pops, { windowId: window.id, index: 0 });
	});
}

chrome.commands.onCommand.addListener(function(command) {
	if(command == 'highlight-left')
    	highlight('left');
    if(command == 'highlight-right')
    	highlight('right');
    if(command == 'newtab')
    	newtab();
    if(command == 'poptabs')
    	popTabs();
});

chrome.contextMenus.create({
		"id": "closeropen",
		"title": "Open Link in Adjacent New Tab",
		"contexts": ['link'],
		"onclick": closerOpen
	},
	function() {
		// console.log('context created')
	}
);

chrome.contextMenus.create({
		"id": "openhere",
		"title": "Open Link in Current Tab",
		"contexts": ['link'],
		"onclick": openHere
	},
	function() {
		// console.log('context created')
	}
);
