import {client} from "../../../main";
import $ from "jquery";
import {OutgoingRoomEvents} from "../Outgoing";

export class LoadRoomEvent {
    constructor(dataParsed) {
        this.packet = dataParsed;
    }

    sendToServer() {
        console.log("Loading room");
        client.getWebSocket().send(JSON.stringify(this.packet));
    }

    static loadRoom(roomId) {
        const packet = {
            packetId: OutgoingRoomEvents.LoadRoomEvent,
            data: {
                roomId: roomId
            }
        };

        const event = new LoadRoomEvent(packet);
        event.sendToServer()


    }
}