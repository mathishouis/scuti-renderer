<template>
    <div class="scuti-room-chatinput-component">
        <div class="chatinput-container">
            <input type="text" class="chat-input">
        </div>
        <div class="scuti-room-chatinput-styleselector-component">
            <i class="icon chatstyles-icon"></i>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'ChatInput',
    };

</script>

<style scoped>

    .scuti-room-chatinput-component {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        bottom: 10px;
        pointer-events: none;
        z-index: 1000;
    }

    .scuti-room-chatinput-component .chatinput-container {
        position: relative;
        width: 450px;
        height: 45px;
        left: 0px;
        border-radius: 10px;
        border: 3px solid #000;
        background: #ededed;
        pointer-events: all;
    }

    .scuti-room-chatinput-component .chatinput-container:before {
        content: "";
        position: absolute;
        width: 98%;
        height: 5px;
        border-radius: 5px;
        top: 3px;
        left: 0;
        right: 0;
        margin: auto;
        background: #fff;
        z-index: 1;
    }

    .scuti-room-chatinput-component .chatinput-container .chat-input {
        width: calc(100% - 25px);
        height: 100%;
        font-size: 18px;
        padding: 0 10px;
        outline: 0;
        border: 0;
        position: relative;
        background: transparent;
    }

    .scuti-room-chatinput-styleselector-component {
        display: flex;
        position: relative;
        right: -10px;
        pointer-events: all;
    }



</style>