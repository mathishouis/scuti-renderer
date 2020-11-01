import {client} from "../../../main";
import $ from "jquery";
import {OutgoingNavigatorEvents} from "../Outgoing";

export class OpenNavigatorEvent {
    constructor(dataParsed) {
        this.packet = dataParsed;
    }

    sendToServer() {
        console.log("Nav opened");
        client.getWebSocket().send(JSON.stringify(this.packet));
    }

    static listen() {
        const navigatorComponent = $("#navigator-component");
        $("#navigator").click(function() {
            if(navigatorComponent.css("display") === "none") {
                navigatorComponent.show();
                const packet = {
                    packetId: OutgoingNavigatorEvents.OpenNavigatorEvent,
                    data: {}
                };

                const event = new OpenNavigatorEvent(packet);
                event.sendToServer()
            } else {
                navigatorComponent.hide();
            }
        })
    }
}