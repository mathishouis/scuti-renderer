import {Container} from "pixi.js";
import {Room} from "./Room.ts";
import {TilePart} from "./parts/TilePart.ts";
import {PartLayer} from "./layers/PartLayer.ts";
import {RoomPart} from "./parts/RoomPart.ts";
import {RoomLayers} from "../../interfaces/RoomLayers.ts";
import {FloorMaterial} from "./materials/FloorMaterial.ts";
import {TileEvent} from "../../interfaces/Events.ts";
import {StairPart} from "./parts/StairPart.ts";
import {Direction, Position2D, Position3D} from "../../interfaces/Position.ts";
import {StairCorner} from "../../interfaces/StairCorner.ts";
import {GreedyMesher} from "./GreedyMesher.ts";
import {GreedyMesherPart} from "../../interfaces/GreedyMesherPart.ts";

export class RoomVisualization {
    public container: Container = new Container();
    public layers: RoomLayers = {} as RoomLayers;

    constructor(
        public room: Room
    ) {
        this._initializeLayers();

        /*const graphic = new Graphics()
            .beginFill(0xFFFFFF)
            .drawRect(0, 0, 200, 150)
            .beginFill(0x00FF00)
            .drawRect(95, 70, 10, 10)
            .endFill();

        this.container.addChild(graphic);*/
        /*const tilePart = new TilePart({
            position: { x: 0, y: 0, z: 0 },
            size: { x: 1, y: 2, z: 1 }
        });
        this.add(tilePart);*/
        /*const tilePart4 = new TilePart({
            material: new FloorMaterial(111),
            //position: { x: 1, y: -2, z: 1 },
            position: { x: 0, y: 0, z: 0 },
            size: { x: 1, y: 1 },
            thickness: 0
        });
        this.add(tilePart4);
        const stair3 = new StairPart({
            direction: Direction.WEST,
            material: new FloorMaterial(111),
            thickness: 8,
            position: { x: 0, y: 10, z: 0 },
            length: 7,
            leftCorner: StairCorner.NONE,
            rightCorner: StairCorner.INNER
        });
        this.add(stair3);
        stair3.eventManager.onPointerMove = (event: TileEvent) => {
            console.log(event.position);
        }
        const tilePart5 = new TilePart({
            material: new FloorMaterial(111),
            position: { x: 0, y: 0, z: 1 },
            size: { x: 1, y: 1 },
            thickness: 8
        });
        this.add(tilePart5);
        const tilePart = new TilePart({
            material: new FloorMaterial(111),
            position: { x: 2, y: 0, z: 0 },
            size: { x: 6, y: 5 },
            thickness: 8
        });
        this.add(tilePart);
        const tilePart2 = new TilePart({
            material: new FloorMaterial(111),
            position: { x: 1, y: 8, z: 0 },
            size: { x: 6, y: 1 },
            thickness: 8
        });
        this.add(tilePart2);
        const tilePart3 = new TilePart({
            material: new FloorMaterial(111),
            position: { x: 0, y: 3, z: 0 },
            size: { x: 8, y: 4 },
            thickness: 8,
        });
        this.add(tilePart3);
        tilePart3.eventManager.onPointerMove = (event: TileEvent) => {
            console.log(event.position);
        }*/
        const greedyMesher = new GreedyMesher(this.room.heightMap);
        greedyMesher.getParts().forEach((block: Record<'startPos' | 'size', Position2D | Position3D>) => {
            const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
            const tilePart = new TilePart({
                material: new FloorMaterial(random),
                position: block.startPos as Position3D,
                size: block.size as Position2D,
                thickness: 8,
            });
            this.add(tilePart);
        });
        greedyMesher.getStairs().forEach((block: {
            startPos: Position3D,
            length: number,
            direction: Direction,
            leftCorner: StairCorner,
            rightCorner: StairCorner
        }) => {
            const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
            const stair = new StairPart({
                material: new FloorMaterial(random),
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

    private _initializeLayers(): void {
        this.layers.parts = new PartLayer(this.room);
    }

    public render(): void {
        // TODO: Destroy parts

    }

    public add(item: RoomPart): void {
        item.room = this.room;
        item.render();

        this.container.addChild(item.container);
        this.layers.parts.add(item);
    }
}
