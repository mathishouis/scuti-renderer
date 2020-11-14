<template>
    <div class="frame" v-if="this.$store.state.visibility.furniviewer">
        <div class="tab-container">
            <button>Move</button>
            <button>Rotate</button>
            <button>Pick up</button>
        </div>
    </div>
</template>

<script>


    export default {
        name: "FurniViewer",
    }
</script>

<style scoped>
    .frame {
        position: fixed;
        width: 230px;
        height: 270px;
        bottom: 75px;
        right: 20px;
        border-radius: 4px;
        background: rgba(27,28,30,0.95);
        -webkit-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 55px -20px rgba(0,0,0,0.75);
    }
    .tab-container {
        width: 100%;
        height: 37px;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        bottom: 0px;
        position: absolute;

    }
    .tab-container button {
        border-radius: 0px;
        flex: 1;
        -webkit-text-stroke: 0.2px white;
    }
</style>