import CommunicationManager from "../communication/CommunicationManager.js"
import ServerMessage from "../communication/protocol/ServerMessage.js"
import Main from "../Main.js"

export default class WebsocketManager {
    
    constructor() {
        this.connected = false;
    }

    
    static send(data) {
        this.ws.send(data);
    }
    
    static connect(connectionURL) {
        this.ws = new WebSocket(connectionURL);
        
        this.ws.binaryType = "arraybuffer";
        
        this.ws.onopen = function() {
            this.connected = true;
            console.log("CONNECTED TO " + connectionURL)
            Main.getGame().load();
        }
        
        this.ws.onclose = function() {
            this.connected = false;
            console.log("DISCONNECTED")
        }
        
        this.ws.onerror = function() {
            this.connected = false;
            alert("An error occured...")
        }
        
        this.ws.onmessage = function(msg) {
            ServerMessage.handleMessage(msg.data);
        }
    }
    
    
}