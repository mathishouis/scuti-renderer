import { RoomMaterial } from "./RoomMaterial.ts";
import { Texture } from "pixi.js";
import { AssetLoader } from "../../assets/AssetLoader.ts";
import { Material } from "../../../types/Material.ts";

export class WallMaterial extends RoomMaterial {
    public color!: number;
    public texture!: Texture;

    constructor(
        public id: number
    ) {
        super();

        this._initialize();
    }

    private _initialize(): void {
        const material: Material = AssetLoader.get("room/materials/wall").find((material: Material) => material.id === this.id);

        if (material) {
            this.color = material.color;
            this.texture = AssetLoader.get(`room/materials/wall/${material.texture}`);
        } else {
            this.color = 16777215;
            this.texture = AssetLoader.get("room/materials/wall/lively");
        }
    }
}
