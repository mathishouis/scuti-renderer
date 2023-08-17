import {Container} from "pixi.js";
import {Room} from "./Room.ts";
import {TilePart} from "./parts/TilePart.ts";
import {PartLayer} from "./layers/PartLayer.ts";
import {RoomPart} from "./parts/RoomPart.ts";
import {RoomLayers} from "../../interfaces/RoomLayers.ts";
import {FloorMaterial} from "./materials/FloorMaterial.ts";
import {TileEvent} from "../../interfaces/Events.ts";
import {StairPart} from "./parts/StairPart.ts";
import {Direction} from "../../interfaces/Position.ts";
import {StairCorner} from "../../interfaces/StairCorner.ts";

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
        const tilePart4 = new TilePart({
            material: new FloorMaterial(111),
            //position: { x: 1, y: -2, z: 1 },
            position: { x: 0, y: 0, z: 0 },
            size: { x: 1, y: 1 },
            thickness: 0
        });
        this.add(tilePart4);
        /*const stair4 = new StairPart({
            direction: Direction.EAST,
            material: new FloorMaterial(111),
            thickness: 8,
            position: { x: 1, y: 1, z: 0 },
            length: 7,
            leftCorner: true,
            rightCorner: true,
        });
        this.add(stair4);
        const stair2 = new StairPart({
            direction: Direction.SOUTH,
            material: new FloorMaterial(111),
            thickness: 8,
            position: { x: 1, y: -5, z: 0 },
            length: 8,
            leftCorner: true,
            rightCorner: true
        });
        this.add(stair2);*/
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
        /*const stair = new StairPart({
            direction: Direction.NORTH,
            material: new FloorMaterial(111),
            thickness: 8,
            position: { x: 0, y: -1, z: 0 },
            length: 8,
            leftCorner: StairCorner.INNER,
            rightCorner: StairCorner.NONE
        });
        this.add(stair);*/
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
        }
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