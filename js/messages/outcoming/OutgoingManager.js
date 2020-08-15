import { OutgoingUserEvents } from "./Outgoing.js";
import { UserLoginEvent } from "./user/UserLoginEvent.js";

export class OutgoingManager {
    constructor() {
        this.events = new Map();

        //load
        this.registerUserEvents();
    }

    compose(packet) {
        let eventClass = this.events.get(packet.packetId);
        let event = new eventClass(packet);
        event.sendToServer();
    }

    registerUserEvents() {
        this.events.set(OutgoingUserEvents.UserLoginEvent, UserLoginEvent)
    }

    UIEvent() {

    }
}