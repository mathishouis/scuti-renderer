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

        console.log(heightmap);

        client.currentRoom = new RoomEngine(client.app,client.container, {
            'floor': heightmap,
            'tileThickness': floorThickness,
            'wallHeight': wallHeight,
            'furnitures': [
                { id: 13, baseId: 2567, positions: {x: 0, y: 0, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2567, positions: {x: 0, y: 3, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2567, positions: {x: 3, y: 0, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2567, positions: {x: 3, y: 3, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2645, positions: {x: 5, y: 1, z: 1}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 5, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 3119, positions: {x: 4, y: 1, z: 0}, direction: 0, state: 3},
                { id: 13, baseId: 2643, positions: {x: 3, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 8262, positions: {x: 3, y: 1, z: 1}, direction: 2, state: 0},
                { id: 13, baseId: 8261, positions: {x: 2, y: 1, z: 1}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 2, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 2674, positions: {x: 1, y: 1, z: 0}, direction: 0, state: 0},
                { id: 13, baseId: 3705, positions: {x: 2, y: 2, z: 0.1}, direction: 2, state: 0},
                { id: 13, baseId: 2650, positions: {x: 3, y: 3, z: 0.1}, direction: 6, state: 0},
                { id: 13, baseId: 2643, positions: {x: 1, y: 2, z: 0}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 1, y: 3, z: 0}, direction: 2, state: 0},
                { id: 13, baseId: 2643, positions: {x: 1, y: 4, z: 0}, direction: 2, state: 0},
                { id: 13, baseId: 3704, positions: {x: 2, y: 4, z: 0}, direction: 4, state: 0},
                { id: 13, baseId: 3114, positions: {x: 2, y: 5, z: 0}, direction: 0, state: 1},
                { id: 13, baseId: 2643, positions: {x: 1, y: 5, z: 0}, direction: 2, state: 0},
            ]
        }).renderRoom();


    }
}