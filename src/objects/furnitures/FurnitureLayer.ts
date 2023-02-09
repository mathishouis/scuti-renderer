import { Assets, BLEND_MODES, Container, utils } from "pixi.js";
import { FloorFurniture } from "./FloorFurniture";
import { FurnitureFrameId, FurnitureLayerConfiguration, FurnitureLayerId } from "../../interfaces/Furniture.interface";
import { HitSprite } from "../interactions/HitSprite";
import {WallFurniture} from "./WallFurniture";
import {Direction} from "../../types/Direction";

export class FurnitureLayer extends Container {

    /**
     * The furniture instance
     * @private
     */
    private readonly _furniture: FloorFurniture | WallFurniture;

    /**
     * The layer id
     * @private
     */
    private _layer: FurnitureLayerId | string;

    /**
     * The layer alpha
     * @private
     */
    private _alpha: number;


    /**
     * The layer tint
     * @private
     */
    private _tint: number;

    /**
     * The layer z
     * @private
     */
    private _z: number;

    /**
     * The layer blend mode
     * @private
     */
    private _blendMode: BLEND_MODES;

    /**
     * Is the layer flipped
     * @private
     */
    private _flip: boolean;

    /**
     * The layer frame id
     * @private
     */
    private _frame: FurnitureFrameId;

    /**
     * Ignore mouse
     * @private
     */
    private _ignoreMouse: boolean;

    private _direction: Direction;

    /**
     * FurnitureLayer class
     * @param furniture - The furniture instance
     * @param configuration - The layer configuration
     */
    constructor(
        furniture: FloorFurniture | WallFurniture,
        configuration: FurnitureLayerConfiguration
    ) {
        super();

        this._furniture = furniture;
        this._layer = configuration.layer;
        this._alpha = configuration.alpha;
        this._tint = configuration.tint;
        this._z = configuration.z;
        this._blendMode = configuration.blendMode;
        this._flip = configuration.flip;
        this._frame = configuration.frame;
        this._ignoreMouse = configuration.ignoreMouse;
        this._direction = configuration.direction;

        this._draw();
    }

    /**
     * Draw the layer
     * @private
     */
    private _draw(): void {
        const sprite: HitSprite = new HitSprite(Assets.get("furnitures/" + this._furniture.data.baseName).textures[this._furniture.data.baseName + '_' + this._furniture.data.baseName + '_64_' + this._layer + '_' + this._direction + '_' + this._frame]);
        if(this._tint !== undefined) sprite.tint = utils.premultiplyTint(this._tint, 1);
        if(this._blendMode !== undefined) sprite.blendMode = this._blendMode;
        if(this._alpha !== undefined) sprite.alpha = this._alpha;
        if(this._flip) sprite.scale.x = -1;
        if(this._ignoreMouse !== null && !this._ignoreMouse) sprite.interactive = true;
        sprite.on("pointerdown", () => console.log("XDDDD"));
        this.addChild(sprite);
    }

    /**
     * Return the furniture instance
     */
    public get furniture(): FloorFurniture | WallFurniture {
        return this._furniture;
    }

}
