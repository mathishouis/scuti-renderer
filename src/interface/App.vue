<template>
    <div class="scuti-main-component">
        <RoomView></RoomView>
        <ToolBar></ToolBar>
        <ChatInput></ChatInput>
        <Navigator></Navigator>
        <RoomCreator></RoomCreator>
    </div>
</template>

<script>

    import ToolBar from "./components/ToolBar/ToolBar";
    import ChatInput from "./components/Chat/ChatInput";
    import RoomView from "./components/Room/RoomView";
    import Navigator from "./components/Navigator/Navigator";
    import RoomCreator from "./components/Navigator/RoomCreator";
    import {client} from "../js/main";

    export default {
        name: 'App',
        components: {
            RoomCreator,
            Navigator,
            ToolBar,
            ChatInput,
            RoomView,
        },
    };

</script>

<style scoped>
    body, html {
        width: 100%;
        height: 100%;
        font-family: Ubuntu,sans-serif;
        margin: 0;
        padding: 0;
        overflow: hidden;
        image-rendering: pixelated;
        -webkit-user-select: none;
        user-select: none;
        background-color: #212225;
    }

    body {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        text-align: left;
    }
</style>