<template>
    <transition name="fade">
        <div v-if="this.$store.state.visibility.splash" class="splash"></div>
    </transition>
</template>

<script>
    export default {
        name: "Splash",
        mounted() {
            setTimeout(() => {
                this.$store.state.visibility.splash = false;
            }, 500)
        }
    }
</script>

<style scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .splash {
        position: fixed;
        height: 100%;
        width: 100%;
        background: radial-gradient(circle, rgba(33,34,37,1) 0%, rgba(20,21,23,1) 100%);
        z-index: 100000000;
    }

</style>