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
		chrome?.storage?.local?.get?.("coords", (coords) => {
			this._coords = coords.coords || { x: 0, y: 0 };
		});
		document.addEventListener("mousemove", this._onMouseMove);
	}

	@state()
	private _dragging = false;

	@state()
	private _open = false;

	@state()
	private _offsetY = 0;

	@state()
	private _coords = { x: 0, y: 0 };

	private _onMouseDown = (e: MouseEvent) => {
		const { clientY } = e;
		this._offsetY = clientY - this._coords.y;
		// set timeout in case the user is just opening the window and not dragging
		const timeout = setTimeout(() => {
			this._dragging = true;
			this._coords = { x: 0, y: e.clientY };
			window.removeEventListener("mouseup", clear);
			window.addEventListener("mouseup", this._onMouseUp);
		}, 250);
		const clear = () => clearTimeout(timeout);
		window.addEventListener("mouseup", clear);
	};

	private _onMouseUp = () => {
		this._dragging = false;
		chrome.storage.local.set({ coords: this._coords });
		window.removeEventListener("mouseup", this._onMouseUp);
	};

	private _onMouseMove = (e: MouseEvent) => {
		if (this._dragging) {
			let y = e.clientY - this._offsetY;
			if (y < 0) y = 0;
			if (y > window.innerHeight - 90) y = window.innerHeight - 90;
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
				class="${this._open ? "open" : ""}"
				style="top: ${this._coords.y}px; right: ${this._coords
					.x}px; transition: all ${this._dragging ? "0s" : "0.5s"} ease-in-out;"
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
			--bg: #000;
			--content-width: 20rem;
			--handle-width: 2rem;
			position: fixed;
			z-index: 999999;
			display: grid;
			grid-template-columns: var(--handle-width) var(--content-width);
			transform: translateX(var(--content-width));
		}
		#draggable-container.open {
			transform: translateX(0);
		}
		#draggable-handle {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--bg);
			border: none;
			color: #fff;
			border-radius: 25rem 0 0 25rem;
		}
		#draggable-content {
			background-color: var(--bg);
		}
	`;
}
