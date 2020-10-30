import * as PIXI from 'pixi.js';
import {OutgoingManager} from "./messages/outgoing/OutgoingManager";
import {RoomGenerator} from "./canvas/room/RoomGenerator";
import { RoomEngine } from "./rooms/RoomEngine";
import {OutgoingUserEvents} from "./messages/outgoing/Outgoing";
import {DataManager} from "./util/DataManager";
import {UserLoginEvent} from "./messages/outgoing/user/UserLoginEvent";
import { UserPingEvent } from "./messages/outgoing/user/UserPingEvent.js";
import {IncomingManager} from "./messages/incoming/IncomingManager";
import {Network} from "./networking/Network";
import { Log } from "./util/logger/Logger.js";

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
        this.ping();
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

    ping() {

        setInterval(
            function() {

                const userPingEvent = new UserPingEvent();
                userPingEvent.sendToServer();

            }, 5 * 1000);

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
        //this.currentRoom = RoomGenerator.execute(this.app, floor, 8);
        this.currentRoom = new RoomEngine(this.app, {
            'floor': floor,
            'tileHeight': 8,
            'furnitures': [
                { id: 1, baseId: 1, position: {x: 1, y: 2, z: 4}, direction: 2, state: 2},
                { id: 1, baseId: 1, position: {x: 1, y: 4, z: 4}, direction: 6, state: 1},
                { id: 10, baseId: 10, position: {x: 1, y: 2, z: 4}, direction: 2, state: 2},
                { id: 1, baseId: 1, position: {x: 3, y: 2, z: 1}, direction: 4, state: 2},
            ]
        }).renderRoom();



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
            Log("WS connection closed!", 'error');
        }
    }

    wsOnMessage() {
        const incomingMessages = this.incomingManager.messages;
        this.ws.onmessage = function(event) {
            let dataParsed = JSON.parse(event.data);
            Log("Data received: " + JSON.stringify(dataParsed), 'info');

            let messageClassCorresponding = incomingMessages.get(dataParsed.packetId);
            let message = new messageClassCorresponding(dataParsed);
            message.execute();
        }
    }
}