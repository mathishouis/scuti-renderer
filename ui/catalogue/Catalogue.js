export default class Catalogue {
    constructor() {
        this.state = "hello";
    }
    static import() {
return Vue.component('catalog', {
    data: function () {
        return {
            catalogTitle: "Catalog",
            catalogSearch: "Search",
            visible: true,
            positions: {
                clientX: undefined,
                clientY: undefined,
                movementX: 0,
                movementY: 0
            }
        }
    },
    methods: {
        dragMouseDown: function (event) {
            event.preventDefault()
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY
            var frame = event.target.parentElement
            frame.style.zIndex = "10";
            document.onmousemove = this.elementDrag
            document.onmouseup = this.closeDragElement
        },
        elementDrag: function (event) {
            event.preventDefault()
            var frame = event.target.parentElement
            this.positions.movementX = this.positions.clientX - event.clientX
            this.positions.movementY = this.positions.clientY - event.clientY
            this.positions.clientX = event.clientX
            this.positions.clientY = event.clientY

            if(frame.classList.contains('draggable') && event.target.classList.contains('handler')) {
                if(frame.offsetTop - this.positions.movementY < 0) {
                    frame.style.top = '0px'
                } else if(frame.offsetTop > window.screen.availHeight - frame.offsetHeight) {
                    frame.style.top = window.screen.availHeight - frame.offsetHeight + 'px'
                } else if(frame.offsetLeft > window.screen.availWidth - frame.offsetWidth) {
                    frame.style.left = window.screen.availWidth - frame.offsetWidth + 'px'
                }  else if(frame.offsetLeft - this.positions.movementX < 0) {
                    frame.style.left = '0px'
                } else {
                    frame.style.left = (frame.offsetLeft - this.positions.movementX) + 'px'
                    frame.style.top = (frame.offsetTop - this.positions.movementY) + 'px'
                }
            } else {
                
            }

        },
        closeDragElement () {
            document.onmouseup = null
            document.onmousemove = null
            var frame = event.target.parentElement
            frame.style.zIndex = "1"
        }
    },
    template: `
<div v-show="visible" class="frame s1 resizable draggable" style="display: block;width: 724px; height: 450px; top: 45px; left: 490px;">
<div class="header handler" @mousedown="dragMouseDown">
<div class="title" >
{{ catalogTitle }}
</div>
<div class="buttonsright" >
<button>
<img src="client/img/question_mark.png">
</button>
<button @click="visible = false" class="close">
<img class="close_img" src="client/img/cross.png">
</button>
</div>
</div>
<div class="catalogleft">
<input :placeholder="catalogSearch" style="">
<div class="scrollbox" style="height: calc(100% - 46px); margin-top: 10px;">
<div class="hiddentab" @click="hiddentab" style="padding: 0px 0px; height: 22px;">
<div class="header">
<img src="client/img/icon_213.png"> HOME
</div>

</div>
<div class="hiddentab" @click="hiddentab" style="padding: 0px 0px; height: auto;">
<div class="header">
<img src="client/img/icon_206.png"> NEWS FURNI
<div class="but hide">
</div>
</div>
<div class="header" style="margin-top: 3px;">
<img src="client/img/icon_291.png" style="margin-left: 20px;"> INDIA 2020
</div>
<div class="header" style="margin-top: 3px;">
<img src="client/img/icon_44474.png" style="margin-left: 20px;"> POKEMON
</div>

</div>
<div class="hiddentab" @click="hiddentab" style="padding: 0px 0px; height: 22px;">
<div class="header">
<img src="client/img/icon_202.png"> GAMES
<div class="but show">
</div>
</div>
<div class="header" style="margin-top: 3px;">
<img src="client/img/icon_291.png" style="margin-left: 20px;"> Battle banzai
</div>
<div class="header" style="margin-top: 3px;">
<img src="client/img/icon_44474.png" style="margin-left: 20px;"> Football
</div>
<div class="header" style="margin-top: 3px;">
<img src="client/img/icon_291.png" style="margin-left: 20px;"> Freeze
</div>
<div class="header" style="margin-top: 3px;">
<img src="client/img/icon_44474.png" style="margin-left: 20px;"> Jcp
</div>

</div>
<div class="hiddentab" @click="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_291.png"> INDIA 2020
<div class="but show">
</div>
</div>

</div>
<div class="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_55605.png"> DUCKETS
<div class="but show">
</div>
</div>

</div>
<div class="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_44474.png"> POKEMON
<div class="but show">
</div>
</div>

</div>
<div class="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_9992567.png"> MONEY BITCH
<div class="but show">
</div>
</div>

</div>
<div class="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_55605.png"> DUCKETS
<div class="but show">
</div>
</div>

</div>
<div class="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_202.png"> GAMES
<div class="but show">
</div>
</div>

</div>
<div class="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_291.png"> INDIA 2020
<div class="but show">
</div>
</div>

</div>
<div class="hiddentab" style="padding: 0px 0px;">
<div class="header">
<img src="client/img/icon_9992567.png"> MONEY BITCH
<div class="but show">
</div>
</div>

</div>
</div>
</div>
<div class="catalogright">
<div class="tabs_container" style="height: 37px;">
<div class="tabs" style="height: 37px; line-height: 34px;">
Frontpage
</div>
<div class="tabs active" style="height: 37px; line-height: 34px;">
Furni
</div>
<div class="tabs" style="height: 37px; line-height: 34px;">
Pets
</div>
<div class="tabs" style="height: 37px; line-height: 34px;">
Club
</div>
</div>
<div class="default_3x3" style="display: block;">
<div class="furniprev">
<div class="preview">
</div>
<div class="action">
<input style="width: 82px; float: right; padding: 13px 10px; text-align: right;" value="1">
<button style="height: auto; padding: 10px 10px">
<img src="client/img/gift.png">
</button>
<button style="height: auto; padding: 10px 10px">
<img src="client/img/buy.png">
</button>
</div>
</div>
<div class="scrollbox itemlist" style="">

<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>
<button style="margin: 5px 5px; height: 50px; width: 50px;">
<img src="client/img/darkelegant_c20_cupboard_icon.png">
</button>

</div>
</div>
<div class="club" style="display: none;">
<div class="banner">

</div>
<button class="blue" style="position: absolute; bottom: 60px; height: 50px; padding: 10px 20px; width: 100%;">
Adhérer
</button>
<button style="position: absolute; bottom: 0; height: 50px; margin-top: 110px; padding: 10px 20px; width: 100%;">
Offrir
</button>
</div>
</div>
</div>
`
})
        }
}