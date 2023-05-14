// chrome.tabs.executeScript(
// 	{
// 		code: 'document.addEventListener("selectionchange", () => console.log(window.getSelection().toString()));'
// 	},
// 	function (selection) {
// 		console.log({ selection });
// 		document?.getElementById?.('output')?.value = selection?.[0];
// 	}
// );
// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
// 	const tabId = tabs[0].id;

// 	chrome.scripting.executeScript({
// 		target: { tabId: tabId },
// 		files: ['contentScript.js']
// 	});
// });
