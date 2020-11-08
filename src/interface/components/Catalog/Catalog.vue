<template>
    <transition name="slide-fade">
        <Frame v-if="this.$store.state.visibility.catalog" width="600px" height="450px" >
            <template #header >
                <div class="navigatorDragger">
                    <div class="title">Catalog</div>
                    <div class="right">
                        <button style="height: 22px;"><img src="./../../../../public/img/question_mark.png"></button>
                        <button style="height: 22px;" v-on:click="toggleVisibility"><img src="./../../../../public/img/cross.png"></button>
                    </div>
                </div>
            </template>
            <div class="left-panel">
                <input placeholder="Search...">
                <div class="separator"></div>
            </div>
            <div class="right-panel">
                <div class="tab-container">
                    <button>Featured</button>
                    <button>Popular</button>
                    <button>Events</button>
                    <button>Me</button>
                </div>
                <div class="separator"></div>
            </div>

        </Frame>
    </transition>
</template>

<script>

    import Frame from "../../layouts/Frame";
    import {LoadRoomEvent} from '../../../js/messages/outgoing/rooms/LoadRoomEvent';

    export default {
        name: 'Catalog',
        components: {
            Frame,
        },
        methods: {
            toggleVisibility: function() {
                this.$store.commit('toggleVisibility', 'catalog')
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
        width: 190px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .right-panel {
        position: absolute;
        width: calc(100% - 202px);
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