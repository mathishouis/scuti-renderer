import * as Game from '../Game.js';


export default class Interface {

	constructor(game) {
		this.game = Game;
	}

	render(data) {
		if(data == "catalog") {
			Interface.catalog();
		}
	
	}

	static catalog() {
		return "<h1>CC</h1>";
	}

}