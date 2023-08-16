import { RoomMaterial } from "./RoomMaterial.ts";
import { Texture } from "pixi.js";
import { AssetLoader } from "../../assets/AssetLoader.ts";
import { Material } from "../../../interfaces/Material.ts";

export class FloorMaterial extends RoomMaterial {
    public color!: number;
    public texture!: Texture;

    constructor(
        public id: number
    ) {
        super();

        this._initialize();
    }

    private _initialize(): void {
        const material: Material = AssetLoader.get("rooms/materials/floor").find((material: Material) => material.id === this.id);

        if (material) {
            this.color = material.color;
            this.texture = AssetLoader.get(`rooms/materials/floor/${material.texture}`);
        } else {
            this.color = 16777215;
            this.texture = AssetLoader.get("rooms/materials/floor/tiles");
        }
    }
}
