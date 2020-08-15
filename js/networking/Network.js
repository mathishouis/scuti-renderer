export class Network extends WebSocket {
    constructor(host, port) {
        super("ws://" + host + ":" + port);
    }

    sendToServer(msg) {
        //TODO: work with packet
        this.send(msg);
    }
}