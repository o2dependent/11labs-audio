import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

/**
 * Popup element that shows at the end of where a user highlights text
 * and allows them to play the text as audio.
 *
 * @slot - This element has a slot
 */
@customElement("eo-extension-popup")
export class ExtensionPopup extends LitElement {
	constructor() {
		super();
		window.addEventListener("mouseup", this._onMouseUp);
	}

	@state()
	private _open = false;

	@state()
	private _coords = { x: 0, y: 0 };

	private _onMouseUp = (e: MouseEvent) => {
		// get user selected text
		const selection = window?.getSelection()?.toString();
		if (!selection) return;
		// get mouse coords
		const { clientX, clientY } = e;
		this._coords = { x: clientX, y: clientY };
		// open popup
		this._open = true;
		// add event listeners
		window.addEventListener("click", this._windowClick);
	};

	private _windowClick = (e: MouseEvent) => {
		if (e.target === this) return;
		this._open = false;
		window.removeEventListener("click", this._windowClick);
	};

	render() {
		if (!this._open) return html``;
		return html`
			<div
				id="popup-container"
				style="top: ${this._coords.y}px; left: ${this._coords.x}px;"
			></div>
		`;
	}

	static styles = css`
		#popup-container {
			position: fixed;
			width: 10rem;
			height: 10rem;
			background-color: white;
			border-radius: 0.5rem;
		}
	`;
}
declare global {
	interface HTMLElementTagNameMap {
		"eo-extension-popup": ExtensionPopup;
	}
}
