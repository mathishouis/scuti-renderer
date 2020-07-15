import UserManager from './users/UserManager.js'
import InterfaceManager from './interface/InterfaceManager.js'
import Interface from './interface/Interface.js'
import CommunicationManager from './communication/CommunicationManager.js'
import RequestLogin from './communication/outgoing/users/RequestLogin.js'
import { SECURE, HOST, PORT} from '../config.js'

export class Game {

	
	constructor() {
        this.ssoTicket = ssoTicket;
        console.log("SSO Ticket: " + this.ssoTicket)
		this.userManager = new UserManager();
		this.interfaceManager = new InterfaceManager(this);
        this.interface = new Interface(this);
        this.startGame();
		this.userManager.updateCredits(1090);
		this.userManager.setUser(1, "Kozen", "Motto", "Monlook");
		this.userManager.getUser(1);
        this.interface.render("catalog");
        this.requestLogin = new RequestLogin();
        
	}
    
    startGame() {
        CommunicationManager.connect(HOST, PORT, SECURE);
    }
    
    load() {
        console.log("loading bro")
        this.requestLogin.login(1, "Kozen", this.ssoTicket);
    }
    
    stop() {
        console.log("Stopping game...")
    }
	
}
