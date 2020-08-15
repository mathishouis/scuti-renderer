import { ws } from "./../../../main.js";

export class UserLoginEvent {
    constructor(dataParsed) {
        this.packet = dataParsed;
    }

    sendToServer() {
        ws.send(JSON.stringify(this.packet));
    }
}