import Vue from 'vue'
import Vuex from 'vuex'
import { OpenNavigatorEvent } from "../../js/messages/outgoing/navigator/OpenNavigatorEvent";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        visibility: {
            navigator: false,
        },
        rooms: {}
    },
    mutations: {
        toggleVisibility (state, frame) {
            if(state.visibility[frame]) {
                state.visibility[frame] = false
            } else {
                state.visibility[frame] = true
                OpenNavigatorEvent.listen();
            }
        }
    },
})