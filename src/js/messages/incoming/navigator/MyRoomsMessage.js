import $ from "jquery";
import {client} from "../../../main";
import {store} from "../../../../interface/store/store";

export class MyRoomsMessage {
    constructor(packet) {
        this.packet = packet;
    }

    execute() {
        console.log(this.packet.data);
        store.state.navigator.tabs.me.category.my_rooms = this.packet.data;
    }
}