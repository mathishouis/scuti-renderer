import { Color, Container, Graphics, Matrix } from "pixi.js";
import { FloorMaterial } from "../rooms/materials/FloorMaterial.ts";
import { CubeConfiguration } from "../../interfaces/CubeConfiguration.ts";

export class Cube extends Container {

    constructor(
        public configuration: CubeConfiguration
    ) {
        super();

        this._initialize();
    }

    private _initialize(): void {
        const material: FloorMaterial = this.configuration.material ?? new FloorMaterial(101);
        const topFace: Graphics = new Graphics()
            .beginTextureFill({
                texture: material.texture,
                color: new Color(material.color).premultiply(1).toNumber(),
                matrix: new Matrix(
                    1,
                    0.5,
                    1, -0.5,
                    1 % 2 === 0 ? 32 : 64,
                    1 % 2 === 0 ? 16 : 0
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
                texture: material.texture,
                color: new Color(material.color).premultiply(0.8).toNumber(),
                matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
            })
            .moveTo(0, 0)
            .lineTo(0, this.configuration.size.z * 32)
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x + this.configuration.size.z * 32)
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
            .endFill();
        const rightFace: Graphics = new Graphics()
            .beginTextureFill({
                texture: material.texture,
                color: new Color(material.color).premultiply(0.71).toNumber(),
                matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
            })
            .moveTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x + this.configuration.size.z * 32)
            .lineTo(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1) + this.configuration.size.z * 32)
            .lineTo(32 * (this.configuration.size.x + 1) + 32 * (this.configuration.size.y - 1), -16 * (this.configuration.size.y - 1) + 16 * (this.configuration.size.x - 1))
            .lineTo(32 * this.configuration.size.x, 16 * this.configuration.size.x)
            .endFill();

        this.addChild(topFace);
        this.addChild(leftFace);
        this.addChild(rightFace);
    }
}
