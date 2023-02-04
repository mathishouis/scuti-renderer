import { Material } from "./Material";
import { Assets, Sprite, Texture } from "pixi.js";
import { Scuti } from "../../../Scuti";

export class WallMaterial extends Material {

    /**
     * The engine instance
     * @private
     */
    private _engine: Scuti;

    /**
     * The material id
     * @private
     */
    private _id: number;

    /**
     * WallMaterial class
     * @param engine - The engine instance
     * @param id     - The material id
     */
    constructor(
        engine: Scuti,
        id: number
    ) {
        super(0xFFFFFF, Texture.WHITE);

        this._engine = engine;
        this._id = id;

        this._load();
    }

    /**
     * Load the material
     * @private
     */
    private _load(): void {
        const materials: { wallData: { textures: [] } } = Assets.get('room/materials');
        const material: { id: string, visualizations: [] } = materials.wallData.walls.find(material => {
            return Number(material.id) === this._id;
        });
        const color: number = material.visualizations[0].layers[0].color;
        const materialId: number = material.visualizations[0].layers[0].materialId;
        const materialTexture: { id: string, bitmaps: [] } = materials.wallData.textures.find(texture => {
            return texture.id === materialId;
        });
        const name: string = materialTexture.bitmaps[0].assetName;
        const texture: Texture = Assets.get('room/room').textures['room_' + name + '.png'];
        const sprite: Sprite = new Sprite(texture);

        this.color = color;
        this.texture = new Texture(this._engine.application.renderer.generateTexture(sprite).baseTexture);
    }

}
