import { IncomingUserMessages } from "./Incoming.js";
import { UserLoginMessage } from "./user/UserLoginMessage.js";
import {IncomingNavigatorMessages, IncomingRoomMessages} from "./Incoming";
import {NavigatorRoomMessage} from "./navigator/NavigatorRoomMessage";
import {LoadRoomMessage} from "./rooms/LoadRoomMessage";

export class IncomingManager {
    constructor() {
        this.messages = new Map();

        //load
        this.registerMessages();
    }
    
    registerMessages() {
        this.messages.set(IncomingUserMessages.UserLoginMessage, UserLoginMessage);
        this.messages.set(IncomingNavigatorMessages.RoomNavigatorListMessage, NavigatorRoomMessage);
        this.messages.set(IncomingRoomMessages.LoadRoomMessage, LoadRoomMessage);
    }



    getMessages() {
        return this.messages;
    }
}