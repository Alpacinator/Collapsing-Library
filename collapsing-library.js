(async function () {
	// Define color variables
	const HOVER_FOLDER_INDICATOR_COLOR = 'yellow';
	const EXPAND_FOLDER_INDICATOR_COLOR = 'white';
	const COLLAPSE_FOLDER_INDICATOR_COLOR = 'green';

	console.log("Script started: Waiting for Spicetify.React and Spicetify.ReactDOM");

	while (!Spicetify.React || !Spicetify.ReactDOM) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}

	console.log("Spicetify.React and ReactDOM loaded");

	(() => {
		async function main() {
			console.log("Main function started: Waiting for Spicetify.showNotification");

			while (!Spicetify?.showNotification) {
				await new Promise(resolve => setTimeout(resolve, 100));
			}

			console.log("Spicetify.showNotification available, injecting styles");

			// =========================
			// Inject styles
			// =========================
			const style = document.createElement("style");
			style.textContent = `
				div[role="button"][aria-labelledby^="listrow-title-spotify:user:"] {
					display: none !important;
				}

				.HeaderArea {
					position: relative !important;
					width: 100% !important;
					height: 100% !important;
				}
				
				/* Hide elements from Your Library header */
				.main-yourLibraryX-headerContent > div:not(.main-yourLibraryX-collapseButton):not(.sk3cJK5EGQYAniRpE6Iz) {
					display: none;
				}
				
				.main-yourLibraryX-collapseButton h1 {
					display: none;
				}
				
				/* Make the collapse library button always visible */
				.main-yourLibraryX-collapseButton button {
					transform: translateX(0) !important;
					opacity: 1 !important;
					transition: none !important;
				}

				.main-yourLibraryX-collapseButton button > span {
					transform: translateX(0) !important;
					opacity: 1 !important;
					transition: none !important;
				}
				
				/* Correcting Your episodes pin */
				div.HeaderSideArea {
					grid-column: 1;
					gap: var(--encore-spacing-base, 16px);
					display: flex;
					left: 15px;
					position: relative;
				}
				
				div[data-encore-id="listRow"][aria-labelledby="listrow-title-spotify:collection:your-episodes"] {
					margin-left:4px;
					gap: 0px;
					padding-left: 0px;
					left: -10px;
				}
				
				.Button-buttonTertiary-small-iconOnly-useBrowserDefaultFocusStyle-condensedAll {
					position: absolute !important;
					z-index: 100 !important;
					width: 100% !important;
					height: 100% !important;
					padding: 0 !important;
				}

				p[data-encore-id="listRowTitle"] > span {
					padding-left: 20px !important;
				}

				button[data-encore-id="buttonTertiary"][aria-label="Expand folder"] svg,
				button[data-encore-id="buttonTertiary"][aria-label="Collapse folder"] svg {
					display: none !important;
				}

				.expand-button,
				.collapse-button {
					position: absolute !important;
					inset: 0;
					z-index: 1;
				}

				button.expand-button::before,
				button.collapse-button::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 6px;
					width: 5px;
					height: 50%;
					transform: translateY(-50%);
					border-radius: 5px;
				}

				button.expand-button::before {
					background: ${EXPAND_FOLDER_INDICATOR_COLOR};
				}

				button.collapse-button::before {
					background: ${COLLAPSE_FOLDER_INDICATOR_COLOR};
				}
			`;
			document.head.appendChild(style);

			// =========================
			// Ensure library view settings
			// =========================
			let shouldRefresh = false;

			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);

				if (key.endsWith(':ylx-active-sort-order-by-filter-id')) {
					const target = JSON.stringify({ "2": "4", "undefined": "2" });
					if (localStorage.getItem(key) !== target) {
						localStorage.setItem(key, target);
						shouldRefresh = true;
					}
				}

				if (key.endsWith(':items-view')) {
					if (localStorage.getItem(key) !== "2") {
						localStorage.setItem(key, "2");
						shouldRefresh = true;
					}
				}
			}

			if (shouldRefresh) {
				location.reload();
				return;
			}
			
			// =========================
			// Move library control div into header
			// =========================
			const moveLibraryDiv = () => {
				const source = document.querySelector('div.sk3cJK5EGQYAniRpE6Iz');
				const target = document.querySelector('div.main-yourLibraryX-headerContent');

				if (!source || !target) return;
				if (source.parentElement === target) return;

				target.appendChild(source);
			};

			moveLibraryDiv();

			const moveObserver = new MutationObserver(() => {
				moveLibraryDiv();
			});

			moveObserver.observe(document.body, {
				childList: true,
				subtree: true
			});

			// =========================
			// Folder indicator logic - Simple polling approach
			// =========================
			
			const updateFolderIndicators = () => {
				const collapseButtons = document.querySelectorAll('button[aria-label="Collapse folder"]');
				const expandButtons = document.querySelectorAll('button[aria-label="Expand folder"]');

				// Remove both classes from all buttons first
				document.querySelectorAll('.collapse-button, .expand-button').forEach(button => {
					button.classList.remove('collapse-button', 'expand-button');
				});

				// Then add the appropriate class
				collapseButtons.forEach(button => {
					button.classList.add('collapse-button');
				});

				expandButtons.forEach(button => {
					button.classList.add('expand-button');
				});
			};

			// Initial update
			updateFolderIndicators();

			// Simple polling every 500ms
			setInterval(updateFolderIndicators, 500);

			console.log("Folder indicator polling active");
		}

		main();
	})();
})();
