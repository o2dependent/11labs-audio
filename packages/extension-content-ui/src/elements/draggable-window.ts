import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

/**
 * Draggable fixed element that will latch onto the edges of the screen after being dragged
 *
 * @slot - This element has a slot
 */
@customElement("eo-draggable-window")
export class DraggableWindow extends LitElement {
	constructor() {
		super();
		chrome?.storage?.local?.get?.("eo-window-coords", (coords) => {
			this._coords = coords.coords || {
				x: 0,
				y: window.innerHeight - this._containerHeight,
			};
		});
		document.addEventListener("mousemove", this._onMouseMove);
	}

	private _containerHeight = 120;

	@state()
	private _dragging = false;

	@state()
	private _open = false;

	@state()
	private _offsetY = 0;

	@state()
	private _coords = { x: 0, y: window.innerHeight - this._containerHeight };

	private _onMouseDown = (e: MouseEvent) => {
		const { clientY } = e;
		this._offsetY = clientY - this._coords.y;
		// set timeout in case the user is just opening the window and not dragging
		const timeout = setTimeout(() => {
			this._dragging = true;
			window.removeEventListener("mouseup", clear);
			window.addEventListener("mouseup", this._onMouseUp);
		}, 250);
		const clear = () => clearTimeout(timeout);
		window.addEventListener("mouseup", clear);
	};

	private _onMouseUp = () => {
		this._dragging = false;
		chrome?.storage?.local?.set?.({ "eo-window-coords": this._coords });
		window.removeEventListener("mouseup", this._onMouseUp);
	};

	private _onMouseMove = (e: MouseEvent) => {
		if (this._dragging) {
			let y = e.clientY - this._offsetY;
			if (y < 0) y = 0;
			if (y > window.innerHeight - this._containerHeight)
				y = window.innerHeight - this._containerHeight;
			this._coords = { x: 0, y };
		}
	};

	private _onOpen = () => {
		if (this._dragging) return;
		this._open = !this._open;
	};

	render() {
		return html`
			<div
				id="draggable-container"
				class="${this._open ? "open" : ""} ${this._dragging ? "dragging" : ""}"
				style="top: ${this._coords.y}px; right: ${this._coords.x}px;"
			>
				<button
					id="draggable-handle"
					@mouseup=${this._onOpen}
					@mousedown="${this._onMouseDown}"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15 19L8 12L15 5"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div id="draggable-content">
					<slot></slot>
				</div>
			</div>
		`;
	}

	static styles = css`
		#draggable-container {
			--bg: #212121;
			--border-color: #515151;
			--content-width: 20rem;
			--handle-width: 2rem;
			color: #fafafa;
			position: fixed;
			z-index: 999999;
			display: grid;
			justify-content: center;
			align-items: center;
			grid-template-columns: var(--handle-width) var(--content-width);
			transform: translateX(var(--content-width));
			transition: all 0.5s ease-in-out;
			filter: drop-shadow(0rem 0rem 0.125rem #00000063);
		}
		#draggable-container svg {
			transform: rotate(0deg);
			transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		#draggable-container.open,
		#draggable-container #draggable-content:focus-within {
			transform: translateX(0);
		}
		#draggable-container.open svg {
			transform: rotate(180deg);
		}
		#draggable-container.dragging {
			transition: all 0s ease-in-out;
		}
		#draggable-handle {
			height: 100%;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--bg);
			border: none;
			border-radius: 0.5rem 0 0 0.5rem;
			transition: all 0.5s ease-in-out;
			border: 1px solid var(--border-color);
			border-right: none;
			transform: translateX(1px);
		}
		.dragging #draggable-handle {
			cursor: grabbing;
		}
		#draggable-content {
			padding: 0.25rem 0.5rem;
			border: 1px solid var(--border-color);
			border-right: none;
			background-color: var(--bg);
		}
	`;
}
declare global {
	interface HTMLElementTagNameMap {
		"eo-draggable-window": DraggableWindow;
	}
}
