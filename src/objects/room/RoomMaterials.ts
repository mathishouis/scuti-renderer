import { BaseImageResource, Sprite, Texture } from 'pixi.js';
import { Scuti } from "../../Scuti";
import { RoomMaterial } from "./RoomMaterial";

export class RoomMaterials {

    private _engine: Scuti;

    private _floorMaterials: Map<number, RoomMaterial>;
    private _wallMaterials: Map<number, RoomMaterial>;

    constructor(engine: Scuti) {

        this._engine = engine;

        this._floorMaterials = new Map<number, RoomMaterial>();
        this._wallMaterials = new Map<number, RoomMaterial>();

    }

    public async initialise(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const roomData = this._engine.resources.get('room_data');

            roomData.floorData.floors.forEach((floor: any) => {
                const color = floor.visualizations[0].layers[0].color;
                const material = floor.visualizations[0].layers[0].materialId;
                const texture = roomData.floorData.textures.find((texture) => {
                    return texture.id === material;
                });
                const name = texture.bitmaps[0].assetName;
                this._floorMaterials.set(Number(floor.id), new RoomMaterial(color, this.getTexture(name)));
            });

            roomData.wallData.walls.forEach((wall: any) => {
                const color = wall.visualizations[0].layers[0].color;
                const material = wall.visualizations[0].layers[0].materialId;
                const texture = roomData.wallData.textures.find((texture) => {
                    return texture.id === material;
                });
                const name = texture.bitmaps[0].assetName;
                this._wallMaterials.set(Number(wall.id), new RoomMaterial(color, this.getTexture(name)));
            });
            resolve();
        });

    }

    public getFloorMaterial(id: number) {
        return this._floorMaterials.get(id);
    }

    public getWallMaterial(id: number) {
        return this._wallMaterials.get(id);
    }

    public getTexture(name: string): Texture {
        const texture = this._engine.resources.get('room').textures['room_' + name + '.png']
        const sprite = new Sprite(texture);
        const finalTexture = this._engine.application.renderer.generateTexture(sprite);
        const image = this._engine.application.renderer.plugins.extract.image(finalTexture)
        finalTexture.baseTexture.resource = new BaseImageResource(image);
        return new Texture(finalTexture);
    }


}