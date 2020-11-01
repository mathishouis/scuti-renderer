import {client} from "../../../main";

export class UserLoginEvent {
    constructor(dataParsed) {
        this.packet = dataParsed;
    }

    sendToServer() {
        client.getWebSocket().send(JSON.stringify(this.packet));
    }
}