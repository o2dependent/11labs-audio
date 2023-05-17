import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./elements/draggable-window";
import "./elements/extension-popup";
import "./elements/audio-player";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("eo-extension-content-ui")
export class ExtensionContentUI extends LitElement {
	render() {
		return html`
			<eo-draggable-window>
				<eo-audio-player></eo-audio-player>
			</eo-draggable-window>
			<eo-extension-popup></eo-extension-popup>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"eo-extension-content-ui": ExtensionContentUI;
	}
}
