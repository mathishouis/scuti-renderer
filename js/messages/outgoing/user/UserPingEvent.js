import { client } from "../../../main.js";
import { OutgoingUserEvents } from "../Outgoing.js";

export class UserPingEvent {

    constructor(dataParsed) {

        this.packet = dataParsed;

    }

    sendToServer() {

        const dataPacket = {
            packetId: OutgoingUserEvents.UserPingEvent,
        };
        client.getWebSocket().send(JSON.stringify(dataPacket));
        console.log("Pinnnng")

    }
}