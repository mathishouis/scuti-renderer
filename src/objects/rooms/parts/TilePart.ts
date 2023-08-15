import { RoomPart } from "./RoomPart.ts";
import { TileConfiguration } from "../../../interfaces/TileConfiguration.ts";
import { Room } from "../Room.ts";
import { Color, Container, Graphics, Matrix, Texture } from "pixi.js";

export class TilePart extends RoomPart {
    public room!: Room;
    public container: Container = new Container();

    constructor(
        public configuration: TileConfiguration
    ) {
        super();
    }

    public render(): void {
        const topFace: Graphics = new Graphics()
            .beginTextureFill({
                texture: Texture.WHITE,
                color: new Color(0x0000FF).premultiply(1).toNumber(),
                matrix: new Matrix(
                    1,
                    0.5,
                    1, -0.5,
                    this.configuration.position.y % 2 === 0 ? 32 : 64,
                    this.configuration.position.y % 2 === 0 ? 16 : 0
                )
            })
            .moveTo(0, 0)
            .lineTo(32 * this.configuration.size.y, -16 * this.configuration.size.y)
            .lineTo(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1))
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
            .lineTo(0, 0)
            .endFill();

        const leftFace: Graphics = new Graphics()
            .beginTextureFill({
                texture: Texture.WHITE,
                color: new Color(0x00FF00).premultiply(0.8).toNumber(),
                matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
            })
            .moveTo(0, 0)
            .lineTo(0, this.configuration.size.z * 32)
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x + this.configuration.size.z * 32)
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
            .endFill();

        const rightFace: Graphics = new Graphics()
            .beginTextureFill({
                texture: Texture.WHITE,
                color: new Color(0xFF0000).premultiply(0.71).toNumber(),
                matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
            })
            .moveTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x + this.configuration.size.z * 32)
            .lineTo(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1) + this.configuration.size.z * 32)
            .lineTo(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1))
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
            .endFill();

        this.container.addChild(topFace);
        this.container.addChild(leftFace);
        this.container.addChild(rightFace);

        this.container.x = 32 * this.configuration.position.x - 32 * this.configuration.position.y;
        this.container.y = 16 * this.configuration.position.x + 16 * this.configuration.position.y - 32 * this.configuration.position.z;
    }
}
