<template>
    <div>
        <div class="frame" :style="{ width: width, height: height }" v-drag:dragger>
            <div class="header" id="dragger">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import drag from '@branu-jp/v-drag'

    export default {
        name: 'Frame',
        props: ['width', 'height'],
        directives: {
            drag
        },
    };

</script>

<style scoped>

    .frame {
        left: 10px;
        top: 10px;
        border-radius: 4px;
        background: rgba(27,28,30,0.95);
        height: 550px;
        -webkit-tap-highlight-color: transparent;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        display: flex;
        flex-direction: column;
        padding: 12px 12px;
        position: absolute;
        -webkit-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);

    }
    .frame .header {
        height: 30px;
        width: 100%;
        font-weight: bold;
        position: relative;
    }
    .frame .header .title {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .frame .header .title.left {
        left: 0px;
        transform: none;
    }
    .frame .header .right {
        height: 22px;
        position: absolute;
        right: 0;
    }
    .frame .content {
        height: calc(100% - 30px);
        width: 100%;
        position: relative;
        margin-top: 8px;
    }

</style>