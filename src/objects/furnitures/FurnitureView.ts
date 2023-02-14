import { FurniturePart } from "./FurniturePart";
import { Assets, Container, Sprite, Spritesheet } from "pixi.js";
import { FloorFurniture } from "./FloorFurniture";
import { WallFurniture } from "./WallFurniture";
import { IFurnitureProperty } from "../../interfaces/Furniture.interface";
import { FurnitureLayer } from "./FurnitureLayer";
import { FurnitureGuildCustomizedVisualization } from "./visualizations/FurnitureGuildCustomizedVisualization";
import { FurnitureVisualization } from "./visualizations/FurnitureVisualization";

/**
 * FurnitureView class that manage all the rendering part of the furniture.
 *
 * @class
 * @memberof Scuti
 */
export class FurnitureView extends Container {

    /**
     * The furniture instance that we want to render.
     *
     * @member {FloorFurniture | WallFurniture}
     * @private
     */
    private _furniture: FloorFurniture | WallFurniture;

    /**
     * A list containing all the furnitures parts.
     *
     * @member {FurniturePart[]}
     * @private
     */
    private _parts: FurniturePart[] = [];

    /**
     * The spritesheet of the furniture.
     *
     * @member {Spritesheet}
     * @private
     */
    private _spritesheet: Spritesheet;

    /**
     * The furniture property.
     *
     * @member {IFurnitureProperty}
     * @private
     */
    private _property: IFurnitureProperty;

    /**
     * The furniture visualization.
     *
     * @member {FurnitureVisualization}
     * @private
     */
    private _visualization: FurnitureVisualization;

    /**
     * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance to render.
     */
    constructor(
        furniture: FloorFurniture | WallFurniture
    ) {
        super();
        /** Store data */
        this._furniture = furniture;
        /** Load the spritesheet */
        if(Assets.get("furnitures/" + this._furniture.data.baseName) === undefined) {
            this._createPlaceholder();
            Assets.add("furnitures/" + this._furniture.data.baseName, "http://localhost:8081/furniture/" + this._furniture.data.baseName + "/" + this._furniture.data.baseName + ".json");
            Assets.load("furnitures/" + this._furniture.data.baseName).then(() => {
                this._spritesheet = Assets.get("furnitures/" + this._furniture.data.baseName);
                this._property = this._spritesheet.data["furniProperty"];
                this._initialiseVisualization();
                this._draw();
            });
        } else {
            this._spritesheet = Assets.get("furnitures/" + this._furniture.data.baseName);
            this._property = this._spritesheet.data["furniProperty"];
            this._initialiseVisualization();
            this._draw();
        }
    }

    /**
     * Initialise furniture visualization.
     *
     * @return {void}
     * @private
     */
    private _initialiseVisualization(): void {
        if(this._property.infos.visualization === "furniture_guild_customized") this._visualization = new FurnitureGuildCustomizedVisualization(this._furniture);
    }

    /**
     * Draw the furniture visualization with all the parts.
     *
     * @return {void}
     * @private
     */
    private _draw(): void {
        this._destroyParts();
        this._createShadow();
        for (let i: number = 0; i < this._property.visualization.layerCount; i++) {
            this._createPart(i);
        }
    }

    /**
     * Destroy all the furniture parts.
     *
     * @return {void}
     * @private
     */
    private _destroyParts(): void {
        [...this._parts].forEach((part: FurniturePart) =>
            part.destroy()
        );
        this._parts = [];
        this.removeChild(this.children[0]);
    }

    /**
     * Rerender all the room visualization.
     *
     * @return {void}
     * @private
     */
    public update():void {
        this._draw();
    }

    /**
     * The method is called when the room animation ticker tick.
     *
     * @return {void}
     * @private
     */
    public tick(): void {
        this._parts.forEach((part: FurniturePart) =>
            part.nextFrame()
        );
    }

    /**
     * Create a furniture part by it's layer id.
     *
     * @param {number} [layer] - The layer id that we want to render.
     * @return {void}
     * @private
     */
    private _createPart(
        layer: number
    ): void {
        const part: FurniturePart = new FurniturePart(this._furniture, layer);
        this._parts.push(part);
        this.addChild(part);
    }

    /**
     * Create the furniture placeholder while the spritesheet is loading.
     *
     * @return {void}
     * @private
     */
    private _createPlaceholder(): void {
        const placeholder: Sprite = new Sprite(Assets.get("furnitures/floor/placeholder").textures["place_holder_furniture_64.png"]);
        this.addChild(placeholder);
        placeholder.x = -32;
        placeholder.y = -50;
    }

    /**
     * Create the furniture shadow.
     *
     * @return {void}
     * @private
     */
    private _createShadow(): void {
        this.addChild(new FurnitureLayer(this._furniture, {
            layer: "sd",
            alpha: 0.1,
            tint: undefined,
            z: 0,
            blendMode: undefined,
            flip: false,
            frame: 0,
            ignoreMouse: true,
            direction: 0
        }));
    }

    /**
     * Reference to the furniture spritesheet.
     *
     * @member {Spritesheet}
     * @readonly
     * @public
     */
    public get spritesheet(): Spritesheet {
        return this._spritesheet;
    }

    /**
     * Reference to the furniture properties.
     *
     * @member {IFurnitureProperty}
     * @readonly
     * @public
     */
    public get property(): IFurnitureProperty {
        return this._property;
    }

    /**
     * Reference to the furniture visualization.
     *
     * @member {FurnitureVisualization}
     * @readonly
     * @public
     */
    public get visualization(): FurnitureVisualization {
        return this._visualization;
    }

}
