import $ from "jquery";
import {client} from "../../../main";
import {RoomEngine} from "../../../habbohotel/rooms/RoomEngine";
import {store} from "../../../../interface/store/store";
import {Log} from "../../../util/logger/Logger";


export class LoadRoomMessage {
    constructor(packet) {
        this.packet = packet;
    }

    execute() {
        store.state.visibility.landingview = false;
        store.state.visibility.navigator = false;

        var heightmap = this.packet.data["heightmap"]
        var floorThickness = this.packet.data["floorThickness"]
        var wallHeight = this.packet.data["wallHeight"]
        var furnitures = this.packet.data["furnitures"]

        store.state.currentRoom.name = this.packet.data["name"]
        store.state.currentRoom.owner_name = this.packet.data["ownerName"]

        console.log(this.packet.data);



        client.currentRoom = new RoomEngine(client.app,client.container, {
            'floor': heightmap,
            'tileThickness': floorThickness,
            'wallHeight': wallHeight,
            'furnitures': furnitures

        })
        client.currentRoom.render();

    }
}