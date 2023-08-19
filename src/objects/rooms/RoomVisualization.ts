import { Container } from "pixi.js";
import { Room } from "./Room.ts";
import { TilePart } from "./parts/TilePart.ts";
import { PartLayer } from "./layers/PartLayer.ts";
import { RoomPart } from "./parts/RoomPart.ts";
import { IRoomLayers } from "../../interfaces/IRoomLayers.ts";
import { FloorMaterial } from "./materials/FloorMaterial.ts";
import { StairPart } from "./parts/StairPart.ts";
import { Vector2D, Vector3D } from "../../types/Vector.ts";
import { GreedyMesher } from "./GreedyMesher.ts";
import {StairType} from "../../enums/StairType.ts";
import {Direction} from "../../enums/Direction.ts";

export class RoomVisualization {
    public container: Container = new Container();
    public layers: IRoomLayers = {} as IRoomLayers;

    constructor(
        public room: Room
    ) {
        this._initializeLayers();
    }

    private _initializeLayers(): void {
        this.layers.parts = new PartLayer(this.room);
    }

    public render(): void {
        this.destroy();

        const greedyMesher = new GreedyMesher(this.room.heightMap);
        greedyMesher.getParts().forEach((block: Record<'startPos' | 'size', Vector2D | Vector3D>) => {
            //const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
            const tilePart = new TilePart({
                material: new FloorMaterial(111),
                position: block.startPos as Vector3D,
                size: block.size as Vector2D,
                thickness: 8,
            });
            this.add(tilePart);
        });
        greedyMesher.getStairs().forEach((block: {
            startPos: Vector3D,
            length: number,
            direction: Direction,
            leftCorner: StairType,
            rightCorner: StairType
        }) => {
            //const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
            const stair = new StairPart({
                material: new FloorMaterial(111),
                position: block.startPos,
                length: block.length,
                thickness: 8,
                direction: block.direction,
                leftCorner: block.leftCorner,
                rightCorner: block.rightCorner
            });
            this.add(stair);
        });
    }

    public destroy(): void {
        [...this.layers.parts.childrens].forEach((part: RoomPart) => {
            return part.container.destroy();
        });
        this.layers.parts.childrens = [];
    }

    public add(item: RoomPart): void {
        item.room = this.room;
        item.render();

        this.layers.parts.add(item);
    }
}
