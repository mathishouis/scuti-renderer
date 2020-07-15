import { Game } from './Game.js';

export default class Main {
	static getGame() {
		if(this.gameInstance == null) {
			this.gameInstance = new Game();
		}
		return this.gameInstance
	}
}

Main.getGame();