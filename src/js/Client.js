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
        this.furnitureLoader.loadFurnidata();
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

    getCurrentRoom() {
        return this.currentRoom;
    }

    getUsername() {
        return this.username;
    }

    displayClient() {
        this.setApp();
        document.getElementById("room-container").appendChild(this.app.view);
        this.currentRoom = undefined;
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