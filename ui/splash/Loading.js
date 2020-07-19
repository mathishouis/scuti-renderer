import Main from '../../modules/Main.js'

export default class Loading {
    constructor() {
        this.state = "hello";
    }
    static import() {
        return Vue.component('loading', {
            data: function () {
                return {
                    visible: true,
                    gameState: Main.getGame().state
                }
            },
            template: `
<div v-if="gameState != 'loaded'" v-show="visible" style="position: fixed; width: 100%; height: 100%; background-color: rgba(15, 15, 15, 0.95); z-index: 100000; background-repeat: no-repeat; background-position: center center; background-image: url(./client/img/loading.gif);">
</div>
`
        })
    }
}