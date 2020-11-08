<template>
    <div class="landing-view" v-if="this.$store.state.visibility.landingview">
        <div class="drape">

        </div>
        <div class="left">

        </div>
        <div class="right">

        </div>
    </div>
</template>

<script>


    export default {
        name: 'LandingView',
    };

</script>

<style scoped>

    .landing-view {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #75BFE4;
        background-image: url(./../../../../public/img/hotel_view/easter18_background_gradient.png);
        background-size: auto 100%;
    }
    .landing-view .left {
        height: 998px;
        width: 1006px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        background-image: url(./../../../../public/img/hotel_view/easter18_background_left.png);
        background-position: bottom left;
        background-repeat: no-repeat;
    }
    .landing-view .right {
        height: 463px;
        width: 526px;
        position: absolute;
        bottom: 0px;
        right: 0px;
        background-image: url(./../../../../public/img/hotel_view/hotel_right.png);
        background-position: bottom right;
        background-repeat: no-repeat;
    }
    .landing-view .drape {
        height: 200px;
        width: 145px;
        position: absolute;
        top: 0px;
        left: 100px;
        background-image: url(./../../../../public/img/hotel_view/reception_logo_drape.png);
        background-position: bottom left;
        background-repeat: no-repeat;
    }
</style>