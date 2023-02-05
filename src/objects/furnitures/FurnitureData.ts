import { Assets} from "pixi.js";
import { FurnitureData } from "../../interfaces/Furniture.interface";
import { FloorFurniture } from "./FloorFurniture";

export class FurnitureData {

    /**
     * The furniture instance
     * @private
     */
    private readonly _furniture: FloorFurniture;

    /**
     * The furniture data
     * @private
     */
    private _data: FurnitureData;

    /**
     * FurnitureData class
     * @param furniture
     */
    constructor(furniture: FloorFurniture) {
        this._furniture = furniture;

        this._load();
    }

    /**
     * Load the furniture data
     * @private
     */
    private _load(): void {
        if(this._furniture instanceof  FloorFurniture) {
            this._data = Assets.get('furnitures/furnidata').floorItems.find(item => item.id === this._furniture.id);
        } // TODO: Add wall furniture
    }

    /**
     * Return the furniture id
     */
    public get id(): number {
        return this._data.id;
    }

    /**
     * Return the furniture class name
     */
    public get className(): string {
        return this._data.className;
    }

    /**
     * Return the furniture class name without the color id
     */
    public get baseName() {
        if(!this._data.className.includes("*")) return this._data.className;
        return this._data.className.split("*")[0];
    }

    /**
     * Return the furniture color id
     */
    public get color(): number {
        if(!this._data.className.includes("*")) return null;
        return Number(this._data.className.split("*")[1]);
    }

}
