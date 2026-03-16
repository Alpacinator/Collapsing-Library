# Collapsing Library for Spicetify

A Spicetify extension that improves the Spotify library sidebar with collapsible folders, visual folder indicators, and a built-in settings panel, all without leaving Spotify.

## Features

- **Collapsible folders**, click any folder in your library to expand or collapse it in place, just like the good old days.
- **Folder indicator bars**, a colored bar on the left edge of each folder shows at a glance whether it's expanded or collapsed.
- **Settings panel**, a draggable floating panel in the topbar lets you customize the extension without editing any code.
- **Persistent settings**, all your preferences are saved and restored automatically on every reload.

## Settings

Open the settings panel by clicking the **folder icon** in Spotify's topbar.

| Setting | Description | Default |
|---|---|---|
| Enforce Library View | Forces the library into compact list view with a fixed sort order on every load | Off |
| Expand Indicator Color | Color of the indicator bar on collapsed folders | White |
| Collapse Indicator Color | Color of the indicator bar on expanded folders | Green |
| Indicator Width | Thickness of the indicator bars in pixels (1–20) | 5px |

## Installation

1. Make sure [Spicetify](https://spicetify.app) is installed.
2. Copy the extension file into your Spicetify extensions folder:
```
   %appdata%\spicetify\Extensions       (Windows)
   ~/.config/spicetify/Extensions       (Linux / macOS)
```
3. Run `spicetify config extensions collapsingLibrary.js` in your terminal.
4. Run `spicetify apply`.

## Recommended Setup

The extension works best with the Spotify library in **compact/list mode**. If you haven't already, switch to list mode in the library panel, the Enforce Library View toggle in settings can do this automatically for you.

## Known Issues

- The indicator bars may briefly flicker when Spotify re-renders the library list after scrolling. This is a side effect of the polling approach used to keep folder classes in sync with Spotify's dynamic DOM.

## Changelog
Collapsing Library v5.0.0
Big update this time! The extension now has a proper settings panel, click the folder icon in the topbar to open it. From there you can pick colors for the expand and collapse indicators, adjust how thick they are, and toggle the enforce library view option on or off. No more digging through the code to change things.
All your settings are saved automatically so everything looks the same after a reload. Enjoy!
