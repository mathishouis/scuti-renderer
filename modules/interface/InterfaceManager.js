import Main from '../Main.js';
import * as Game from '../Game.js';

export default class InterfaceManager {

	
	constructor(game) {
		this.game = Game;
	}
	
	log(message) {
		console.log("Log: " + message);
	}
	
	
}