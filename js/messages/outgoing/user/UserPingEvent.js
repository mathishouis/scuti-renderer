import { client } from "../../../main.js";
import { OutgoingUserEvents } from "../Outgoing.js";
import {Log} from "../../../util/logger/Logger";

export class UserPingEvent {

    constructor(dataParsed) {

        this.packet = dataParsed;

    }

    sendToServer() {

        const dataPacket = {
            packetId: OutgoingUserEvents.UserPingEvent,
        };
        client.getWebSocket().send(JSON.stringify(dataPacket));
        Log("🏓 Ping", 'info');

    }
}