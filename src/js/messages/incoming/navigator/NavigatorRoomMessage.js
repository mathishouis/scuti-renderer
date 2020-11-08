import $ from "jquery";
import {client} from "../../../main";
import {store} from "../../../../interface/store/store";

export class NavigatorRoomMessage {
    constructor(packet) {
        this.packet = packet;
    }

    execute() {
        store.state.rooms = this.packet.data;
    }
}