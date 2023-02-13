import {Tile} from "../rooms/parts/Tile";
import {Stair} from "../rooms/parts/Stair";
import {Wall} from "../rooms/parts/Wall";
import {FurniturePart} from "./FurniturePart";
import {Assets, Container, Sprite, Spritesheet} from "pixi.js";
import {FloorFurniture} from "./FloorFurniture";
import {WallFurniture} from "./WallFurniture";
import {IFurnitureProperty, IFurnitureVisualization} from "../../interfaces/Furniture.interface";
import {FurnitureLayer} from "./FurnitureLayer";
import {WiredSelectionFilter} from "../filters/WiredSelectionFilter";

const WIRED_SELECTION_FILTER: WiredSelectionFilter = new WiredSelectionFilter(0xffffff, 0x999999);

export class FurnitureVisualization extends Container {

    private _furniture: FloorFurniture | WallFurniture;

    private _parts: FurniturePart[] = [];

    private _spritesheet: Spritesheet;

    private _property: IFurnitureProperty;

    constructor(
        furniture: FloorFurniture | WallFurniture
    ) {
        super();

        this._furniture = furniture;

        if(Assets.get("furnitures/" + this._furniture.data.baseName) === undefined) {
            this._createPlaceholder();
            Assets.add("furnitures/" + this._furniture.data.baseName, "http://localhost:8081/furniture/" + this._furniture.data.baseName + "/" + this._furniture.data.baseName + ".json");
            Assets.load("furnitures/" + this._furniture.data.baseName).then(() => {
                this._spritesheet = Assets.get("furnitures/" + this._furniture.data.baseName);
                this._property = this._spritesheet.data["furniProperty"];
                this._draw();
            });
        } else {
            this._spritesheet = Assets.get("furnitures/" + this._furniture.data.baseName);
            this._property = this._spritesheet.data["furniProperty"];
            this._draw();
        }
    }

    /**
     * Draw the furniture visualization with all the pars.
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
        this._applyFilters();
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

    public update():void {
        this._draw();
    }

    public tick(): void {
        this._parts.forEach((part: FurniturePart) =>
            part.nextFrame()
        );
    }

    private _createPart(
        layer: number
    ): void {
        const part: FurniturePart = new FurniturePart(this._furniture, layer);
        this._parts.push(part);
        this.addChild(part);
    }

    private _createPlaceholder(): void {
        const placeholder: Sprite = new Sprite(Assets.get("furnitures/floor/placeholder").textures["place_holder_furniture_64.png"]);
        this.addChild(placeholder);

        placeholder.x = -32;
        placeholder.y = -50;
    }

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

    private _applyFilters(): void {
        this.filters = [];
        if(this._furniture.selected) this.filters.push(WIRED_SELECTION_FILTER);
    }

    public get spritesheet(): Spritesheet {
        return this._spritesheet;
    }

    public get property(): IFurnitureProperty {
        return this._property;
    }
}
