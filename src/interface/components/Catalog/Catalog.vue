<template>
    <transition name="slide-fade">
        <Frame v-show="this.$store.state.visibility.catalog" width="600px" height="450px" >
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
                <div class="scrollbox" style="height: calc(100% - 94px); margin-bottom: 12px;">
                    <div class="menu-container">
                        <button>
                            <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_11.png"> HOME <img class="chevron" src="./../../../../public/img/chevron_bottom.png">
                        </button>
                        <button>
                            <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_209.png"> Credits <img class="chevron" src="./../../../../public/img/chevron_bottom.png">
                        </button>
                        <button>
                            <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_206.png"> Furni by type <img class="chevron" src="./../../../../public/img/chevron_bottom.png">
                        </button>
                        <button>
                            <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_206.png"> Furni by culture <img class="chevron active" src="./../../../../public/img/chevron_bottom.png">
                        </button>
                        <div class="subcategory">
                            <button>
                                <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_281.png"> Tokyo
                            </button>
                            <button>
                                <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_36.png"> Japan
                            </button>
                            <button>
                                <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_38.png"> Tribe
                            </button>
                            <button>
                                <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_273.png"> Greek
                            </button>
                            <button>
                                <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_59.png"> Tiki
                            </button>
                            <button>
                                <img src="https://www.habboassets.com/assets/images/catalog/icons/icon_171.png"> Maya
                            </button>
                        </div>
                    </div>
                </div>
                <div class="scrollbox" style="height: 32px;">
                    <div class="menu-container" style="display: flex; flex: 0 1 auto; flex-direction: row;">
                        <button style="text-align: right; width: 40%;">
                            <img src="./../../../../public/img/credits.png" style="float: left;"> 100000
                        </button>
                        <button style="text-align: right; width: 30%;">
                            <img src="./../../../../public/img/duckets.png" style="float: left;"> 100
                        </button>
                        <button style="text-align: right; width: 30%;">
                            <img src="./../../../../public/img/diamonds.png" style="float: left;"> 5
                        </button>
                    </div>
                </div>
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

    .menu-container {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .menu-container button {
        border-radius: 0px;
        text-align: left;
        height: 32px;
        padding: 5px 7px;
        -webkit-text-stroke: 0.2px white;
        text-transform: uppercase;
        font-size: 12px;
    }
    .menu-container button img {
        vertical-align: middle;
        margin-right: 5px;
    }
    .menu-container button img.chevron {
        position: absolute;
        right: 5px;
        margin-top: 5px;
        transform: rotate(180deg);
    }
    .menu-container button img.chevron.active {
        transform: rotate(0deg);
    }

    .menu-container .subcategory button {
        border-radius: 0px;
        text-align: left;
        height: 32px;
        padding: 7px 7px;
        -webkit-text-stroke: 0.2px white;
        text-transform: uppercase;
        font-size: 12px;
        width: 100%;
        background-color: #39383A;
        border-top: 1px solid #474647;
        border-bottom: 1px solid #201F21;
    }

    .menu-container .subcategory button img {
        vertical-align: middle;
        margin-right: 5px;
        margin-left: 20px;
    }

    .menu-container .subcategory button img.chevron {
        position: absolute;
        right: 5px;
        margin-top: 5px;
    }
    .menu-container .subcategory button img.chevron.active {
        transform: rotate(180deg);
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
        width: 210px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .right-panel {
        position: absolute;
        width: calc(100% - 222px);
        height: 100%;
        right: 0;
        display: flex;
        flex-direction: column;
    }
    .separator {
        margin-bottom: 10px;
        height: 1px;
        width: 100%;
        background: rgba(255,255,255,0.05);
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

</style>