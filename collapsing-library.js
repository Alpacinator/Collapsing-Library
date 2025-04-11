(async function() {
	// Define color variables
	const HOVER_FOLDER_INDICATOR_COLOR = 'yellow';
	
	const EXPAND_FOLDER_INDICATOR_COLOR = 'white';
	const COLLAPSE_FOLDER_INDICATOR_COLOR = 'green';
	
	while (!Spicetify.React || !Spicetify.ReactDOM) {
		await new Promise(resolve => setTimeout(resolve, 10));
	}
	var collapsingDlibrary = (() => {
		// src/app.tsx
		async function main() {
			while (!(Spicetify == null ? void 0 : Spicetify.showNotification)) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}

			// Add styles
			var style = document.createElement("style");
			style.type = "text/css";
			var css = `
				li .Box__BoxComponent-sc-y4nds-0{
					position: relative;
					z-index: 10;
					width: max-content !important;
				}

				li .Box__BoxComponent-sc-y4nds-0 .RowButton-sc-xxkq4e-0{
					width: max-content;
					position: absolute;	
					z-index: 20;
				}

				li .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button {
					position: absolute;
					left: 0px;
					width: max-content;
					height: 100%;
					z-index: 30;
					transform: scale(1) !important;
					border: none !important;
					opacity: 100 !important;
				}

				li .BRX6aJUAuAsvHKD_fpbo .HeaderArea .Areas__InteractiveArea-sc-8gfrea-0 button .IconWrapper__Wrapper-sc-16usrgb-0{
					display: none;
				}

				button.collapse-button::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 0px;
					width: 5px;
					opacity: 100 !important;
					height: 50%;
					background-color: ${COLLAPSE_FOLDER_INDICATOR_COLOR};
					border-radius: 5px;
					transform: translateY(-50%);
				}

				button.expand-button::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 0px;
					width: 5px;
					opacity: 100%;
					height: 50%;
					background-color: ${EXPAND_FOLDER_INDICATOR_COLOR};
					border-radius: 5px;
					transform: translateY(-50%);
				}
			`;
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}
			document.head.appendChild(style);

			// Function to hide SVG icons in the library
			const hideSVGIcons = () => {
				const svgs = document.querySelectorAll('ul[aria-label="Your Library"] .Svg-img-icon-small');
				svgs.forEach(svg => {
					svg.style.display = 'none';  // Hide each SVG by setting display to 'none'
				});
			};

			// Function to update button borders
			const updateFolderIndicators = () => {
				const collapseButtons = document.querySelectorAll('button[aria-label="Collapse folder"]');
				const expandButtons = document.querySelectorAll('button[aria-label="Expand folder"]');
				
				// Add classes to buttons to target the ::before pseudo-element
				collapseButtons.forEach(button => {
					button.classList.add('collapse-button'); // Add class for collapse button
				});

				expandButtons.forEach(button => {
					button.classList.add('expand-button'); // Add class for expand button
				});
			};

			// Call hideSVGIcons and updateFolderIndicators when the page loads
			hideSVGIcons();
			updateFolderIndicators();

			// Create a MutationObserver to watch for changes in the page and execute hideSVGIcons & updateFolderIndicators on each update
			const observer = new MutationObserver((mutationsList) => {
				mutationsList.forEach((mutation) => {
					// Check if any added or removed nodes are relevant to our use case
					if (mutation.type === 'childList') {
						// Call hideSVGIcons and updateFolderIndicators on updates in the library
						hideSVGIcons();
						updateFolderIndicators();
					}
				});
			});

			// Observe changes in the body of the page (or a specific container if necessary)
			const config = { childList: true, subtree: true };
			observer.observe(document.body, config);
		}

		var app_default = main;

		// Execute the function
		(async () => {
			await app_default();
		})();
	})();
})();
