import CommunicationManager from '../../CommunicationManager.js'

export default class RequestLogin {
    constructor() {
        
    }
    login(id, username, ssoTicket) {
        this.id = id;
        this.username = username;
        this.ssoTicket = ssoTicket;
        this.communicationManager = new CommunicationManager();
        this.communicationManager.sendMessage("RequestLoginEvent|" + this.id + "|" + this.username + "|" + this.ssoTicket);
        console.log("Trying to login with: " + this.id + " " + this.username + " " + this.ssoTicket + "");
    }
    
}