//Methods
function newtab(method) {
	chrome.tabs.query({ currentWindow: true, active: true }, callback);
}

function callback(tabs) {
	console.log("tabs: " + tabs);
	parent = tabs[0];
	console.log("parent: " + parent.id);
	console.log("index: " + parent.index + 1);

	props = {
		index: parent.index + 1,
		openerTabId: parent.id
	}
	chrome.tabs.create(props);
}

chrome.commands.onCommand.addListener(function(command) {
    if(command == 'newtab')
    	newtab();
});