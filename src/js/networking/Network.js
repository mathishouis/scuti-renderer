export class Network extends WebSocket {
    constructor(host, port) {
        super("ws://" + host + ":" + port);
    }
}