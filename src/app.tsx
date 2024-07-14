// @note - everything we need is in this file
import "./styles/app.scss";
async function main() {
	while (!Spicetify?.showNotification) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}
}

export default main;