import {client} from "../../../main";
import $ from "jquery";
import {OutgoingNavigatorEvents} from "../Outgoing";

export class CreateRoomEvent {
    constructor(dataParsed) {
        this.packet = dataParsed;
    }

    sendToServer() {
        console.log("Room '" + this.packet.data.roomName + "' created!");
        client.getWebSocket().send(JSON.stringify(this.packet));
    }

    static listen() {
        const createRoomAction = $("#createRoomAction")
        createRoomAction.click(function () {
            const name = document.getElementById("roomName").value;
            console.log(name);
            if(name.length >= 2 && name.length <= 20) {
                const packet = {
                    packetId: OutgoingNavigatorEvents.CreateRoomEvent,
                    data: {
                        roomName: name,
                    }
                };
                const event = new CreateRoomEvent(packet);
                event.sendToServer();
                $("createroom-component").hide();
            }
        })
    }
}