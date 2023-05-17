import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

/**
 * Popup element that shows at the end of where a user highlights text
 * and allows them to play the text as audio.
 *
 * @slot - This element has a slot
 */
@customElement("eo-audio-player")
export class AudioPlayer extends LitElement {
	constructor() {
		super();
	}

	@state()
	private _open = false;

	@state()
	private _volume = 1;

	@state()
	private _muted = false;

	@state()
	private _playing = false;

	private _getVolumeSVG() {
		if (this._muted && this._volume <= 0) {
			return html`
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4 15H5.586L10.293 19.707C10.923 20.337 12 19.891 12 19V5.00001C12 4.10901 10.923 3.66301 10.293 4.29301L5.586 9.00001H4C3.73478 9.00001 3.48043 9.10536 3.29289 9.2929C3.10536 9.48044 3 9.73479 3 10V14C3 14.2652 3.10536 14.5196 3.29289 14.7071C3.48043 14.8946 3.73478 15 4 15Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M19 12L21 14M17 14L19 12L17 14ZM19 12L21 10L19 12ZM19 12L17 10L19 12Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			`;
		}
		return html`<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.536 8.46401C16.0004 8.92832 16.3688 9.47957 16.6202 10.0863C16.8716 10.693 17.0009 11.3433 17.0009 12C17.0009 12.6567 16.8716 13.307 16.6202 13.9137C16.3688 14.5204 16.0004 15.0717 15.536 15.536M18.364 5.63601C19.1997 6.47174 19.8627 7.46389 20.315 8.55583C20.7673 9.64777 21.0001 10.8181 21.0001 12C21.0001 13.1819 20.7673 14.3522 20.315 15.4442C19.8627 16.5361 19.1997 17.5283 18.364 18.364M5.586 15H4C3.73478 15 3.48043 14.8946 3.29289 14.7071C3.10536 14.5196 3 14.2652 3 14V10C3 9.73479 3.10536 9.48044 3.29289 9.2929C3.48043 9.10536 3.73478 9.00001 4 9.00001H5.586L10.293 4.29301C10.923 3.66301 12 4.10901 12 5.00001V19C12 19.891 10.923 20.337 10.293 19.707L5.586 15Z"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg> `;
	}

	private _getPlayPauseButton() {
		if (this._playing)
			return html`<button id="pause-track">
				<svg
					width="24"
					height="24"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
						d="M176 96h16v320h-16zM320 96h16v320h-16z"
					/>
				</svg>
			</button>`;
		else
			return html`<button id="play-track">
				<svg
					width="24"
					height="24"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"
						fill="none"
						stroke="currentColor"
						stroke-miterlimit="10"
						stroke-width="32"
					/>
				</svg>
			</button>`;
	}

	render() {
		return html`
			<div id="audio-player">
				<div id="audio-controls">
					<button id="restart-track">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.7716 11.5528C11.841 11.4139 11.9418 11.2931 12.066 11.2H12.067L17.4 7.2C17.5486 7.08857 17.7252 7.02072 17.9102 7.00404C18.0952 6.98736 18.2811 7.02252 18.4472 7.10557C18.6133 7.18863 18.753 7.31629 18.8507 7.47427C18.9483 7.63225 19 7.81429 19 8V16C19 16.1857 18.9483 16.3678 18.8507 16.5257C18.753 16.6837 18.6133 16.8114 18.4472 16.8944C18.2811 16.9775 18.0952 17.0126 17.9102 16.996C17.7252 16.9793 17.5486 16.9114 17.4 16.8L12.066 12.8C11.9418 12.7069 11.841 12.5861 11.7716 12.4472C11.7022 12.3084 11.666 12.1552 11.666 12C11.666 11.8448 11.7022 11.6916 11.7716 11.5528Z"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M3.77159 11.5528C3.84102 11.4139 3.94182 11.2931 4.06602 11.2L9.40002 7.2C9.54858 7.08857 9.72525 7.02072 9.91021 7.00404C10.0952 6.98736 10.2811 7.02252 10.4472 7.10557C10.6133 7.18863 10.753 7.31629 10.8507 7.47427C10.9483 7.63225 11 7.81429 11 8V16C11 16.1857 10.9483 16.3678 10.8507 16.5257C10.753 16.6837 10.6133 16.8114 10.4472 16.8944C10.2811 16.9775 10.0952 17.0126 9.91021 16.996C9.72525 16.9793 9.54858 16.9114 9.40002 16.8L4.06602 12.8C3.94182 12.7069 3.84102 12.5861 3.77159 12.4472C3.70216 12.3084 3.66602 12.1552 3.66602 12C3.66602 11.8448 3.70216 11.6916 3.77159 11.5528Z"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					${this._getPlayPauseButton()}
					<button id="regen-track">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>
				<div id="audio-volume">
					<button id="volume-button">${this._getVolumeSVG()}</button>
					<input type="range" id="volume-slider" />
				</div>
			</div>
		`;
	}

	static styles = css`
		#audio-player {
		}
		#audio-player button {
			background: none;
			border: none;
			cursor: pointer;
		}
		#audio-volume {
		}
		#volume-slider {
			display: none;
			position: absolute;
			bottom: 100%;
			left: 50%;
		}
		#audio-volume:focus-within #volume-slider {
			display: block;
		}
	`;
}
declare global {
	interface HTMLElementTagNameMap {
		"eo-audio-player": AudioPlayer;
	}
}
