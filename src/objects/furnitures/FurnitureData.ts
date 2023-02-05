import {FurnitureId} from "../../interfaces/Furniture.interface";
import {Assets} from "pixi.js";
import {FurnitureData} from "../../interfaces/Furniture.interface";

export class FurnitureData {

    private readonly _id: FurnitureId;
    private _data: FurnitureData;

    constructor(id: FurnitureId) {
        this._id = id;

        this._load();
    }

    private _load(): void {
        this._data = Assets.get('furnitures/furnidata').floorItems.find(item => item.id === this._id);
    }

    public get id(): number {
        return this._data.id;
    }

    public get className(): string {
        return this._data.className;
    }

    public get baseName() {
        if(!this._data.className.includes("*")) return this._data.className;
        return this._data.className.split("*")[0];
    }

    public get color(): number {
        if(!this._data.className.includes("*")) return null;
        return Number(this._data.className.split("*")[1]);
    }

}
