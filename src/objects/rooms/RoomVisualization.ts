import { Container } from "pixi.js";
import { Room } from "./Room.ts";
import { TilePart } from "./parts/TilePart.ts";
import { PartLayer } from "./layers/PartLayer.ts";
import { RoomPart } from "./parts/RoomPart.ts";
import { IRoomLayers } from "../../interfaces/IRoomLayers.ts";
import { StairPart } from "./parts/StairPart.ts";
import { Vector2D, Vector3D } from "../../types/Vector.ts";
import { GreedyMesher } from "./GreedyMesher.ts";
import { StairType } from "../../enums/StairType.ts";
import { Direction } from "../../enums/Direction.ts";

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
        const greedyMesher = new GreedyMesher(this.room.heightMap);
        greedyMesher.getParts().forEach((block: Record<'startPos' | 'size', Vector2D | Vector3D>) => {
            const tilePart = new TilePart({
                material: this.room.configuration.floorMaterial,
                position: block.startPos as Vector3D,
                size: block.size as Vector2D,
                thickness: this.room.configuration.floorThickness,
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
            const stair = new StairPart({
                material: this.room.configuration.floorMaterial,
                position: block.startPos,
                length: block.length,
                thickness: this.room.configuration.floorThickness,
                direction: block.direction,
                leftCorner: block.leftCorner,
                rightCorner: block.rightCorner
            });
            this.add(stair);
        });
    }

    public update(): void {
        this.destroy();
        this.render();
    }

    public destroy(): void {
        [...this.layers.parts.childrens].forEach((part: RoomPart) => {
            part.container.destroy();
            this.layers.parts.remove(part)
        });
    }

    public add(item: RoomPart): void {
        this.layers.parts.add(item);

        item.room = this.room;
        item.render();
    }
}
