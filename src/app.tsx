async function main() {
	while (!Spicetify?.showNotification) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}
  
	// Create a <style> element
	var style = document.createElement('style');
	style.type = 'text/css';

	// Define the CSS rules
	var css = `
		#spicetify-playlist-list {
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
		}
	`;

	// Append the CSS rules to the <style> element
	if (style.styleSheet) {
		style.styleSheet.cssText = css; // IE8 and earlier
	} else {
		style.appendChild(document.createTextNode(css)); // Modern browsers
	}

	// Append the <style> element to the <head> of the document
	document.head.appendChild(style);


}

export default main;
