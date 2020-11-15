import {client} from "../../../main";
import $ from "jquery";
import {store} from "../../../../interface/store/store";
import {OutgoingNavigatorEvents} from "../Outgoing";

export class CreateRoomEvent {
    constructor(dataParsed) {
        this.packet = dataParsed;
    }

    sendToServer() {
        console.log("Room '" + this.packet.data.roomName + "' created!");
        client.getWebSocket().send(JSON.stringify(this.packet));
    }

    static createRoom(name, model, maxusers, description) {

        const packet = {
            packetId: OutgoingNavigatorEvents.CreateRoomEvent,
            data: {
                roomName: name,
                modelId: model,
                maxUsers: maxusers,
                categoryId: 1,
                description: description,
            }
        };

        store.state.visibility.roomcreator = false;

        const event = new CreateRoomEvent(packet);
        event.sendToServer()
    }
}