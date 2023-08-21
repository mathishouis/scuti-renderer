import {Container} from "pixi.js";
import {Room} from "./Room.ts";
import {TilePart} from "./parts/TilePart.ts";
import {PartLayer} from "./layers/PartLayer.ts";
import {RoomPart} from "./parts/RoomPart.ts";
import {IRoomLayers} from "../../interfaces/IRoomLayers.ts";
import {StairPart} from "./parts/StairPart.ts";
import {GreedyMesher} from "./geometry/GreedyMesher.ts";
import {StairMesh, TileMesh, WallMesh} from "../../types/Mesh.ts";
import {ITileEvent} from "../../interfaces/IEvents.ts";
import {CursorPart} from "./parts/CursorPart.ts";
import {WallPart} from "./parts/WallPart.ts";
import {Direction} from "../../enums/Direction.ts";
import {WallMaterial} from "../rooms/materials/WallMaterial.ts";

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

    private _registerCursor(): void {
        this.layers.parts.cursor = new CursorPart({
            position: {
                x: 0,
                y: 0,
                z: 2
            }
        });
        this.layers.parts.cursor.room = this.room;
        this.layers.parts.cursor.render();
        this.layers.parts.cursor.hide();
    }

    private _registerFloorPart(part: TilePart | StairPart): void {
        this.add(part);

        part.eventManager.onPointerDown = (event: ITileEvent): void => { if (this.room.events.tiles.onPointerDown) this.room.events.tiles.onPointerDown(event); };
        part.eventManager.onPointerUp = (event: ITileEvent): void => { if (this.room.events.tiles.onPointerUp) this.room.events.tiles.onPointerUp(event); };
        part.eventManager.onPointerMove = (event: ITileEvent): void => {
            if (this.room.events.tiles.onPointerMove) this.room.events.tiles.onPointerMove(event);
            if (this.layers.parts.cursor) this.layers.parts.cursor.move(event.position);
        };
        part.eventManager.onPointerOut = (event: ITileEvent): void => {
            if (this.room.events.tiles.onPointerOut) this.room.events.tiles.onPointerOut(event);
            if (this.layers.parts.cursor) this.layers.parts.cursor.hide();
        };
        part.eventManager.onPointerOver = (event: ITileEvent): void => {
            if (this.room.events.tiles.onPointerOver) this.room.events.tiles.onPointerOver(event);
            if (this.layers.parts.cursor) this.layers.parts.cursor.show();
        };
        part.eventManager.onDoublePointerDown = (event: ITileEvent): void => { if (this.room.events.tiles.onDoublePointerDown) this.room.events.tiles.onDoublePointerDown(event); };
    }

    public render(): void {
        this._registerCursor();
        const greedyMesher: GreedyMesher = new GreedyMesher(this.room.heightMap);

        greedyMesher.tiles.forEach((tile: TileMesh): void => this._registerFloorPart(new TilePart({
            material: this.room.configuration.floorMaterial,
            position: tile.position,
            size: tile.size,
            thickness: tile.door ? 0 : this.room.configuration.floorThickness,
        })));

        greedyMesher.stairs.forEach((stair: StairMesh): void => this._registerFloorPart(new StairPart({
            material: this.room.configuration.floorMaterial,
            position: stair.position,
            length: stair.length,
            thickness: this.room.configuration.floorThickness,
            direction: stair.direction,
            corners: stair.corners
        })));

        greedyMesher.walls.forEach((wall: WallMesh): void => this.add(new WallPart({
            material: new WallMaterial(117),
            position: wall.position,
            length: wall.length,
            thickness: this.room.configuration.floorThickness,
            height: -1,
            direction: wall.direction,
            corner: wall.corner
        })));

        /*let wallPart = new WallPart({
            material: undefined,
            position: { x: 1, y: 6, z: 2 },
            thickness: 8,
            length: 3,
            height: -1,
            direction: Direction.WEST
        });
        this.add(wallPart);

        let wallPart2 = new WallPart({
            material: undefined,
            position: { x: 1, y: 1, z: 2 },
            thickness: 8,
            length: 2,
            height: -1,
            direction: Direction.NORTH
        });
        this.add(wallPart2);*/
    }

    public update(): void {
        this.destroy();
        this.render();
    }

    public destroy(): void {
        this.layers.parts.cursor.container.destroy();
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
