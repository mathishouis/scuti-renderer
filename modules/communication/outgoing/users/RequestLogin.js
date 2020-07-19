import CommunicationManager from '../../CommunicationManager.js'

export default class RequestLogin {
    constructor() {

    }
    login(id, username, ssoTicket) {
        var login = {
            "action": "RequestLoginEvent",
            "data": {
                "id": id,
                "username": username,
                "ssoTicket": ssoTicket
            }
        };

        this.communicationManager = new CommunicationManager();
        this.communicationManager.sendMessage(JSON.stringify(login));
        console.log("Trying to login with: " + this.id + " " + this.username + " " + this.ssoTicket + "");
    }

}