import * as Game from '../../Main.js'
import LoginHandler from '../incoming/users/LoginHandler.js'

export default class ServerMessage {
    
    static parseJSON(data) {
        return JSON.parse(data);
    }
    
    static handleMessage(message) {
        var msg = ServerMessage.parseJSON(message);
        if(msg.action == "LoginHandler") {
            LoginHandler.handle(message);
        }
    }
    
}