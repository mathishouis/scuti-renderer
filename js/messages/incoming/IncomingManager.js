//import * as Incoming from "./Incoming.js";
import * as IncomingUserMessages from "./user/UserLoginMessage.js";

export class IncomingManager {
    constructor() {
        this.messages = new Map();

        //load
        this.registerUserMessages();
    }
    
    registerUserMessages() {
        this.messages.set(222, IncomingUserMessages.UserLoginMessage);
    }
}