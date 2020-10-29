import { IncomingUserMessages } from "./Incoming.js";
import { UserLoginMessage } from "./user/UserLoginMessage.js";
import {IncomingNavigatorMessages} from "./Incoming";
import {NavigatorRoomMessage} from "./navigator/NavigatorRoomMessage";

export class IncomingManager {
    constructor() {
        this.messages = new Map();

        //load
        this.registerUserMessages();
        this.registerNavigatorMessages();
    }
    
    registerUserMessages() {
        this.messages.set(IncomingUserMessages.UserLoginMessage, UserLoginMessage);
    }

    registerNavigatorMessages() {
        this.messages.set(IncomingNavigatorMessages.RoomNavigatorListMessage, NavigatorRoomMessage);
    }

    getMessages() {
        return this.messages;
    }
}