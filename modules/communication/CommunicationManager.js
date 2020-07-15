import WebsocketManager from '../websockets/WebsocketManager.js';
import Main from '../Main.js';

export default class CommunicationManager {

    constructor() {
        
    }
    
    sendMessage(message) {
            console.log("Send '" + message + "' to WS server")
            WebsocketManager.send(message);
    }
    
    static connect(host, port, secure) {
        if(secure == true) {
            const connectionURL = "wss://" + host + ":" + port;
            console.log("Connecting to " + connectionURL + "...");
            return WebsocketManager.connect(connectionURL);
        } else {
            const connectionURL = "ws://" + host + ":" + port;
            console.log("Connecting to " + connectionURL + "...");
            return WebsocketManager.connect(connectionURL);
        }
    }
}