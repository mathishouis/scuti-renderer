<template>
    <div class="scuti-main-component">
        <RoomView></RoomView>
        <FurniViewer></FurniViewer>
        <LandingView></LandingView>
        <ToolBar></ToolBar>
        <RoomTool></RoomTool>
        <ChatInput></ChatInput>
        <Navigator></Navigator>
        <RoomCreator></RoomCreator>
        <Catalog></Catalog>
        <Splash></Splash>
    </div>
</template>

<script>

    import ToolBar from "./components/ToolBar/ToolBar";
    import ChatInput from "./components/Chat/ChatInput";
    import RoomView from "./components/Room/RoomView";
    import Navigator from "./components/Navigator/Navigator";
    import RoomCreator from "./components/Navigator/RoomCreator";
    import Catalog from "./components/Catalog/Catalog";
    import {client} from "../js/main";
    import LandingView from "./components/LandingView/LandingView";
    import RoomTool from "./components/Room/RoomTool";
    import FurniViewer from "./components/Furni/FurniViewer";
    import Splash from "./components/Splash/Splash";

    export default {
        name: 'App',
        components: {
            Splash,
            LandingView,
            RoomCreator,
            Navigator,
            ToolBar,
            ChatInput,
            RoomView,
            Catalog,
            RoomTool,
            FurniViewer,
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