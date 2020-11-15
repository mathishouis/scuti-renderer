<template>
    <transition name="slide-fade">
        <Frame v-if="this.$store.state.visibility.roomcreator" width="600px" height="440px">
            <template #header>
                <div class="title">Room Creation</div>
                <div class="right">
                    <button style="height: 22px;" v-on:click="toggleVisibility"><img src="./../../../../public/img/cross.png"></button>
                </div>
            </template>
            <div class="left-panel">
                <label>Room name</label>
                <input v-model="roomName">
                <label>Room description</label>
                <textarea rows="2" v-model="roomDescription"></textarea>
                <div class="separator"></div>
                <label>Category</label>
                <select>
                    <option value="0">Trading</option>
                </select>
                <label>Max users</label>
                <select v-model="roomMaxUsers">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <div class="separator"></div>
                <button v-on:click="createRoom(roomName, selectedModel, roomMaxUsers, roomDescription)" :disabled="roomName.length == 0" class="green"><img src="./../../../../public/img/CreateRoom.png">Create room</button>
            </div>
            <div class="right-panel">
                <label style="margin-left: 6px;">Room Model</label>
                <div class="scrollbox" style="width: calc(100% + 6px);height: calc(100% - 27px); margin-top: -5px;">
                    <div class="room-selector" v-for="model in roomModel" :key="model.name" v-on:click="selectedModel = model.name">
                        <img :src="roomModelImages[model.name]">
                        <transition name="slide-fade">
                        <div v-if="selectedModel == model.name" class="check"></div>
                        </transition>
                    </div>
                </div>
            </div>

        </Frame>
    </transition>
</template>

<script>

    import Frame from "../../layouts/Frame";
    import {LoadRoomEvent} from '../../../js/messages/outgoing/rooms/LoadRoomEvent';
    import roomModelImages from './../../../../public/img/rooms/*.png'
    import {CreateRoomEvent} from "../../../js/messages/outgoing/navigator/CreateRoomEvent";

    export default {
        name: 'RoomCreator',
        components: {
            Frame,
        },
        methods: {
            toggleVisibility: function() {
                this.$store.commit('toggleVisibility', 'roomcreator')
            },
            createRoom: function(name, model, maxusers, description) {
                CreateRoomEvent.createRoom(name, model, maxusers, description);
            }
        },
        data() {
            return {
                roomModel: {
                    1: {
                        name: 1
                    },
                    2: {
                        name: 2
                    },
                    3: {
                        name: 3
                    },
                    4: {
                        name: 4
                    },
                    5: {
                        name: 5
                    },
                    6: {
                        name: 6
                    },
                    7: {
                        name: 7
                    },
                    8: {
                        name: 8
                    },
                    9: {
                        name: 9
                    },
                    10: {
                        name: 10
                    },
                    11: {
                        name: 11
                    },
                    12: {
                        name: 12
                    },
                    13: {
                        name: 13
                    },
                    14: {
                        name: 14
                    },
                    15: {
                        name: 15
                    },
                    16: {
                        name: 16
                    },
                    17: {
                        name: 17
                    },
                    18: {
                        name: 18
                    },
                    19: {
                        name: 19
                    },
                    20: {
                        name: 20
                    },
                    21: {
                        name: 21
                    },
                    22: {
                        name: 22
                    },
                    23: {
                        name: 23
                    },
                    24: {
                        name: 24
                    },
                    25: {
                        name: 25
                    },
                    26: {
                        name: 26
                    },
                },
                selectedModel: 1,
                roomModelImages,
                roomName: '',
                roomDescription: '',
                roomMaxUsers: 10,
            }
        }
    };

</script>

<style scoped>

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

    .tab-container {
        width: 100%;
        height: 37px;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;

    }
    .tab-container button {
        border-radius: 0px;
        flex: 1;
        -webkit-text-stroke: 0.2px white;
    }

    input {
        width: 100%;
        padding: 10px 10px;
        border: none;
        border-top: 1px solid #444;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
        border-radius: 3px;
        font-family: 'Ubuntu', sans-serif;
        float: left;
        background-color: white;
        -webkit-box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        -moz-box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        margin-bottom: 10px;
    }
    label {
        -webkit-text-stroke: 0.2px white;
        font-size: 12px;
        line-height: 10px;
        margin-bottom: 5px;
    }
    textarea {
        width: 100%;
        padding: 10px 10px;
        border: none;
        border-top: 1px solid #444;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
        border-radius: 3px;
        font-family: 'Ubuntu', sans-serif;
        float: left;
        background-color: white;
        -webkit-box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        -moz-box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        margin-bottom: 10px;
    }
    select {
        width: 100%;
        padding: 10px 10px;
        border: none;
        border-top: 1px solid #444;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
        border-radius: 3px;
        font-family: 'Ubuntu', sans-serif;
        float: left;
        background-color: white;
        -webkit-box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        -moz-box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        box-shadow: inset 0px 2px 0px 0px rgba(0,0,0,0.12);
        margin-bottom: 10px;
    }
    .left-panel {
        position: absolute;
        width: calc(50% - 6px);
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .right-panel {
        position: absolute;
        width: 50%;
        height: 100%;
        right: 0;
        display: flex;
        flex-direction: column;
    }
    .left-panel button {
        padding: 15px 5px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        line-height: 25px;
        -webkit-text-stroke: 0.2px white;
        margin-bottom: 10px;
    }
    .separator {
        margin-bottom: 10px;
        height: 1px;
        width: 100%;
        background: rgba(255,255,255,0.05);
    }

    .room-selector {
        width: calc(50% - 12px);
        height: 100px;
        border-radius: 4px;
        background-color: rgba(0,0,0,0.1);
        background-image: url(./../../../../public/img/tile_background.png);
        margin: 6px 6px;
        cursor: pointer;
        position: relative;
    }
    .room-selector img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .room-selector:hover {
        background-color: rgba(0,0,0,0.2);
        transition: 0.2s;
    }
    .scrollbox {
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        float: left;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .check {
        width: 18px;
        height: 18px;
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
        background-image: url(./../../../../public/img/check.png);
    }

    .hiddentab {
        width: 100%;
        overflow: hidden;
        height: 22px;
        cursor: pointer;
        margin-bottom: 5px;
        color: #969496;
    }
    .hiddentab .header {
        width: 100%;
        position: relative;
        height: 21px;
        font-size: 13px;
        line-height: 18px;
        font-family: 'Ubuntu', sans-serif;
        font-weight: 500;
        letter-spacing: 1px;
        border-bottom: 1px solid #292829;
        color: #969496;
        text-transform: uppercase;
    }
    .hiddentab .header img {
        vertical-align: middle;
    }
    .hiddentab .but {
        width: 9px;
        height: 9px;
        position: absolute;
        right: 0;
        top: 4px;
    }
    .hiddentab .but.show {
        background-image: url(./../../../../public/img/plus.png);
    }
    .hiddentab .but.hide {
        background-image: url(./../../../../public/img/sub.png);
    }
    button:disabled {
        opacity: 0.75;
        cursor: not-allowed;
    }
</style>