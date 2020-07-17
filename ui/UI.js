import Catalogue from './catalogue/Catalogue.js'

Catalogue.import();

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





var app = new Vue({
    el: '#app',
    data: {

    }

})

