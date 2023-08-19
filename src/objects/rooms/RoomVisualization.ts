import { Container } from "pixi.js";
import { Room } from "./Room.ts";
import { TilePart } from "./parts/TilePart.ts";
import { PartLayer } from "./layers/PartLayer.ts";
import { RoomPart } from "./parts/RoomPart.ts";
import { IRoomLayers } from "../../interfaces/IRoomLayers.ts";
import { StairPart } from "./parts/StairPart.ts";
import { GreedyMesher } from "./GreedyMesher.ts";
import { StairMesh, TileMesh } from "../../types/Mesh.ts";

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
        const greedyMesher: GreedyMesher = new GreedyMesher(this.room.heightMap);

        greedyMesher.getParts().forEach((tile: TileMesh): void => {
            const part: TilePart = new TilePart({
                material: this.room.configuration.floorMaterial,
                position: tile.position,
                size: tile.size,
                thickness: this.room.configuration.floorThickness,
            });
            this.add(part);
        });

        greedyMesher.getStairs().forEach((stair: StairMesh): void => {
            const part: StairPart = new StairPart({
                material: this.room.configuration.floorMaterial,
                position: stair.position,
                length: stair.length,
                thickness: this.room.configuration.floorThickness,
                direction: stair.direction,
                corners: stair.corners
            });
            this.add(part);
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
