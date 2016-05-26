//Methods
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

chrome.commands.onCommand.addListener(function(command) {
    if(command == 'newtab')
    	newtab();
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
