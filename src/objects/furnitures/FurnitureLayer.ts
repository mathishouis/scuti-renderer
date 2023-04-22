// @ts-nocheck
import { Assets, BLEND_MODES, utils } from "pixi.js";
import { FloorFurniture } from "./FloorFurniture";
import { IFurnitureLayerConfiguration } from "../../interfaces/Furniture.interface";
import { HitSprite } from "../interactions/HitSprite";
import { WallFurniture } from "./WallFurniture";
import { Direction } from "../../enums/Direction";
import {WiredSelectionFilter} from "../filters/WiredSelectionFilter";

/** The wired selection filter */
const WIRED_SELECTION_FILTER: WiredSelectionFilter = new WiredSelectionFilter(0xffffff, 0x999999);

/**
 * FurnitureLayer class.
 *
 * @class
 * @memberof Scuti
 */
// @ts-ignore
export class FurnitureLayer extends HitSprite {

    /**
     * The furniture instance.
     *
     * @member {FloorFurniture | WallFurniture}
     * @private
     */
    private readonly _furniture: FloorFurniture | WallFurniture;

    /**
     * The layer id.
     *
     * @member {number | string}
     * @private
     */
    private _layer: number | string;

    /**
     * The layer alpha.
     *
     * @member {number}
     * @private
     */
    private _alpha: number;

    /**
     * The layer tint.
     *
     * @member {number}
     * @private
     */
    private _tint: number;

    /**
     * The layer z index.
     *
     * @member {number}
     * @private
     */
    private _z: number;

    /**
     * The layer blend mode.
     *
     * @member {BLEND_MODES}
     * @private
     */
    private _blendMode: BLEND_MODES;

    /**
     * Is the layer flipped.
     *
     * @member {boolean}
     * @private
     */
    private _flip: boolean;

    /**
     * The layer frame id.
     *
     * @member {number}
     * @private
     */
    private _frame: number;

    /**
     * Is the layer interactive.
     *
     * @member {boolean}
     * @private
     */
    private _ignoreMouse: boolean;

    /**
     * The layer direction.
     *
     * @member {Direction}
     * @private
     */
    private _direction: Direction;

    /**
     * The layer tag.
     *
     * @member {string}
     * @private
     */
    private _tag: string;

    /**
     * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance.
     * @param {IFurnitureLayerConfiguration} [configuration] - The layer configuration.
     */
    constructor(
        furniture: FloorFurniture | WallFurniture,
        configuration: IFurnitureLayerConfiguration
    ) {
        // @ts-ignore
        super(null);

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
        // @ts-ignore
        this._tag = configuration.tag;

        this._draw();
    }

    /**
     * Draw the part.
     *
     * @return {void}
     * @private
     */
    private _draw(): void {
        this.filters = [];
        this.texture = Assets.get("furnitures/" + this._furniture.data.baseName).textures[this._furniture.data.baseName + '_' + this._furniture.data.baseName + '_64_' + this._layer + '_' + this._direction + '_' + this._frame];
        if(this._tint !== undefined) this.tint = utils.premultiplyTint(this._tint, 1);
        if(this._blendMode !== undefined) this.blendMode = this._blendMode;
        if(this._alpha !== undefined) this.alpha = this._alpha;
        if(this._flip) this.scale.x = -1;
        if(this._furniture.room !== undefined) this.parentLayer = this._furniture.room.objects.layer;
        if(this._z) this.zOrder = this._z;
        if(this._ignoreMouse !== null && !this._ignoreMouse) this.interactive = true;
        if(this._furniture.selected) this.filters.push(WIRED_SELECTION_FILTER);
        this.on("pointerdown", (event: PointerEvent) => this._furniture.interactionManager.handlePointerDown({ mouseEvent: event, tag: this._tag }));
        this.on("pointerup", (event: PointerEvent) => this._furniture.interactionManager.handlePointerUp({ mouseEvent: event, tag: this._tag }));
        this.on("pointermove", (event: PointerEvent) => this._furniture.interactionManager.handlePointerMove({ mouseEvent: event, tag: this._tag }));
        this.on("pointerout", (event: PointerEvent) => this._furniture.interactionManager.handlePointerOut({ mouseEvent: event, tag: this._tag }));
        this.on("pointerover", (event: PointerEvent) => this._furniture.interactionManager.handlePointerOver({ mouseEvent: event, tag: this._tag }));
    }

    /**
     * Reference to the furniture instance.
     *
     * @member {FloorFurniture | WallFurniture}
     * @readonly
     * @public
     */
    public get furniture(): FloorFurniture | WallFurniture {
        return this._furniture;
    }

}
