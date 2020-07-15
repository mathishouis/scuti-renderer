Vue.component('loading', {
    data: function () {
        return {
        }
    },
    template: `
<div style="position: fixed; width: 100%; height: 100%; background-color: rgba(15, 15, 15, 0.95); z-index: 100000; background-repeat: no-repeat; background-position: center center; background-image: url(./client/img/loading.gif);">
</div>
`
})


Vue.component('leftbar', {
    data: function () {
        return {
        }
    },
    template: `
<div class="leftbar">
                    <div class="bottom_bar_left" style="left: 0;">
                        <div class="icons hotelview" style="margin: 9px 9px;">
                        </div>
                        <div class="icons navigator" style="width: 45px; margin: 8px 8px;">
                        </div>
                        <div class="icons catalog">
                        </div>
                        <div class="icons inventory">
                        </div>
                    </div>
                </div>
`
})


Vue.component('bar', {
    data: function () {
        return {
        }
    },
    template: `
<div class="bar">
                    <div class="bottom_bar_left">
                    </div>
                    <div class="bottom_bar_right">
                        <div class="icons friends">
                        </div>
                        <div class="icons messenger">
                        </div>

                    </div>
                </div>
`
})


Vue.component('navigator', {
    data: function () {
        return {
            navigatorTitle: "Rooms",
            navigatorPublic: "Public",
            navigatorPopular: "Popular",
            navigatorEvents: "Events",
            navigatorMe: "Me",
            navigatorSearch: "Search"
        }
    },
    template: `
<div  class="frame s1 resizable draggable" style="display: block;width: 391px; height: calc(100% - 45px - 167px); top: 45px; left: 90px;">
<div class="header" @mousedown="dragMouseDown">
<div class="title">
{{ navigatorTitle }}
</div>
<div class="buttonsright">
<button>
<img src="client/img/question_mark.png">
</button>
<button @click="close" class="close">
<img @click="close" class="close_img" src="client/img/cross.png">
</button>
</div>
</div>
<input :placeholder="navigatorSearch" style="margin-top: 14px;">
<div class="tabs_container" style="margin-top: 8px;">
<div class="tabs">
{{ navigatorPublic }}
</div>
<div class="tabs active">
{{ navigatorPopular }}
</div>
<div class="tabs">
{{ navigatorEvents }}
</div>
<div class="tabs">
{{ navigatorMe }}
</div>
</div>
<div class="scrollbox" style="height: calc(100% - 130px); margin-top: 10px;">
<div class="hiddentab" @click="hiddentab" style="padding: 0px 0px; height: auto;">
<div class="header">
PUBLIC ROOMS
<div class="but hide">
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
<div class="roomtab">
<div class="thumbnail" style="background-image: url(client/img/1.png);">
</div>
<div class="text">
Welcome Lounge<br/><span style="color: #8F8E90; font-size: 14px;">Official Room</span>
</div>
<div class="usercount green">
19
</div>
</div>
</div>
<div class="hiddentab" style="">
<div class="header">
ROOM BUNDLES
<div class="but show">
</div>
</div>
</div>
<div class="hiddentab" style="">
<div class="header">
OFFICIAL GAMES
<div class="but show">
</div>
</div>
</div>
<div class="hiddentab" style="">
<div class="header">
FANSITES
<div class="but show">
</div>
</div>
</div>
<div class="hiddentab" style="">
<div class="header">
MEETINGS
<div class="but show">
</div>
</div>
</div>
</div>
</div>
`
})


Vue.component('catalog', {
    data: function () {
        return {
            catalogTitle: "Catalog",
            catalogSearch: "Search"
        }
    },
    template: `
<div  class="frame s1 resizable draggable" style="display: block;width: 724px; height: 450px; top: 45px; left: 490px;">
                    <div class="header" @mousedown="dragMouseDown">
                        <div class="title" >
                            {{ catalogTitle }}
                        </div>
                        <div class="buttonsright" >
                            <button>
                                <img src="client/img/question_mark.png">
                            </button>
                            <button @click="close" class="close">
                                <img @click="close" class="close_img" src="client/img/cross.png">
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


var app = new Vue({
    el: '#app',
    data: {
    }

})

