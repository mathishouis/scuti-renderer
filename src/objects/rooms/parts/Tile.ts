import { Room } from "../Room";
import { IPosition3D, ITileConfiguration } from "../../../interfaces/Room.interface";
import { Container, Graphics, Matrix, utils } from "pixi.js";
import { Material } from "../materials/Material";
import { FloorMaterial } from "../materials/FloorMaterial";

/**
 * Tile class that show up during room rendering.
 *
 * @class
 * @memberof Scuti
 */
export class Tile extends Container {

    /**
     * The room instance where the tile will be drawn.
     *
     * @member {Room}
     * @private
     */
    private _room: Room;

    /**
     * The thickness of the tile part.
     *
     * @member {number}
     * @private
     */
    private _thickness: number;

    /**
     * The tile material that will be applied to this part, it contains the color and the texture of the tile.
     *
     * @member {Material}
     * @private
     */
    private _material: Material;

    /**
     * The tile position.
     *
     * @member {IPosition3D}
     * @private
     */
    private _position: IPosition3D;

    // TODO: Comment this
    private _onClick: (position: IPosition3D) => void;

    private _onOver: (position: IPosition3D) => void;

    private _onOut: (position: IPosition3D) => void;

    /**
     * @param {Room} [room] - The room instance where the tile will be drawn.
     * @param {ITileConfiguration} [configuration] - The tile configuration.
     * @param {Material} [configuration.material] - The time material that will be applied.
     * @param {number} [configuration.thickness] - The tile thickness.
     * @param {IPosition3D} [configuration.position] - The tile position.
     **/
    constructor(
        room: Room,
        configuration: ITileConfiguration
    ) {
        super();
        /** Store the configuration */
        this._room = room;
        this._position = configuration.position;
        this._thickness = configuration.thickness ?? 8;
        this._material = configuration.material ?? new FloorMaterial(this._room.engine, 111);
        /** Register interactions */
        this.interactive = true;
        this.on("pointerdown", () => this._onClick(this._position));
        this.on("pointerover", () => this._onOver(this._position));
        this.on("pointerout", () => this._onOut(this._position));
        // TODO: Make the method public and use it when adding it to a room, not when instancing the class
        /** Draw the tile */
        this._draw();
    }

    /**
     * Draw the tile.
     *
     * @return {void}
     * @private
     */
    private _draw(): void {
        /** Top face */
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
        /** Left face */
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
        /** Right face */
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
        /** And we combine everything */
        this.addChild(top);
        this.addChild(left);
        this.addChild(right);
        /** Positionate the wall */
        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    /**
     * Reference to the tile thickness.
     *
     * @member {number}
     * @readonly
     * @public
     */
    public get thickness(): number {
        return this._thickness;
    }

    /**
     * Update the tile thickness and redraw the tile.
     *
     * @param {number} [thickness] - The room tile thickness that will be applied.
     * @public
     */
    public set thickness(
        thickness: number
    ) {
        this._thickness = thickness;
        /** Redraw the tile */
        this._draw();
    }

    /**
     * Reference to the tile material instance.
     *
     * @member {Material}
     * @readonly
     * @public
     */
    public get material(): Material {
        return this._material;
    }

    /**
     * Update the tile material and redraw the tile.
     *
     * @param {Material} [material] - The room tile material that will be applied.
     * @public
     */
    public set material(material: Material) {
        this._material = material;
        /** Redraw the tile */
        this._draw();
    }

    // TODO: Comment this
    public set onClick(event: (position: IPosition3D) => void) {
        this._onClick = event;
    }

    public set onOver(event: (position: IPosition3D) => void) {
        this._onOver = event;
    }

    public set onOut(event: (position: IPosition3D) => void) {
        this._onOut = event;
    }
}
