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
import { RoomFurnitureLoader } from "./rooms/furnitures/RoomFurnitureLoader";
import Vue from 'vue'
import App from "../interface/App";
import  {store} from "../interface/store/store"

export class Client {
    constructor() {
        this.ws = new Network("localhost", "30000");
        this.incomingManager = new IncomingManager();
        // WebSocket
        this.wsOnOpen();
        this.wsOnClose();
        this.wsOnMessage();


        //this.eventListener();
        this.ping();

    }

    getFurniLoader() {
        return this.furnitureLoader;
    }

    setVue() {
        this.vue = new Vue({
            el: '#app',
            store,
            render: h => h(App)
        })
    }

    getVue() {
        return this.vue;
    }

    setApp() {
        PIXI.utils.clearTextureCache()
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: false,
            transparent: false,
            backgroundColor: 0x212225
        });
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.x = this.app.screen.width / 2;
        this.container.y = this.app.screen.height / 2;
        this.container.sortableChildren = true;
        this.app.stage.addChild(this.container);
        this.furnitureLoader = new RoomFurnitureLoader();
    }

    getWebSocket() {
        return this.ws;
    }

    getApp() {
        return this.app;
    }

    getContainer() {
        return this.container;
    }

    ping() {

        setInterval(
            function() {

                const userPingEvent = new UserPingEvent();
                userPingEvent.sendToServer();

            }, 30 * 1000);

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
        const floor2 = "xxxxxxxxxxxxxxxxxxx\n" +
                        "xxxxxxxxxxxxx00000x\n" +
                        "xxxxx1111111000000x\n" +
                        "xxxxx1111111000000x\n" +
                        "xxxxx1111111000000x\n" +
                        "xxxxx1111111000000x\n" +
                        "xxxxx1111111000000x\n" +
                        "xxxxx000000xxxxxxxx\n" +
                        "xxxxx000000xxxxxxxx\n" +
                        "xxx00000000xxxxxxxx\n" +
                        "xxx00000000xxxxxxxx\n" +
                        "xxx00000000xxxxxxxx\n" +
                        "xxx00000000xxxxxxxx\n" +
                        "xxxxxxxxxxxxxxxxxxx\n" +
                        "xxxxxxxxxxxxxxxxxxx\n" +
                        "xxxxxxxxxxxxxxxxxxx"
        const floor = "xxxxxxx\nx000000\nx000000\nx000000\nx000000\nx000000\nx000000\n"
        // display a room... this is a test method!
        //this.currentRoom = RoomGenerator.execute(this.app, floor, 8);
        this.currentRoom = new RoomEngine(this.app,this.container, {
            'floor': floor,
            'tileThickness': 8,
            'wallHeight': 1,
            'furnitures': [
                { id: 13, baseId: 2567, positions: {x: 0, y: 0, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2567, positions: {x: 0, y: 3, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2567, positions: {x: 3, y: 0, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2567, positions: {x: 3, y: 3, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2645, positions: {x: 5, y: 1, z: 1}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 5, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 3119, positions: {x: 4, y: 1, z: 0}, direction: 0, state: 3},
                { id: 13, baseId: 2643, positions: {x: 3, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 8262, positions: {x: 3, y: 1, z: 1}, direction: 2, state: 0},
                { id: 13, baseId: 8261, positions: {x: 2, y: 1, z: 1}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 2, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2674, positions: {x: 1, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 3705, positions: {x: 2, y: 2, z: 0.1}, direction: 2, state: 0},
                { id: 13, baseId: 2650, positions: {x: 3, y: 3, z: 0.1}, direction: 6, state: 0},
                { id: 13, baseId: 2643, positions: {x: 1, y: 2, z: 0}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 1, y: 3, z: 0}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 1, y: 4, z: 0}, direction: 2, state: 0},
                { id: 13, baseId: 3704, positions: {x: 2, y: 4, z: 0}, direction: 4, state: 0},
                { id: 13, baseId: 3114, positions: {x: 2, y: 5, z: 0}, direction: 0, state: 1},
                { id: 13, baseId: 2643, positions: {x: 1, y: 5, z: 0}, direction: 2, state: 0},
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