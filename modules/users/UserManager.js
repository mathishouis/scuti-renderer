import Main from '../Main.js';
import InterfaceManager from '../interface/InterfaceManager.js';
import User from './User.js';

export default class UserManager {
	
	constructor() {
		this.users = {};
		this.credits = 100000;
		this.clubDays = 69;
	}
	
	updateCredits(credits) {
		if(this.credits != -1) {

		}
		this.credits = credits;

	}
	
	setUser(id, name, motto, look) {
		const user = this.getUser(id);
		if (user == null) {
			this.users[id] = new User(id, name, motto, look);
		} else {
			user.look = look;
			user.motto = motto;
			user.name = name;
		}
		console.log(id + name + motto + look);
		return this.users[id];
	}
	
	getUser(id) {
		console.log(this.users[id]);
		return this.users[id]
	}

}