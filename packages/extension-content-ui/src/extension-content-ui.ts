import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./elements/draggable-window";

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
				<slot></slot>
			</eo-draggable-window>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"eo-extension-content-ui": ExtensionContentUI;
	}
}
