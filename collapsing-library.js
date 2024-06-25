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
    var style = document.createElement("style");
    style.type = "text/css";
    var css = `
		
		li .Box__BoxComponent-sc-y4nds-0{
			position: relative;
			z-index: 10;
			width: 100%;
			height: 100%;
		}
		
		li .Box__BoxComponent-sc-y4nds-0 .RowButton-sc-xxkq4e-0{
			width: 100%;
			height: 100%;
			position: absolute;	
			z-index: 20;
		}

		li .Box__BoxComponent-sc-y4nds-0 .Areas__HeaderArea-sc-8gfrea-3 .Areas__TrailingSlot-sc-8gfrea-7 button {
			position: absolute;
			left: 0px;
			width: 100%;
			height: 100%;
			background-color: transparant;
			opacity: 0.4;
			z-index: 30;
			border-left: 4px solid grey;
			border-radius: 0px;
			transform: scale(1) !important;
		}
		
		button .IconWrapper__Wrapper-sc-16usrgb-0{
			display: none;
		}
		
		.main-yourLibraryX-collapseButton button span {
			display: block;
		}
	`;
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);
  }
  var app_default = main;

  // ../AppData/Local/Temp/spicetify-creator/index.jsx
  (async () => {
    await app_default();
  })();
})();

      })();