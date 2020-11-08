<template>
    <div class="bobbax-toolbar-component">
        <div class="gradient">

        </div>
        <div class="bottom-left">
            <ul class="list-group">
                <li class="list-group-item" v-on:click="toggleVisibility('landingview')">
                    <i class="icon icon-habbo"></i>
                </li>
                <li class="list-group-item" v-on:click="toggleVisibility('navigator')">
                    <i class="icon icon-rooms"></i>
                </li>
                <li class="list-group-item" v-on:click="toggleVisibility('catalog')">
                    <i class="icon icon-catalog"></i>
                </li>
            </ul>
        </div>
        <div class="bottom-center-left" v-if="this.$store.state.visibility.landingview == false">
            <ul class="list-group">
                <li class="list-group-item avatar-image">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAACCCAYAAADGxd9AAAAEk0lEQVR4Xu3bsWtTURQG8NslIB2MSxZBOoqDCioIxaGLIIiToCB1EdQ/QZcMXdTJua5FqOCkouLiIEKhujgo6FKkU0CIQhG6RM7tO7cnN/elzyLfvYnfG6xJX/L1/d7nubcBZxwPiMAMJIUhjtCgEhCa0CABUAwbTWiQACiGjSY0SAAUw0YTGiQAimGjCQ0SAMWw0YQGCYBi2GhCgwRAMWw0oUECoBg2mtAgAVAMG01okAAoho0mNEgAFMNGExokAIphowkNEgDFsNGEBgmAYthoQoMEQDFsNKFBAqAYNprQIAFQzDQ2euBcef9lZFqhpaf22rLjTyV0f/Gea6/cVWxBjuFBA2M3ZlKgFasOaKi9Ai2HYG9c6bq5J0uEHlOtgKtwdedW7fXf1nNfb35xZztzrt06YNsNb7IGltrogYL1t3+P4AiePC9f9dDz1nob/ilF1mbnXiBLgB4ZC4IcAyuuwlpsiyzAHtfcBDOv//tGjzRYobS5qWbXjhKDzEaPKg1k4Yrb6OduNSaaoNsmG2QuhsbbQ8dNju+Hbfa4caLI0VaPo0PbnJrB8YIXA1s9vVG6E7l/5qK7fXQ++86jhMVQnMLYiNGajI3EwucW3533b7Vy7o0rAbsY6NWF635L1uSofgFJnqrA9puKfWf9RbZZXRS07n9lL2zR9bECpzDrbpAgmyPb9WYLjmAG0mg9BFlxLfJ+gNvdZddfuuU6qx9c7+ppNtpC25sg6NLkv0U+/Gnn96Ctp4/819zYRTbaNns/yNLi2cs3AzKhd6sbRoeODZ3XddB29todht8/d5fDO7eOnXLbnz/6x/L3XOOjmEbrPjreUcQjQ4EtpoyFoW1hNZflOZnNAs3RYVpdt3OwjbXA9nyLHePKeYLNRu+I7fXhvh8JMnvtIqfYMXR80wgdNVraG+19wxmpRc5C62vlPGmvHrmR5ecoZUaryUCx4gUutchVC1vYI9ubVDPDs11vtuC6eSwj5NLjeXfwyOzQKdLyVFOjRc69fdXxr1u40AuvNzcg2/VmC/4X0PY9tN0PH7TdyeOtgB39y8h2vdmCx0D7hTG1rdNxEM9fabW2VqDlEGxpNaHHS4fx8fP7VhgjOj7inYZi/vj6y728sTY0MvRBtcBmK1a24D0aHVr97fmm65w4NIStr236+YfcrGfX3mdd/IuHFh1pY1NU2+pSxkbWO9yg0fEpI3NbTxg3Mkpo86RBJxfJcTesFORJhPbYqX12DF4S8qRCe2z5Q8BTR7XwFXV9JS+GTcZ43QdRxV1XcT9QE91JPIfQoLtGaEKDBEAxbDShQQKgGDaa0CABUAwbTWiQACiGjSY0SAAUw0YTGiQAimGjCQ0SAMWw0YQGCYBi2GhCgwRAMWw0oUECoBg2mtAgAVAMG01okAAoho0mNEgAFMNGExokAIphowkNEgDFsNGEBgmAYthoQoMEQDFsNKFBAqAYNprQIAFQDBtNaJAAKIaNJjRIABTDRhMaJACKYaMJDRIAxbDRhAYJgGLYaEKDBEAxbDShQQKgGDaa0CABUAwbTWiQACiGjQZB/wGXUcaSIFoQlAAAAABJRU5ErkJggg==">
                </li>
            </ul>
        </div>
        <div class="bottom-center-right" v-if="this.$store.state.visibility.landingview == false">
            <ul class="list-group">
                <li id="inventory" class="list-group-item">
                    <i class="icon icon-inventory"></i>
                </li>
            </ul>
        </div>
        <div class="bottom-right">
            <ul class="list-group">
                <li class="list-group-item">
                    <i class="icon icon-friends"></i>
                </li>
                <li class="list-group-item">
                    <i class="icon icon-message"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {client} from "./../../../js/main";

    export default {
        name: 'ToolBar',
        methods: {
            toggleVisibility: function(frame) {
                this.$store.commit('toggleVisibility', frame)
            }
        }
    };

</script>

<style scoped>

    *, :after, :before {
        box-sizing: border-box;
    }

    img, svg {
        vertical-align: middle;
    }

    .bobbax-toolbar-component {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        z-index: 1000;
    }

    .bottom-left {
        height: 100%;
        position: absolute;
        left: 10px;
    }

    .bottom-right {
        height: 100%;
        position: absolute;
        right: 10px;
    }
    .bottom-center-left {
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        margin-left: -285px;
    }
    .bottom-center-right {
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        margin-left: 285px;
    }

    .list-group {
        display: flex;
        flex-direction: row;
        padding-left: 0;
        border-radius: 0;
        margin: 0;
    }

    .list-group-item {
        vertical-align: middle;
        display: flex;
        margin: 5px;
        margin-left: 13px;
        margin-right: 13px;
        cursor: pointer;

    }
    .list-group .list-group-item.avatar-image {
        width: 75px;
        height: 70px;
        overflow: hidden;
    }

    .list-group .list-group-item.avatar-image img {
        position: absolute;
        top: -35px;
    }

    .gradient {
        width: 100%;
        height: 100%;
        position: absolute;
        background: linear-gradient(0deg, rgba(21,22,24,1) 0%, rgba(253,187,45,0) 100%);
    }


</style>