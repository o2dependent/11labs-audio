// require('extension-content-ui');

// document.body.appendChild(document.createElement('extension-content-ui'));

// // get the audio
// let serverUrl = 'http://127.0.0.1:5000';
// const getAudio = (text) => {
// 	// add Access-Control-Allow-Origin' header to the response
// 	fetch(`${serverUrl}/api/audio`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			text
// 		})
// 	})
// 		.then((response) => response.blob())
// 		.then((blob) => {
// 			// Create a new <audio> element
// 			const audioElement = document.createElement('audio');

// 			// Create a URL object from the blob
// 			const audioURL = URL.createObjectURL(blob);

// 			// Set the audio source to the URL
// 			audioElement.src = audioURL;

// 			// Append the audio element to the document body or any desired container
// 			document.body.appendChild(audioElement);

// 			// add play button
// 			const playButton = document.createElement('button');
// 			playButton.innerText = 'Play';
// 			playButton.style.position = 'fixed';
// 			playButton.style.bottom = '1rem';
// 			playButton.style.right = '1rem';
// 			playButton.addEventListener('click', () => {
// 				const isPaused = audioElement.paused;
// 				playButton.style.innerText = isPaused ? 'Play' : 'Pause';
// 				if (!isPaused) {
// 					audioElement.pause();
// 				} else {
// 					audioElement.play();
// 				}
// 			});
// 			document.body.appendChild(playButton);
// 		})
// 		.catch((error) => {
// 			console.error('Error:', error);
// 		});
// };

// // Listen for mouseup event on the page
// document.addEventListener('mouseup', handleMouseUp);

// // create a floating popup at the location passed into the function with a button inside that will call the getAudio function and close itself
// let getAudioButton;
// let popup;
// const createPopup = (x, y, text) => {
// 	popup = document.createElement('div');
// 	popup.style.position = 'fixed';
// 	popup.style.top = `1rem`;
// 	popup.style.right = `1rem`;
// 	popup.style.width = '200px';
// 	popup.style.height = '200px';
// 	popup.style.backgroundColor = 'white';
// 	popup.style.border = '1px solid black';
// 	popup.style.zIndex = '9';
// 	popup.style.padding = '1rem';
// 	popup.style.overflow = 'scroll';
// 	popup.style.fontSize = '1rem';
// 	popup.style.fontFamily = 'sans-serif';
// 	popup.style.color = 'black';
// 	popup.style.textAlign = 'center';
// 	popup.style.boxShadow = '0 0 10px 0 rgba(0,0,0,0.5)';
// 	popup.style.borderRadius = '5px';
// 	popup.style.display = 'flex';
// 	popup.style.flexDirection = 'column';
// 	popup.style.justifyContent = 'center';
// 	popup.style.alignItems = 'center';
// 	popup.style.textAlign = 'center';
// 	popup.style.lineHeight = '1.5rem';
// 	popup.style.cursor = 'pointer';
// 	popup.style.userSelect = 'none';

// 	const popupText = document.createElement('div');
// 	popupText.innerText = 'Get Audio';
// 	if (getAudioButton) {
// 		getAudioButton.remove();
// 	}
// 	getAudioButton = document.createElement('button');
// 	getAudioButton.innerText = 'Get Audio';
// 	getAudioButton.addEventListener('click', () => {
// 		getAudio(text);
// 		popup.remove();
// 	});

// 	popup.appendChild(popupText);
// 	popup.appendChild(getAudioButton);

// 	document.body.appendChild(popup);

// 	const removePopupOnScrollHandler = () => {
// 		popup.remove();
// 		document.removeEventListener('scroll', removePopupOnScrollHandler);
// 	};

// 	document.addEventListener('scroll', removePopupOnScrollHandler);

// 	const clickOutsidePopupHandler = (event) => {
// 		if (!popup.contains(event.target)) {
// 			popup.remove();
// 			document.removeEventListener('click', clickOutsidePopupHandler);
// 		}
// 	};

// 	setTimeout(() => document.addEventListener('click', clickOutsidePopupHandler), 100);
// };

// // Handle user selection and only allow mouse up to fire if the user has selected text
// let selectedText = '';
// document.addEventListener('selectionchange', () => {
// 	selectedText = window.getSelection().toString().trim();
// });

// // Handle the mouseup event
// function handleMouseUp(event) {
// 	// do not create popup if the user mouse is in the popup or the getAudioButton
// 	if (
// 		!selectedText ||
// 		(popup && (popup.contains(event.target) || getAudioButton.contains(event.target)))
// 	) {
// 		return;
// 	}

// 	// Save the selected text using a method of your choice
// 	saveSelectedText(selectedText);

// 	// get x and y of mouse position
// 	const x = event.clientX;
// 	const y = event.clientY;

// 	// create a popup at the mouse position
// 	createPopup(x, y, selectedText);
// }

// // Save the selected text
// function saveSelectedText(selectedText) {
// 	// You can send the selected text to your background script using chrome.runtime.sendMessage()
// 	chrome.runtime.sendMessage({ action: 'saveSelectedText', data: selectedText });
// }

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// 	if (message.action === 'saveSelectedText') {
// 		const selectedText = message.data;
// 		// You can save the selected text to a storage (e.g., chrome.storage.local) or send it to your server
// 		chrome.storage.local.set({ selectedText });
// 	}
// });
