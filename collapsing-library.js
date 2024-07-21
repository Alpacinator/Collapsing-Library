(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var collapsingDlibrary = (() => {
  // src/app.tsx
  async function main() {
    while (!(Spicetify == null ? void 0 : Spicetify.showNotification)) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  var app_default = main;

  // ../AppData/Local/Temp/spicetify-creator/index.jsx
  (async () => {
    await app_default();
  })();
})();
(async () => {
    if (!document.getElementById(`collapsingDlibrary`)) {
      var el = document.createElement('style');
      el.id = `collapsingDlibrary`;
      el.textContent = (String.raw`
  /* ../AppData/Local/Temp/tmp-13172-PnJ7ohSFn43P/190d52720630/app.css */
#spicetify-playlist-list {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 0.3);
  --collapsing-library-folder-indicator-scale: 0.5;
  --collapsing-library-folder-padding: var(--encore-spacing-tighter-2, 4px);
}
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow],
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow],
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
}
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > div[role=button][aria-labelledby*=":folder:"] > .RowButton-sc-xxkq4e-0,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > div[role=button][aria-labelledby*=":folder:"] > .RowButton-sc-xxkq4e-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > div[role=button][aria-labelledby*=":folder:"] > .RowButton-sc-xxkq4e-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > div[role=button][aria-labelledby*=":folder:"] > .RowButton-sc-xxkq4e-0 {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 20;
}
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > :last-child > button,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > :last-child > button,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > :last-child > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > :last-child > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button {
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  opacity: 0.4;
  z-index: 30;
  border-left: 4px solid rgba(var(--spice-rgb-button-active), 0);
  border-radius: 0px;
  transform: scale(1) !important;
}
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button .IconWrapper__Wrapper-sc-16usrgb-0,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button .IconWrapper__Wrapper-sc-16usrgb-0 {
  display: none;
}
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > :last-child > button:hover,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > :last-child > button:hover,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button:hover,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button:hover,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button:hover,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button:hover,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > :last-child > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > :last-child > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button:hover,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button:hover {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 0.6);
  --collapsing-library-folder-indicator-scale: 0.9;
}
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > :last-child > button::before,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > :last-child > button::before,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button::before,
#spicetify-playlist-list li[role=listitem] > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button::before,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button::before,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button::before,
#spicetify-playlist-list li[role=listitem] > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > :last-child > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > :last-child > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > [data-encore-id=listRow] > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > :last-child > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .HeaderArea > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > :last-child > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > :last-child > .Areas__TrailingSlot-sc-8gfrea-7 > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > :last-child > button::before,
#spicetify-playlist-list li.main-yourLibraryX-listItem > .Box__BoxComponent-sc-y4nds-0 > .Areas__HeaderArea-sc-8gfrea-3 > .Areas__TrailingSlot-sc-8gfrea-7 > button::before {
  content: "";
  position: absolute;
  inset: var(--collapsing-library-folder-padding, 4) auto var(--collapsing-library-folder-padding) -4px;
  scale: 1 var(--collapsing-library-folder-indicator-scale);
  display: block;
  background: var(--collapsing-library-folder-indicator-color);
  z-index: 31;
  width: 4px;
  transition-property: background, scale;
  transition-duration: 100ms;
  transition-timing-function: linear;
}
#spicetify-playlist-list .main-yourLibraryX-collapseButton button span {
  display: block;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 0"]:has(+ li[style*="--ylx-folder-depth: 1"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 1"]:has(+ li[style*="--ylx-folder-depth: 2"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 2"]:has(+ li[style*="--ylx-folder-depth: 3"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 3"]:has(+ li[style*="--ylx-folder-depth: 4"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 4"]:has(+ li[style*="--ylx-folder-depth: 5"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 5"]:has(+ li[style*="--ylx-folder-depth: 6"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 6"]:has(+ li[style*="--ylx-folder-depth: 7"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 7"]:has(+ li[style*="--ylx-folder-depth: 8"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 8"]:has(+ li[style*="--ylx-folder-depth: 9"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}
#spicetify-playlist-list li.main-yourLibraryX-listItem[role=listitem][style*="--ylx-folder-depth: 9"]:has(+ li[style*="--ylx-folder-depth: 10"]) .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button::before {
  --collapsing-library-folder-indicator-color: rgba(var(--spice-rgb-button-active), 1);
  --collapsing-library-folder-indicator-scale: 1;
}

      `).trim();
      document.head.appendChild(el);
    }
  })()
      })();