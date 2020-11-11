<template>
        <div v-show="this.$store.state.visibility.landingview == false">
            <transition name="slide-fade">
                <div class="room-tool" v-show="showRoomTool">
                    <div class="text">
                        Room Name<br/><span style="color: #8F8E90; font-size: 13px; ">Owner: </span><span style="color: #72BBC1; font-size: 13px; ">Room Owner</span>
                    </div>
                    <div class="button-area">
                        <button><img src="./../../../../public/img/settings.png"></button>
                        <button><img src="./../../../../public/img/zoom.png"></button>
                        <button><img src="./../../../../public/img/chat_history.png"></button>
                        <button><img src="./../../../../public/img/heart.png"></button>
                    </div>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="toggle" v-on:click="showRoomTool = !showRoomTool">
                    <div v-bind:class="['arrow', showRoomTool ? 'active' : '']"></div>
                </div>
            </transition>
        </div>
</template>

<script>
    export default {
        name: "RoomTool",
        data() {
            return {
                showRoomTool: true,
            }
        }
    }
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
    .toggle {
        left: 20px;
        bottom: 75px;
        border-radius: 4px;
        background: rgba(27,28,30,0.95);
        height: 94px;
        width: 20px;
        -webkit-tap-highlight-color: transparent;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        -webkit-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
    }
    .toggle .arrow {
        background-image: url(./../../../../public/img/chevron_bottom.png);
        width: 9px;
        height: 6px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%) rotate(-90deg);
    }
    .toggle .arrow.active {
        transform: translate(-50%,-50%) rotate(90deg);
    }

    .room-tool {
        left: 50px;
        bottom: 75px;
        border-radius: 4px;
        background: rgba(27,28,30,0.95);
        height: 94px;
        width: 244px;
        -webkit-tap-highlight-color: transparent;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        -webkit-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
    }
    .room-tool .text {
        line-height: 14px;
        left: 12px;
        top: 12px;
        position: absolute;
    }
    .room-tool .button-area {
        left: 9px;
        bottom: 9px;
        position: absolute;
    }
    .room-tool .button-area button {
        margin: 3px 3px;
        height: 28px;
        width: 28px;
        float: left;
    }
</style>