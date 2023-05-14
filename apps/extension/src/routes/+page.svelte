<script lang="ts">
	import { onMount } from 'svelte';

	let url: string | undefined;
	let selectedText: any;

	const getUrl = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		url = tab.url;
	};

	onMount(() => {
		chrome.storage.local.get('selectedText', (c) => {
			selectedText = c;
		});
	});
</script>

<button on:click={getUrl}>Show current url</button>
<p id="output">HELLO</p>
<p>{selectedText}</p>

{#if url}
	<div>
		Current url: {url}
	</div>
{/if}
