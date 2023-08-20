import {RoomPart} from "./RoomPart.ts";
import {Room} from "../Room.ts";
import {Container, Point} from "pixi.js";
import {Cube} from "../geometry/Cube.ts";
import {EventManager} from "../../events/EventManager.ts";
import {Vector3D} from "../../../types/Vector.ts";
import {CubeFace} from "../../../enums/CubeFace.ts";
import {IWallConfiguration} from "../../../interfaces/IWallConfiguration.ts";
import {WallMaterial} from "../materials/WallMaterial.ts";
import {Direction} from "../../../enums/Direction.ts";

export class WallPart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();
    public eventManager: EventManager = new EventManager();

    constructor(
        public configuration: IWallConfiguration
    ) {
        super();
    }

    public render(): void {
        const zOrder: number = (this.configuration.position.z - 1) * 4;
        const material: WallMaterial = this.configuration.material ?? new WallMaterial(101);
        const size: Vector3D = {
            x: 0,
            y: 0,
            z: this.configuration.thickness / 32 - this.configuration.position.z
        };

        if (this.configuration.height !== -1) {
            size.z += 115 / 32 + (64 / 32) * this.configuration.height;
        } else {
            size.z += this.room.heightMap.maxHeight + 115 / 32;
        }

        if (this.configuration.direction === Direction.WEST) {
            size.x = this.configuration.thickness / 32;
            size.y = this.configuration.length;
        } else if (this.configuration.direction === Direction.NORTH) {
            size.x = this.configuration.length;
            size.y = this.configuration.thickness / 32;
        }

        const cube: Cube = new Cube({
            layer: this.room.renderer.layer,
            zOrders: {
                [CubeFace.TOP]: zOrder + 1,
                [CubeFace.LEFT]: zOrder - 0.5,
                [CubeFace.RIGHT]: zOrder - 0.6
            },
            material: material,
            size: size
        });

        this.container.addChild(cube);
        if (this.configuration.direction === Direction.WEST) {
            this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y + this.configuration.length - 1) - 8;
            this.container.y = 16 * this.configuration.position.x + 16 * (this.configuration.position.y + this.configuration.length - 1) - 32 * this.configuration.position.z - 4 - size.z * 32 + this.configuration.thickness;
        } else if (this.configuration.direction === Direction.NORTH) {
            this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y - 1);
            this.container.y = 16 * this.configuration.position.x + 16 * (this.configuration.position.y - 1) - 32 * this.configuration.position.z - size.z * 32 + this.configuration.thickness;
        }

        this.room.visualization.container.addChild(this.container);
    }

    public getGlobalTilePosition(point: Point): Vector3D {
        const localPosition: Point = this.container.toLocal(point);
        const localX: number = Math.floor(localPosition.x / 64 + localPosition.y / 32),
            localY: number = Math.floor(localPosition.y / 32 - localPosition.x / 64 - 0.01) + this.configuration.length;
        return {
            x: localX + this.configuration.position.x,
            y: localY + this.configuration.position.y,
            z: this.configuration.position.z
        }
    }
}
