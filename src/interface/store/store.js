import Vue from 'vue'
import Vuex from 'vuex'
import { OpenNavigatorEvent } from "../../js/messages/outgoing/navigator/OpenNavigatorEvent";
import { LoadRoomEvent} from "../../js/messages/outgoing/rooms/LoadRoomEvent";
import {CreateRoomEvent} from "../../js/messages/outgoing/navigator/CreateRoomEvent";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        visibility: {
            splash: true,
            navigator: false,
            roomcreator: false,
            catalog: false,
            landingview: true,
            furniviewer: false,
        },
        navigator: {
            currentTab: 'public',
            tabs: {
                public: {

                },
                popular: {
                    category: {
                        1: {
                            name: 'Most Popular Rooms',
                            visible: true,
                            rooms: {},
                        },
                    }
                },
                events: {

                },
                me: {
                    category: {
                        my_rooms: {

                        }
                    }
                }
            }
        },
        rooms: {},
        currentRoom: {
            id: 0,
            name: 'Room Name',
            owner_name: 'Kozen',

        },
        currentFurni: {}
    },
    mutations: {
        toggleVisibility (state, frame) {
            if(state.visibility[frame]) {
                state.visibility[frame] = false
            } else {
                state.visibility[frame] = true
                switch(frame) {
                    case 'navigator':
                        OpenNavigatorEvent.listen();
                        break;
                }

            }
        },
        loadRoom (state, id) {
            LoadRoomEvent.loadRoom(id);
        },
    },
})