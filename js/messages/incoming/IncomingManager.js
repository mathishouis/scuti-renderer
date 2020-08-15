import { IncomingUserMessages } from "./Incoming.js";
import { UserLoginMessage } from "./user/UserLoginMessage.js";

export class IncomingManager {
    constructor() {
        this.messages = new Map();

        //load
        this.registerUserMessages();
    }
    
    registerUserMessages() {
        this.messages.set(IncomingUserMessages.UserLoginMessage, UserLoginMessage);
    }
}