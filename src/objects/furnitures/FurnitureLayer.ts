import { Assets, BLEND_MODES, Container, utils } from "pixi.js";
import { FloorFurniture } from "./FloorFurniture";
import { FurnitureFrameId, IFurnitureLayerConfiguration, FurnitureLayerId } from "../../interfaces/Furniture.interface";
import { HitSprite } from "../interactions/HitSprite";
import {WallFurniture} from "./WallFurniture";
import {Direction} from "../../enums/Direction";

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

    private _tag: string;

    /**
     * FurnitureLayer class
     * @param furniture - The furniture instance
     * @param configuration - The layer configuration
     */
    constructor(
        furniture: FloorFurniture | WallFurniture,
        configuration: IFurnitureLayerConfiguration
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
        this._tag = configuration.tag;

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
        sprite.on("pointerdown", (event: PointerEvent) => this._furniture.interactionManager.handlePointerDown({ mouseEvent: event, tag: this._tag }));
        sprite.on("pointerup", (event: PointerEvent) => this._furniture.interactionManager.handlePointerUp({ mouseEvent: event, tag: this._tag }));
        sprite.on("pointermove", (event: PointerEvent) => this._furniture.interactionManager.handlePointerMove({ mouseEvent: event, tag: this._tag }));
        sprite.on("pointerout", (event: PointerEvent) => this._furniture.interactionManager.handlePointerOut({ mouseEvent: event, tag: this._tag }));
        sprite.on("pointerover", (event: PointerEvent) => this._furniture.interactionManager.handlePointerOver({ mouseEvent: event, tag: this._tag }));
        this.addChild(sprite);
    }

    /**
     * Return the furniture instance
     */
    public get furniture(): FloorFurniture | WallFurniture {
        return this._furniture;
    }

}