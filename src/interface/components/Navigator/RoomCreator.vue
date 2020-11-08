<template>
    <Frame v-if="this.$store.state.visibility.roomcreator" width="600px" height="440px">
        <template #header>
            <div class="title">Room Creation</div>
            <div class="right">
                <button style="height: 22px;" v-on:click="toggleVisibility"><img src="./../../../../public/img/cross.png"></button>
            </div>
        </template>
        <div class="left-panel">
            <label>Room name</label>
            <input>
            <label>Room description</label>
            <textarea rows="2"></textarea>
            <div class="separator"></div>
            <label>Category</label>
            <select>
                <option value="0">Trading</option>
            </select>
            <label>Max users</label>
            <select>
                <option value="0">10</option>
            </select>
            <div class="separator"></div>
            <button class="green"><img src="./../../../../public/img/CreateRoom.png">Create room</button>
        </div>
        <div class="right-panel">
            <label style="margin-left: 6px;">Room Model</label>
            <div class="scrollbox" style="width: calc(100% + 6px);height: calc(100% - 27px); margin-top: -5px;">
                <div class="room-selector" v-for="model in roomModel" :key="model.name" v-on:click="selectedModel = model.name">
                    <img :src="roomModelImages[model.name]">
                    <div v-if="selectedModel == model.name" class="check"></div>
                </div>
            </div>
        </div>

    </Frame>
</template>

<script>

    import Frame from "../../layouts/Frame";
    import {LoadRoomEvent} from '../../../js/messages/outgoing/rooms/LoadRoomEvent';
    import roomModelImages from './../../../../public/img/rooms/*.png'

    export default {
        name: 'RoomCreator',
        components: {
            Frame,
        },
        methods: {
            toggleVisibility: function() {
                this.$store.commit('toggleVisibility', 'roomcreator')
            },
            createRoom: function(id) {
                this.$store.commit('createRoom', id);
            }
        },
        data() {
            return {
                roomModel: {
                    model_a: {
                        name: "model_a"
                    },
                    model_b: {
                        name: "model_b"
                    },
                    model_c: {
                        name: "model_c"
                    },
                    model_d: {
                        name: "model_d"
                    },
                    model_e: {
                        name: "model_e"
                    },
                    model_f: {
                        name: "model_f"
                    },
                    model_g: {
                        name: "model_g"
                    },
                    model_h: {
                        name: "model_h"
                    },
                    model_i: {
                        name: "model_i"
                    },
                    model_j: {
                        name: "model_j"
                    },
                    model_k: {
                        name: "model_k"
                    },
                    model_l: {
                        name: "model_l"
                    },
                    model_m: {
                        name: "model_m"
                    },
                    model_n: {
                        name: "model_n"
                    },
                    model_o: {
                        name: "model_o"
                    },
                    model_p: {
                        name: "model_p"
                    },
                    model_q: {
                        name: "model_q"
                    },
                    model_r: {
                        name: "model_r"
                    },
                    model_t: {
                        name: "model_t"
                    },
                    model_u: {
                        name: "model_u"
                    },
                    model_v: {
                        name: "model_v"
                    },
                    model_w: {
                        name: "model_w"
                    },
                    model_x: {
                        name: "model_x"
                    },
                    model_y: {
                        name: "model_y"
                    },
                    model_z: {
                        name: "model_z"
                    },
                    model_0: {
                        name: "model_0"
                    },
                },
                selectedModel: "model_a",
                roomModelImages,
            }
        }
    };

</script>

<style scoped>

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
</style>