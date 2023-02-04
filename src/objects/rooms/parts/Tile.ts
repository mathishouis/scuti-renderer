import { Room } from "../Room";
import { Position, TileConfiguration } from "../../../interfaces/Room.interface";
import { Container, Graphics, Matrix, utils } from "pixi.js";
import { Material } from "../materials/Material";
import { FloorMaterial } from "../materials/FloorMaterial";

export class Tile extends Container {

    /**
     * The room instance
     * @private
     */
    private _room: Room;

    /**
     * The tile thickness
     * @private
     */
    private _thickness: number;

    /**
     * The tile material
     * @private
     */
    private _material: Material;

    /**
     * The tile position
     * @private
     */
    private _position: Position;

    /**
     * Tile class
     * @param room - The room instance
     * @param configuration - The tile configuration
     */
    constructor(
        room: Room,
        configuration: TileConfiguration
    ) {
        super();

        this._room = room;
        this._position = configuration.position;
        this._thickness = configuration.thickness ?? 8;
        this._material = configuration.material ?? new FloorMaterial(this._room.engine, 111);

        // TODO: Make the method public and use it when adding it to a room, not when instancing the class
        this._draw();
    }

    /**
     * Draw the tile
     */
    public _draw(): void {
        const top: Graphics = new Graphics()
            .beginTextureFill({
                texture: this._material.texture,
                color: utils.premultiplyTint(this._material.color, 1),
                //matrix: new Matrix(1, 0.5, 1, -0.5, (this._position.x % 2 === 0 || this._position.y % 2 === 0) && !(this._position.x % 2 === 0 && this._position.y % 2 === 0) ? 32 : 0, (this._position.x % 2 === 0 || this._position.y % 2 === 0) && !(this._position.x % 2 === 0 && this._position.y % 2 === 0) ? 16 : 0)
                matrix: new Matrix(1, 0.5, 1, -0.5, (this._position.y % 2 === 0) ? 32 : 64, (this._position.y % 2 === 0) ? 16 : 0)
            })
            .moveTo(0, 0)
            .lineTo(32, -16)
            .lineTo(64, 0)
            .lineTo(32, 16)
            .lineTo(0, 0)
            .endFill();
        const left: Graphics = new Graphics()
            .beginTextureFill({
                texture: this._material.texture,
                color: utils.premultiplyTint(this._material.color, 0.8),
                matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
            })
            .moveTo(0, 0)
            .lineTo(0, this._thickness)
            .lineTo(32, 16 + this._thickness)
            .lineTo(32, 16)
            .endFill();
        const right: Graphics = new Graphics()
            .beginTextureFill({
                texture: this._material.texture,
                color: utils.premultiplyTint(this._material.color, 0.71),
                matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
            })
            .moveTo(32, 16)
            .lineTo(32, 16 + this._thickness)
            .lineTo(64, this._thickness)
            .lineTo(64, 0)
            .lineTo(32, 16)
            .endFill();
        this.addChild(top);
        this.addChild(left);
        this.addChild(right);

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    /**
     * Return the tile thickness
     */
    public get thickness(): number {
        return this._thickness;
    }

    /**
     * Set the tile thickness
     * @param thickness
     */
    public set thickness(thickness: number) {
        this._thickness = thickness;
        this._draw(); // We rerender the tile to apply the changes
    }

    /**
     * Return the tile material
     */
    public get material(): Material {
        return this._material;
    }

    /**
     * Set the tile material
     * @param material
     */
    public set material(material: Material) {
        this._material = material;
        this._draw(); // We rerender the tile to apply the changes
    }

}
