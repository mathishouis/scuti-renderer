export default class ServerMessage {
    
    static parseJSON(data) {
        return JSON.parse(data);
    }
    
    static handleMessage(message) {
        var msg = ServerMessage.parseJSON(message);
        console.log(msg);
    }
    
}