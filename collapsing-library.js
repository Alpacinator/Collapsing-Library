(async function() {
	// Define color variables
	const HOVER_FOLDER_INDICATOR_COLOR = 'yellow';
	const EXPAND_FOLDER_INDICATOR_COLOR = 'white';
	const COLLAPSE_FOLDER_INDICATOR_COLOR = 'green';

	console.log("Script started: Waiting for Spicetify.React and Spicetify.ReactDOM");

	while (!Spicetify.React || !Spicetify.ReactDOM) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}

	console.log("Spicetify.React and ReactDOM loaded");

	var collapsingDlibrary = (() => {
		// src/app.tsx
		async function main() {
			console.log("Main function started: Waiting for Spicetify.showNotification");

			while (!(Spicetify?.showNotification)) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}

			console.log("Spicetify.showNotification available, injecting styles");

			// Add styles
			const style = document.createElement("style");
			style.type = "text/css";
			const css = `
				.cRPTAY {
					position: absolute;
					z-index: 300;
					inset: 0px;
					cursor: pointer;
					background-color: transparent;
					border: none;
					width: 100%;
				}
				
				/* hide the buttons that go into folders, leave those for playlistst alone*/
				
				div[role="button"][aria-labelledby^="listrow-title-spotify:user:"] {
					display: none !important;
				}
				
				.HeaderArea {
					position: relative !important;
					width: 100% !important;
					height: 100% !important;
				}

				.jpzxju {
					position: absolute !important;
					z-index: 20 !important;
					width: 100% !important;
					height: 100% !important;
				}
				.Button-buttonTertiary-small-iconOnly-useBrowserDefaultFocusStyle-condensedAll {
					position: absolute !important;
					z-index: 100 !important;
					width: 100% !important;
					height: 100% !important;
					padding-block: 0px !important;
					padding-inline: 0px !important;
				}
				
				/*fix padding and placing for the 'now playing' icon*/
				.jpzxju span{
					position: absolute;
					display: block;
					left: 0px;
					padding: 0px !important;
				}
				
				/* move all titles to the right by adding some padding, for the now playing icon*/
				p[data-encore-id="listRowTitle"] > span {
					padding-left: 20px !important;
				}
				
				.expand-button, .collapse-button{
					width: 100% !important;
					height: 100% !important;
				}
				
				/* hide the arrows from the folders in the library*/
				button[data-encore-id="buttonTertiary"][aria-label="Expand folder"] svg, button[data-encore-id="buttonTertiary"][aria-label="Collapse folder"] svg {
					display: none;
				}
				
				/* hide the sort and view selection in the library*/
				button[aria-controls="sort-and-view-picker"], button[aria-label="fullscreen library"] {
					display: none;
				}
				
				/* Add the new folder indicators */
				button.collapse-button::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 10px;
					width: 5px;
					opacity: 100 !important;
					height: 50% !important;
					background-color: ${COLLAPSE_FOLDER_INDICATOR_COLOR};
					border-radius: 5px;
					transform: translateY(-50%);
				}
				
				button.expand-button::before {
					content: ''; 
					position: absolute;
					top: 50%;
					left: 10px;
					width: 5px;
					opacity: 100%;
					height: 50%;
					background-color: ${EXPAND_FOLDER_INDICATOR_COLOR};
					border-radius: 5px;
					transform: translateY(-50%);
				}
				
				.main-yourLibraryX-libraryFilter, .main-yourLibraryX-filterArea, .dzzX3EujtAPhmLCH_P4S{
					display: none !important;
				}
			`;

			if (style.styleSheet) {
				style.styleSheet.cssText = css;
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			document.head.appendChild(style);
			console.log("Styles injected");

			// Function to update button borders
			const updateFolderIndicators = () => {
				console.log("Updating folder indicators...");

				const collapseButtons = document.querySelectorAll('button[aria-label="Collapse folder"]');
				const expandButtons = document.querySelectorAll('button[aria-label="Expand folder"]');

				console.log(`Found ${collapseButtons.length} collapse buttons and ${expandButtons.length} expand buttons`);

				collapseButtons.forEach(button => {
					button.classList.add('collapse-button');
				});

				expandButtons.forEach(button => {
					button.classList.add('expand-button');
				});
			};
			
			// set library to custom and compact mode and refresh if we updated something
			let shouldRefresh = false;

			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);

				// Handle the sort order filter ID key
				if (key.endsWith(':ylx-active-sort-order-by-filter-id')) {
					const currentValue = localStorage.getItem(key);
					const targetValue = JSON.stringify({"2":"4","undefined":"2"});

					if (currentValue !== targetValue) {
						console.log(`Updating ${key}:`);
						console.log(`Old value:`, currentValue);
						console.log(`New value:`, targetValue);
						localStorage.setItem(key, targetValue);
						shouldRefresh = true;
					}
				}

				// Handle the items-view key
				if (key.endsWith(':items-view')) {
					const currentValue = localStorage.getItem(key);
					const targetValue = "2";

					if (currentValue !== targetValue) {
						console.log(`Updating ${key}:`);
						console.log(`Old value:`, currentValue);
						console.log(`New value:`, targetValue);
						localStorage.setItem(key, targetValue);
						shouldRefresh = true;
					}
				}
			}

			if (shouldRefresh) {
				console.log("Values updated — refreshing the page...");
				location.reload();
			} else {
				console.log("No changes needed — values already correct.");
			}


			// Initial update
			updateFolderIndicators();

			// Create a MutationObserver
			const observer = new MutationObserver((mutationsList) => {
				let shouldUpdate = false;

				mutationsList.forEach((mutation) => {
					if (mutation.type === 'childList') {
						shouldUpdate = true;
					}
				});

				if (shouldUpdate) {
					console.log("DOM changed, updating indicators again");
					updateFolderIndicators();
				}
			});

			const config = { childList: true, subtree: true };
			observer.observe(document.body, config);

			console.log("MutationObserver is observing DOM changes");
		}

		var app_default = main;

		(async () => {
			await app_default();
		})();
	})();
})();
