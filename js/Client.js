import * as PIXI from 'pixi.js';
import {OutgoingManager} from "./messages/outgoing/OutgoingManager";
import {RoomGenerator} from "./canvas/room/RoomGenerator";
import {OutgoingUserEvents} from "./messages/outgoing/Outgoing";
import {DataManager} from "./util/DataManager";
import {UserLoginEvent} from "./messages/outgoing/user/UserLoginEvent";
import {IncomingManager} from "./messages/incoming/IncomingManager";
import {Network} from "./networking/Network";

export class Client {
    constructor() {
        this.ws = new Network("localhost", "30000");
        this.incomingManager = new IncomingManager();

        // WebSocket
        this.wsOnOpen();
        this.wsOnClose();
        this.wsOnMessage();

        this.eventListener();
        this.displayClient();
    }

    setApp() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: false,
            transparent: false,
            backgroundColor: 0x121212
        });
    }

    getWebSocket() {
        return this.ws;
    }

    getApp() {
        return this.app;
    }

    eventListener() {
        OutgoingManager.eventListener();
    }

    setUser(data) {
        this.username = data.username;
    }

    getUsername() {
        return this.username;
    }

    displayClient() {
        this.setApp();
        document.getElementById("room-container").appendChild(this.app.view);
        this.displayBeautifulRoom();
    }

    displayBeautifulRoom() {
        const floor = "xxxxxxxxxxxxxxxx\nxxxx00002100xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxx000000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxx00000000xxxx\nxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxx";
        // display a room... this is a test method!
        this.currentRoom = RoomGenerator.execute(this.app, floor, 8);
    }

    wsOnOpen() {
        this.ws.onopen = function(event) {
            const dataLogin = {
                packetId: OutgoingUserEvents.UserLoginEvent,
                data: {
                    username: DataManager.getUsernameInUrl(window.location.search)
                }
            };
            const userLoginEvent = new UserLoginEvent(dataLogin);
            userLoginEvent.sendToServer();
        }
    }

    wsOnClose() {
        this.ws.onclose = function(event) {
            window.document.body.textContent = "Connexion échouée";
        }
    }

    wsOnMessage() {
        const incomingMessages = this.incomingManager.messages;
        this.ws.onmessage = function(event) {
            let dataParsed = JSON.parse(event.data);
            console.log("Data received: " + JSON.stringify(dataParsed));

            let messageClassCorresponding = incomingMessages.get(dataParsed.packetId);
            let message = new messageClassCorresponding(dataParsed);
            message.execute();
        }
    }
}