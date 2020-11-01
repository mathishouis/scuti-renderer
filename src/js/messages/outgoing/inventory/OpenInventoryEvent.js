import {client} from "../../../main";
import $ from "jquery";

export class OpenInventoryEvent {
    constructor(packet) {
        this.packet = packet
    }

    sendToServer() {
        client.getWebSocket().send(JSON.stringify(this.packet));
    }

    static listen() {
        const inventoryComponent = $("#inventory-component");
        $("#inventory").click(function () {
            if(inventoryComponent.css("display") === "none") {
                inventoryComponent.show();
                // Send packet
            } else {
                inventoryComponent.hide();
            }
        })
    }
}