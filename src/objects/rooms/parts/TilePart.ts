import { RoomPart } from "./RoomPart.ts";
import { TileConfiguration } from "../../../interfaces/TileConfiguration.ts";
import { Room } from "../Room.ts";
import { Container, FederatedPointerEvent, Point, Polygon } from "pixi.js";
import { FloorMaterial } from "../materials/FloorMaterial.ts";
import { Cube } from "../../geometry/Cube.ts";
import { EventManager } from "../../events/EventManager.ts";
import { Position3D } from "../../../interfaces/Position.ts";

export class TilePart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();
    public eventManager: EventManager = new EventManager();

    constructor(
        public configuration: TileConfiguration
    ) {
        super();

        this._registerEvents();
    }

    private _registerEvents(): void {
        this.container.onpointerdown = (event: FederatedPointerEvent) => this.eventManager.handlePointerDown({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointerup = (event: FederatedPointerEvent) => this.eventManager.handlePointerUp({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointermove = (event: FederatedPointerEvent) => this.eventManager.handlePointerMove({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointerout = (event: FederatedPointerEvent) => this.eventManager.handlePointerOut({
            position: this.getGlobalTilePosition(event.global),
        });
        this.container.onpointerover = (event: FederatedPointerEvent) => this.eventManager.handlePointerOver({
            position: this.getGlobalTilePosition(event.global),
        });
    }

    public render(): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);
        const cube: Cube = new Cube({
            material: material,
            size: {
                x: this.configuration.size.x,
                y: this.configuration.size.y,
                z: this.configuration.thickness / 32
            }
        });

        this.container.hitArea = new Polygon(
            new Point(0, 0),
            new Point(32 * this.configuration.size.y, -16 * this.configuration.size.y),
            new Point(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1)),
            new Point(32 * this.configuration.size.x, 16 * this.configuration.size.x),
            new Point(0, 0)
        );

        this.container.eventMode = "static";
        this.container.addChild(cube);
        this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y + this.configuration.size.y);
        this.container.y = 16 * this.configuration.position.x + 16 * (this.configuration.position.y + this.configuration.size.y) - 32 * this.configuration.position.z;
    }

    public getGlobalTilePosition(point: Point): Position3D {
        const localPosition: Point = this.container.toLocal(point);
        const localX: number = Math.floor(localPosition.x / 64 + localPosition.y / 32),
            localY: number = Math.floor(localPosition.y / 32 - localPosition.x / 64) + this.configuration.size.y;
        return {
            x: localX + this.configuration.position.x,
            y: localY + this.configuration.position.y,
            z: this.configuration.position.z
        }
    }
}
