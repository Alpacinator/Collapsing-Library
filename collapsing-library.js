(async function () {

	// =========================
	// Configuration
	// Tweak these values to change the addon's default behavior.
	// Color values accept any valid CSS color string (hex, rgb, named, etc.)
	// =========================
	const CONFIG = {
		// Default color of the indicator bar on collapsed (expandable) folders
		expandIndicatorColor:  '#ffffff',
		// Default color of the indicator bar on expanded (collapsible) folders
		collapseIndicatorColor: '#008000',
		// How often (ms) to scan for new folder buttons and update their classes
		folderPollInterval: 500,
		// The CSS selector for the topbar action buttons row where our button is injected
		topbarButtonsSelector: '.main-topBar-topbarContentRight .YaU17q8G6eTc2eoKRwnL',
		// Default thickness of the folder indicator bars in pixels
		expandIndicatorWidth: 5,
	};

	// =========================
	// localStorage keys
	// All keys used by this addon are defined here to avoid magic strings
	// scattered throughout the code.
	// =========================
	const KEYS = {
		enforceLibraryView: 'spicetify-addon:enforce-library-view',
		expandColor:        'spicetify-addon:expand-color',
		collapseColor:      'spicetify-addon:collapse-color',
		indicatorWidth:     'spicetify-addon:indicator-width',
	};

	// =========================
	// Logging
	// All console output goes through these helpers so you can easily
	// swap in a different logging strategy (e.g. on-screen toast, log levels,
	// prefix changes) without touching the rest of the code.
	// =========================
	const log = {
		prefix: '[COL-LIB]',
		info:  function(...args) { console.log(  this.prefix, ...args); },
		warn:  function(...args) { console.warn( this.prefix, ...args); },
		error: function(...args) { console.error(this.prefix, ...args); },
	};

	// =========================
	// Boot: wait for Spicetify globals
	// Spicetify injects React/ReactDOM asynchronously after the page loads.
	// We poll until they're available before doing anything React-related.
	// =========================
	log.info('Waiting for Spicetify.React and Spicetify.ReactDOM...');
	while (!Spicetify.React || !Spicetify.ReactDOM) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}
	log.info('Spicetify.React and ReactDOM ready.');

	(() => {
		const { React, ReactDOM } = Spicetify;

		// =========================
		// Settings helpers
		// Thin wrappers around localStorage that handle JSON serialization
		// and provide a safe fallback when a key has never been set.
		// =========================
		const getSetting = (key, defaultValue) => {
			const stored = localStorage.getItem(key);
			if (stored === null) return defaultValue;
			try { return JSON.parse(stored); } catch { return defaultValue; }
		};

		const setSetting = (key, value) => {
			localStorage.setItem(key, JSON.stringify(value));
		};

		// =========================
		// Dynamic style tag
		// Rather than re-injecting the entire base stylesheet when settings change,
		// we maintain a single dedicated <style> element whose content is replaced
		// whenever a color or width value changes. The !important rules here win
		// over the base stylesheet which sets the same pseudo-element properties.
		// =========================
		let colorStyleEl = null;

		const applyStyles = (expandColor, collapseColor, width) => {
			if (!colorStyleEl) {
				colorStyleEl = document.createElement('style');
				colorStyleEl.id = 'library-addon-colors';
				document.head.appendChild(colorStyleEl);
				log.info('Dynamic style element created.');
			}
			colorStyleEl.textContent = `
				button.expand-button::before   { background: ${expandColor}   !important; width: ${width}px !important; }
				button.collapse-button::before { background: ${collapseColor} !important; width: ${width}px !important; }
			`;
		};

		// =========================
		// SettingsPanel component
		// A draggable floating panel rendered via Spicetify's bundled React.
		// It is mounted into a plain <div> appended to document.body (see
		// openPanel / closePanel below) rather than into Spotify's own React
		// tree, so it won't interfere with Spotify's rendering.
		//
		// Props:
		//   onClose   , callback that unmounts the panel
		//   anchorRect, DOMRect of the topbar button, used to position the
		//                panel just below it on first render
		// =========================
		const SettingsPanel = ({ onClose, anchorRect }) => {

			// Read persisted values (or fall back to CONFIG defaults) as initial state
			const [enforceView,    setEnforceView]   = React.useState(getSetting(KEYS.enforceLibraryView, false));
			const [expandColor,    setExpandColor]   = React.useState(getSetting(KEYS.expandColor,        CONFIG.expandIndicatorColor));
			const [collapseColor,  setCollapseColor] = React.useState(getSetting(KEYS.collapseColor,      CONFIG.collapseIndicatorColor));
			const [indicatorWidth, setIndicatorWidth] = React.useState(getSetting(KEYS.indicatorWidth,    CONFIG.expandIndicatorWidth));

			// Live-update the dynamic style tag whenever any visual setting changes
			React.useEffect(() => {
				applyStyles(expandColor, collapseColor, indicatorWidth);
			}, [expandColor, collapseColor, indicatorWidth]);

			// -- Drag logic --
			// We store drag start coords in a ref (not state) because updating
			// them during a mousemove would cause unnecessary re-renders.
			const dragState = React.useRef(null);
			const [pos, setPos] = React.useState(() => ({
				// Try to open just below the topbar button; clamp to viewport
				x: anchorRect
					? Math.min(anchorRect.left - 260, window.innerWidth - 320)
					: window.innerWidth - 340,
				y: anchorRect ? anchorRect.bottom + 8 : 60,
			}));

			// Called when the user presses the mouse button on the drag handle (header bar)
			const onMouseDown = (e) => {
				// Don't start a drag if the user clicked the close button inside the header
				if (e.target.closest('button')) return;
				e.preventDefault();
				dragState.current = {
					startX: e.clientX - pos.x,
					startY: e.clientY - pos.y,
				};

				const onMouseMove = (e) => {
					if (!dragState.current) return;
					setPos({
						// Clamp so the panel can't be dragged fully off-screen
						x: Math.max(0, Math.min(window.innerWidth  - 320, e.clientX - dragState.current.startX)),
						y: Math.max(0, Math.min(window.innerHeight - 120, e.clientY - dragState.current.startY)),
					});
				};

				const onMouseUp = () => {
					dragState.current = null;
					window.removeEventListener('mousemove', onMouseMove);
					window.removeEventListener('mouseup',   onMouseUp);
				};

				// Attach to window so the drag keeps working even if the cursor
				// leaves the panel header during fast movement
				window.addEventListener('mousemove', onMouseMove);
				window.addEventListener('mouseup',   onMouseUp);
			};

			// -- Toggle / input handlers --
			const toggleEnforce = () => {
				const next = !enforceView;
				setEnforceView(next);
				setSetting(KEYS.enforceLibraryView, next);
				log.info('Enforce library view:', next);
			};

			const handleExpandColor = (e) => {
				setExpandColor(e.target.value);
				setSetting(KEYS.expandColor, e.target.value);
			};

			const handleCollapseColor = (e) => {
				setCollapseColor(e.target.value);
				setSetting(KEYS.collapseColor, e.target.value);
			};

			const handleIndicatorWidth = (e) => {
				// Clamp between 1–20 so users can't enter nonsensical values.
				// The || 1 fallback handles the brief moment the field is empty while typing.
				const val = Math.min(20, Math.max(1, parseInt(e.target.value) || 1));
				setIndicatorWidth(val);
				setSetting(KEYS.indicatorWidth, val);
				log.info('Indicator width set to:', val);
			};

			// -- Inline styles --
			// Kept inline so this file remains self-contained (no external CSS).
			// Group them here rather than inline on each element for readability.
			const styles = {
				panel: {
					position: 'fixed', left: pos.x, top: pos.y,
					width: '300px',
					background: 'rgba(30,30,30,0.88)',
					backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
					borderRadius: '10px',
					border: '1px solid rgba(255,255,255,0.08)',
					boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
					zIndex: 9999, color: '#fff',
					fontFamily: 'var(--font-family, CircularSp, sans-serif)',
					overflow: 'hidden', userSelect: 'none',
				},
				header: {
					display: 'flex', justifyContent: 'space-between', alignItems: 'center',
					padding: '10px 14px',
					background: 'rgba(255,255,255,0.06)',
					cursor: 'grab',
					borderBottom: '1px solid rgba(255,255,255,0.07)',
				},
				title: {
					fontSize: '13px', fontWeight: '700',
					letterSpacing: '0.04em', color: 'rgba(255,255,255,0.85)', margin: 0,
				},
				closeBtn: {
					background: 'none', border: 'none',
					color: 'rgba(255,255,255,0.4)',
					fontSize: '16px', cursor: 'pointer',
					lineHeight: 1, padding: '2px 4px', borderRadius: '4px',
				},
				body: {
					padding: '10px 14px 14px',
					display: 'flex', flexDirection: 'column', gap: '8px',
				},
				sectionLabel: {
					fontSize: '10px', fontWeight: '700',
					letterSpacing: '0.08em', textTransform: 'uppercase',
					color: 'rgba(255,255,255,0.3)', padding: '4px 2px 0',
				},
				row: {
					display: 'flex', justifyContent: 'space-between', alignItems: 'center',
					padding: '8px 10px',
					background: 'rgba(255,255,255,0.05)',
					borderRadius: '7px', gap: '12px',
				},
				labelGroup: {
					display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0,
				},
				label: { fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' },
				desc:  { fontSize: '11px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
				// Toggle pill, accepts the current boolean state so the color is dynamic
				pill: (on) => ({
					position: 'relative', width: '36px', height: '20px',
					background: on ? '#1db954' : 'rgba(255,255,255,0.15)',
					borderRadius: '10px', cursor: 'pointer',
					transition: 'background 0.2s', border: 'none', flexShrink: 0,
				}),
				// Toggle thumb, slides left/right based on state
				thumb: (on) => ({
					position: 'absolute', top: '3px', left: on ? '19px' : '3px',
					width: '14px', height: '14px', background: '#fff',
					borderRadius: '50%', transition: 'left 0.2s', pointerEvents: 'none',
				}),
				// Colored square that acts as the visible face of the <input type="color">
				swatch: (color) => ({
					width: '28px', height: '28px', borderRadius: '6px',
					border: '2px solid rgba(255,255,255,0.15)',
					background: color, cursor: 'pointer',
					position: 'relative', flexShrink: 0, overflow: 'hidden',
				}),
				// The native color input is stretched over the swatch and made invisible;
				// clicking the swatch therefore opens the OS color picker
				colorInput: {
					position: 'absolute', inset: 0, opacity: 0,
					width: '100%', height: '100%',
					cursor: 'pointer', padding: 0, border: 'none',
				},
				// Number input for pixel values, styled to match the panel's dark theme
				numberInput: {
					width: '52px',
					background: 'rgba(255,255,255,0.1)',
					border: '1px solid rgba(255,255,255,0.15)',
					borderRadius: '6px',
					color: '#fff',
					fontSize: '13px',
					fontWeight: '600',
					textAlign: 'center',
					padding: '4px 6px',
					outline: 'none',
					flexShrink: 0,
				},
				divider: {
					height: '1px', background: 'rgba(255,255,255,0.07)', margin: '2px 0',
				},
			};

			// -- Render --
			return React.createElement('div', { style: styles.panel },

				// Header, doubles as the drag handle
				React.createElement('div', { style: styles.header, onMouseDown },
					React.createElement('span', { style: styles.title }, '📁 Library Addon'),
					React.createElement('button', {
						style: styles.closeBtn, onClick: onClose,
						onMouseEnter: e => e.target.style.color = 'rgba(255,255,255,0.9)',
						onMouseLeave: e => e.target.style.color = 'rgba(255,255,255,0.4)',
					}, '✕')
				),

				React.createElement('div', { style: styles.body },

					// ---- Section: Library View ----
					React.createElement('span', { style: styles.sectionLabel }, 'Library View'),

					React.createElement('div', { style: styles.row },
						React.createElement('div', { style: styles.labelGroup },
							React.createElement('span', { style: styles.label }, 'Enforce Library View'),
							React.createElement('span', { style: styles.desc  }, 'Force compact list & custom sort order'),
						),
						// Toggle pill
						React.createElement('button', {
							style: styles.pill(enforceView),
							onClick: toggleEnforce,
							'aria-label': 'Toggle enforce library view',
						},
							React.createElement('div', { style: styles.thumb(enforceView) })
						)
					),

					React.createElement('div', { style: styles.divider }),

					// ---- Section: Folder Indicators ----
					React.createElement('span', { style: styles.sectionLabel }, 'Folder Indicators'),

					// Expand color picker row
					React.createElement('div', { style: styles.row },
						React.createElement('div', { style: styles.labelGroup },
							React.createElement('span', { style: styles.label }, 'Expand Indicator'),
							React.createElement('span', { style: styles.desc  }, 'Color shown on collapsed folders'),
						),
						// Swatch wraps a hidden <input type="color"> so we get full OS picker UX
						React.createElement('div', { style: styles.swatch(expandColor) },
							React.createElement('input', {
								type: 'color', value: expandColor,
								onChange: handleExpandColor,
								style: styles.colorInput,
								title: 'Pick expand indicator color',
							})
						)
					),

					// Collapse color picker row
					React.createElement('div', { style: styles.row },
						React.createElement('div', { style: styles.labelGroup },
							React.createElement('span', { style: styles.label }, 'Collapse Indicator'),
							React.createElement('span', { style: styles.desc  }, 'Color shown on expanded folders'),
						),
						React.createElement('div', { style: styles.swatch(collapseColor) },
							React.createElement('input', {
								type: 'color', value: collapseColor,
								onChange: handleCollapseColor,
								style: styles.colorInput,
								title: 'Pick collapse indicator color',
							})
						)
					),

					// Indicator width row
					React.createElement('div', { style: styles.row },
						React.createElement('div', { style: styles.labelGroup },
							React.createElement('span', { style: styles.label }, 'Indicator Width'),
							React.createElement('span', { style: styles.desc  }, 'Thickness in pixels (1–20)'),
						),
						// Number input, clamped to 1–20 in the handler
						React.createElement('input', {
							type: 'number',
							value: indicatorWidth,
							min: 1, max: 20,
							onChange: handleIndicatorWidth,
							style: styles.numberInput,
							title: 'Set indicator width in pixels',
						})
					)
				)
			);
		};

		// =========================
		// Panel mount / unmount
		// The panel lives in its own detached DOM node so it can't conflict
		// with Spotify's React tree. Clicking the topbar button a second time
		// closes the panel (toggle behaviour).
		// =========================
		let panelContainer = null;

		const openPanel = (anchorRect) => {
			if (panelContainer) {
				closePanel();
				return;
			}
			log.info('Opening settings panel.');
			panelContainer = document.createElement('div');
			panelContainer.id = 'library-addon-settings-panel';
			document.body.appendChild(panelContainer);
			ReactDOM.render(
				React.createElement(SettingsPanel, { onClose: closePanel, anchorRect }),
				panelContainer
			);
		};

		const closePanel = () => {
			if (!panelContainer) return;
			log.info('Closing settings panel.');
			ReactDOM.unmountComponentAtNode(panelContainer);
			panelContainer.remove();
			panelContainer = null;
		};

		// =========================
		// Topbar button injection
		// We inject a plain DOM button (not a React component) because it sits
		// outside Spotify's React tree. A MutationObserver in main() retries
		// injection after every DOM change so the button survives Spotify's
		// occasional full re-renders of the topbar. An ID guard prevents
		// duplicate buttons being inserted.
		// =========================
		const injectTopbarButton = () => {
			// Guard: already injected
			if (document.getElementById('library-addon-settings-btn')) return;

			const targetBar = document.querySelector(CONFIG.topbarButtonsSelector);
			if (!targetBar) return; // Topbar not rendered yet, observer will retry

			const wrapper = document.createElement('div');
			const btn = document.createElement('button');
			btn.id = 'library-addon-settings-btn';
			btn.setAttribute('aria-label', 'Library Addon Settings');
			// Mirror Spotify's own topbar button classes so it inherits their styling
			btn.className = 'Button-sc-1dqy6lx-0 Button-buttonTertiary-small-useBrowserDefaultFocusStyle-condensedAll encore-text-body-small-bold e-91000-overflow-wrap-anywhere e-91000-button-tertiary--condensed main-topBar-buddyFeed';
			// Open-folder SVG icon
			btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5V6H1v-.5zm0 3v6A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5V8a1.5 1.5 0 0 0-1.5-1.5H2.5A1.5 1.5 0 0 0 1 8v-1.5z"
					fill="currentColor"/>
			</svg>`;
			btn.addEventListener('click', () => openPanel(btn.getBoundingClientRect()));

			wrapper.appendChild(btn);
			// Prepend so it appears to the left of Spotify's own action buttons
			targetBar.insertBefore(wrapper, targetBar.firstChild);
			log.info('Topbar button injected.');
		};

		// =========================
		// Main
		// =========================
		async function main() {

			// Wait for Spicetify.showNotification, a reliable signal that
			// the full Spicetify API surface is ready.
			log.info('Waiting for Spicetify.showNotification...');
			while (!Spicetify?.showNotification) {
				await new Promise(resolve => setTimeout(resolve, 100));
			}
			log.info('Spicetify fully ready. Initializing addon.');

			// ---- Base styles ----
			// These handle layout tweaks to the library sidebar and the
			// folder indicator pseudo-elements. Colors and width for the
			// indicators are NOT set here, they live in the dynamic style
			// tag managed by applyStyles() so they can be updated without a reload.
			const style = document.createElement('style');
			style.textContent = `
				/* Hide user-specific list rows that shouldn't appear in the library */
				div[role="button"][aria-labelledby^="listrow-title-spotify:user:"] {
					display: none !important;
				}

				/* Hide extra header content, keeping only the collapse button and custom div */
				.main-yourLibraryX-headerContent > div:not(.main-yourLibraryX-collapseButton):not(.sk3cJK5EGQYAniRpE6Iz) {
					display: none;
				}

				/* Indent the library list slightly for visual breathing room */
				.main-yourLibraryX-libraryRootlist { padding-left: 15px; }

				/* Hide the "Your Library" heading text so only the icon shows */
				.main-yourLibraryX-collapseButton h1 { display: none; }

				/* Keep the collapse button visible at all times (Spotify hides it on hover) */
				.main-yourLibraryX-collapseButton button,
				.main-yourLibraryX-collapseButton button > span {
					transform: translateX(0) !important;
					opacity: 1 !important;
					transition: none !important;
				}

				/* Fine-tune positioning of the Your Episodes row */
				div[data-encore-id="listRow"][aria-labelledby="listrow-title-spotify:collection:your-episodes"] {
					margin-left: 4px; gap: 0; padding-left: 0; left: -10px;
				}

				/* Hide Spotify's own expand/collapse SVG icons, we replace them with
				   the colored indicator bars defined in the dynamic style tag */
				button[data-encore-id="buttonTertiary"][aria-label="Expand folder"] svg,
				button[data-encore-id="buttonTertiary"][aria-label="Collapse folder"] svg {
					display: none !important;
				}

				/* Stretch the expand/collapse buttons to fill their parent list row
				   so the indicator bar appears flush against the left edge */
				.expand-button, .collapse-button {
					position: absolute !important; inset: 0; z-index: 1;
				}

				/* The colored indicator bar, a thin pill on the left edge.
				   Background color and width are set dynamically by applyStyles(). */
				button.expand-button::before, button.collapse-button::before {
					content: ''; position: absolute;
					top: 50%; left: -5px;
					width: 5px; height: 50%;
					transform: translateY(-50%);
					border-radius: 5px;
					transition: left 0.15s ease;
				}

				/* Slide the indicator further left on hover for a subtle interactive feel */
				button.expand-button:hover::before,
				button.collapse-button:hover::before { left: -10px; }

				/* Dim the topbar button slightly so it doesn't compete with Spotify's icons */
				#library-addon-settings-btn { opacity: 0.7; transition: opacity 0.15s; }
				#library-addon-settings-btn:hover { opacity: 1; }
			`;
			document.head.appendChild(style);
			log.info('Base styles injected.');

			// Apply all saved indicator settings immediately so there's no flash
			// of default values before the settings panel is first opened
			applyStyles(
				getSetting(KEYS.expandColor,     CONFIG.expandIndicatorColor),
				getSetting(KEYS.collapseColor,   CONFIG.collapseIndicatorColor),
				getSetting(KEYS.indicatorWidth,  CONFIG.expandIndicatorWidth)
			);
			log.info('Indicator styles applied from saved settings.');

			// ---- Enforce library view (if enabled in settings) ----
			// Checks specific localStorage keys that Spotify uses to persist
			// the library sort order and view mode, and resets them to the
			// desired values. A page reload is required for Spotify to pick
			// up the new values, so we reload once and then this block
			// becomes a no-op on the reloaded page.
			if (getSetting(KEYS.enforceLibraryView, false)) {
				log.info('Enforce library view is ON, checking localStorage keys...');
				let shouldRefresh = false;

				for (let i = 0; i < localStorage.length; i++) {
					const key = localStorage.key(i);

					if (key.endsWith(':ylx-active-sort-order-by-filter-id')) {
						const target = JSON.stringify({ "2": "4", "undefined": "2" });
						if (localStorage.getItem(key) !== target) {
							localStorage.setItem(key, target);
							log.info(`Reset sort order key: ${key}`);
							shouldRefresh = true;
						}
					}

					if (key.endsWith(':items-view')) {
						if (localStorage.getItem(key) !== "2") {
							localStorage.setItem(key, "2");
							log.info(`Reset items-view key: ${key}`);
							shouldRefresh = true;
						}
					}
				}

				if (shouldRefresh) {
					log.info('Library view keys changed, reloading page.');
					location.reload();
					return; // Stop further execution; the reload will re-run the script
				} else {
					log.info('Library view keys already correct, no reload needed.');
				}
			}

			// ---- Move library control div into header ----
			// Spotify sometimes renders a control div (.sk3cJK5EGQYAniRpE6Iz) outside
			// the header. We move it inside so our CSS can position it correctly.
			// The MutationObserver re-runs the move after any DOM change because
			// Spotify can re-render the library panel at any time.
			const moveLibraryDiv = () => {
				const source = document.querySelector('div.sk3cJK5EGQYAniRpE6Iz');
				const target = document.querySelector('div.main-yourLibraryX-headerContent');
				if (!source || !target || source.parentElement === target) return;
				target.appendChild(source);
				log.info('Library control div moved into header.');
			};
			moveLibraryDiv();
			new MutationObserver(() => moveLibraryDiv())
				.observe(document.body, { childList: true, subtree: true });

			// ---- Topbar button ----
			// Inject immediately, then keep an observer running so the button
			// is re-injected if Spotify ever tears down and rebuilds the topbar.
			injectTopbarButton();
			new MutationObserver(() => injectTopbarButton())
				.observe(document.body, { childList: true, subtree: true });

			// ---- Folder indicator class polling ----
			// Spotify dynamically adds and removes expand/collapse buttons as the
			// user scrolls or opens folders. We poll on a fixed interval to
			// keep our custom classes (.expand-button / .collapse-button) in sync
			// rather than relying on a MutationObserver (which would fire too
			// frequently on a busy library list).
			const updateFolderIndicators = () => {
				// Reset first to avoid stale classes on recycled DOM nodes
				document.querySelectorAll('.collapse-button, .expand-button')
					.forEach(b => b.classList.remove('collapse-button', 'expand-button'));
				document.querySelectorAll('button[aria-label="Collapse folder"]')
					.forEach(b => b.classList.add('collapse-button'));
				document.querySelectorAll('button[aria-label="Expand folder"]')
					.forEach(b => b.classList.add('expand-button'));
			};

			updateFolderIndicators();
			setInterval(updateFolderIndicators, CONFIG.folderPollInterval);
			log.info(`Folder indicator polling started (every ${CONFIG.folderPollInterval}ms).`);

			log.info('Addon initialization complete.');
		}

		main();
	})();
})();
