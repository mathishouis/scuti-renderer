<template>
    <transition name="slide-fade">
        <Frame v-show="this.$store.state.visibility.navigator" width="400px" height="600px" >
            <template #header >
                <div class="navigatorDragger">
                    <div class="title">Navigator</div>
                    <div class="right">
                        <button style="height: 22px;"><img src="./../../../../public/img/question_mark.png"></button>
                        <button style="height: 22px;" v-on:click="toggleVisibility"><img src="./../../../../public/img/cross.png"></button>
                    </div>
                </div>
            </template>
            <div style="display: flex; flex-direction: column; height: 100%;">
                <input style="margin-top: 0px;" placeholder="Search for a room...">
                <div class="tab-container">
                    <button v-on:click="$store.state.navigator.currentTab = 'public'">Public</button>
                    <button v-on:click="$store.state.navigator.currentTab = 'popular'">Popular</button>
                    <button v-on:click="$store.state.navigator.currentTab = 'events'">Events</button>
                    <button v-on:click="myRooms()">Me</button>
                </div>



                <div class="scrollbox" style="height: calc(100% - 185px)" v-if="this.$store.state.navigator.currentTab == 'public'">
                    <div class="hiddentab" style="padding: 0px 0px; height: auto;">
                        <div class="header">
                            PUBLIC ROOMS
                            <div class="but hide">
                            </div>
                        </div>

                    </div>
                </div>




                <div class="scrollbox" style="height: calc(100% - 185px)" v-if="this.$store.state.navigator.currentTab == 'popular'">
                    <div class="hiddentab" style="padding: 0px 0px; height: auto;">
                        <div class="header">
                            MOST POPULAR ROOMS
                            <div class="but hide">
                            </div>
                        </div>
                        <div class="roomtab" v-for="room in this.$store.state.rooms" :key="room.id" v-on:click="loadRoom(room.id)">
                            <div class="thumbnail" style="background-image: url(./../../../../public/img/2.png);">
                            </div>
                            <div class="text">
                                {{ room.name }}<br/><span style="color: #8F8E90; font-size: 13px; ">Owner: </span><span style="color: #72BBC1; font-size: 13px; ">{{ room.ownerName }}</span>
                            </div>
                            <div v-bind:class="['usercount', room.users === 0 ? 'gray' : room.users > room.maxUsers / 2 ? room.users > room.maxUsers - 2 ? 'red' : 'orange' : 'green']">
                                <img src="./../../../../public/img/user.png"> {{ room.users }}
                            </div>
                            <div class="room-state">
                                <img v-if="room.state == 'locked'" src="./../../../../public/img/rooms/locked.png">
                                <img v-if="room.state == 'password'" src="./../../../../public/img/rooms/locked_pw.png">
                            </div>
                            <div class="room-info"></div>

                        </div>
                    </div>
                </div>



                <div class="scrollbox" style="height: calc(100% - 185px)" v-if="this.$store.state.navigator.currentTab == 'events'">
                    <div class="hiddentab" style="padding: 0px 0px; height: auto;">
                        <div class="header">
                            TOP PROMOTIONS
                            <div class="but hide">
                            </div>
                        </div>

                    </div>
                </div>



                <div class="scrollbox" style="height: calc(100% - 185px)" v-if="this.$store.state.navigator.currentTab == 'me'">
                    <div class="hiddentab" style="padding: 0px 0px; height: auto;">
                        <div class="header">
                            MY ROOMS
                            <div class="but hide">
                            </div>
                        </div>
                        <div class="roomtab" v-for="room in this.$store.state.navigator.tabs.me.category.my_rooms" :key="room.id" v-on:click="loadRoom(room.id)">
                            <div class="thumbnail" style="background-image: url(./../../../../public/img/2.png);">
                            </div>
                            <div class="text">
                                {{ room.name }}<br/><span style="color: #8F8E90; font-size: 13px; ">Owner: </span><span style="color: #72BBC1; font-size: 13px; ">{{ room.ownerName }}</span>
                            </div>
                            <div v-bind:class="['usercount', room.users === 0 ? 'gray' : room.users > room.maxUsers / 2 ? room.users > room.maxUsers - 2 ? 'red' : 'orange' : 'green']">
                                <img src="./../../../../public/img/user.png"> {{ room.users }}
                            </div>
                            <div class="room-state">
                                <img v-if="room.state == 'locked'" src="./../../../../public/img/rooms/locked.png">
                                <img v-if="room.state == 'password'" src="./../../../../public/img/rooms/locked_pw.png">
                            </div>
                            <div class="room-info"></div>

                        </div>
                        <div class="hiddentab" style="padding: 0px 0px; height: auto;">
                            <div class="header">
                                My Favorite Rooms
                                <div class="but show">
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div style="display: flex; flex-direction: row; height: 80px; margin-top: 12px;">
                    <button class="blue icon-button" style="width: calc(50% - 6px); margin-right: 6px;" v-on:click="openRoomCreator"><img src="./../../../../public/img/CreateRoom.png"><br>Create a room</button>
                    <button class="green icon-button" style="width: calc(50% - 6px); margin-left: 6px;"><img src="./../../../../public/img/RandomRoom.png"><br>Random room</button>
                </div>
            </div>

        </Frame>
    </transition>
</template>

<script>

    import Frame from "../../layouts/Frame";
    import {store} from "../../store/store";
    import {LoadRoomEvent} from '../../../js/messages/outgoing/rooms/LoadRoomEvent';
    import {RequestMyRoomsEvent} from "../../../js/messages/outgoing/navigator/RequestMyRoomsEvent";

    export default {
        name: 'Navigator',
        components: {
            Frame,
        },
        methods: {
            toggleVisibility: function() {
                this.$store.commit('toggleVisibility', 'navigator')
            },
            openRoomCreator: function() {
                this.$store.commit('toggleVisibility', 'roomcreator')
            },
            loadRoom: function(id) {
                this.$store.commit('loadRoom', id);
            },
            myRooms: function() {
                this.$store.state.navigator.currentTab = 'me'
                RequestMyRoomsEvent.myRooms();
            },
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

    .left-panel {
        position: absolute;
        width: 150px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .right-panel {
        position: absolute;
        width: calc(100% - 162px);
        height: 100%;
        right: 0;
        display: flex;
        flex-direction: column;
    }
    .icon-button {
        flex-direction: row; align-items: center;
        -webkit-text-stroke: 0.2px white;
    }
    .separator {
        margin-bottom: 10px;
        height: 1px;
        width: 100%;
        background: rgba(255,255,255,0.05);
    }

    .roomtab {
        height: 78px;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #292829;
        float: left;
        position: relative;
        cursor: pointer;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .roomtab .thumbnail {
        height: 65px;
        background-color: #000;
        border-radius: 3px;
        position: absolute;
        left: 0;
        width: 65px;
    }
    .roomtab .text {
        left: 80px;
        top: 7px;
        font-family: 'Ubuntu', sans-serif;
        color: white;
        font-size: 15px;
        position: absolute;
        line-height: 16px;
    }
    .roomtab .room-info {
        width: 18px;
        height: 18px;
        position: absolute;
        right: 0px;
        top: 30px;
        cursor: pointer;
        background-image: url(./../../../../public/img/room_info.png);
    }
    .roomtab .room-state {
        width: 13px;
        height: 15px;
        position: absolute;
        right: 28px;
        top: 29px;
    }
    .roomtab .usercount {
        left: 80px;
        height: 19px;
        width: 44px;
        top: 48px;
        border-radius: 3px;
        background-color: #ddd;
        font-family: 'Ubuntu', sans-serif;
        color: white;
        text-align: center;
        position: absolute;
        font-size: 13Px;
        line-height: 18px;
        font-weight: 500;
    }
    .roomtab .usercount.green {
        background-color: #4B9A38;
    }
    .roomtab .usercount.orange {
        background-color: #DB7F31;
    }
    .roomtab .usercount.red {
        background-color: #AE232D;
    }
    .roomtab .usercount.gray {
        background-color: #343435;
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