import {client} from "../../../main";
import $ from "jquery";
import {store} from "../../../../interface/store/store";
import {OutgoingNavigatorEvents} from "../Outgoing";

export class RequestMyRoomsEvent {
    constructor(dataParsed) {
        this.packet = dataParsed;
    }

    sendToServer() {
        client.getWebSocket().send(JSON.stringify(this.packet));
    }

    static myRooms() {

        const packet = {
            packetId: OutgoingNavigatorEvents.RequestMyRoomsEvent,
            data: {

            }
        };

        const event = new RequestMyRoomsEvent(packet);
        event.sendToServer()

    }
}