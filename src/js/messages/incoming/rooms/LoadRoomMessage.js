import $ from "jquery";
import {client} from "../../../main";
import {RoomEngine} from "../../../rooms/RoomEngine";


export class LoadRoomMessage {
    constructor(packet) {
        this.packet = packet;
    }

    execute() {
        var heightmap = this.packet.data["heightmap"]
        var floorThickness = this.packet.data["floorThickness"]
        var wallHeight = this.packet.data["wallHeight"]
        var furnitures = this.packet.data["furnitures"]

        console.log(heightmap);


        client.currentRoom = new RoomEngine(client.app,client.container, {
            'floor': heightmap,
            'tileThickness': floorThickness,
            'wallHeight': wallHeight,
            'furnitures': furnitures

        }).renderRoom();


    }
}