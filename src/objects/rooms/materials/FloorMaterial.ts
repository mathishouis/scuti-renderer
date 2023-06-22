import type { Spritesheet } from 'pixi.js';
import { Assets, Sprite, Texture } from 'pixi.js';

import { Material } from './Material';
import type { Scuti } from '../../../Scuti';
import type { RoomMaterial } from '../../../types/RoomMaterial';
import { Logger } from '../../../utilities/Logger';

export class FloorMaterial extends Material {
  /**
   * The game engine instance that the room will be using to render texture.
   *
   * @member {Scuti}
   * @private
   */
  private readonly _engine: Scuti;

  /**
   * The material id from materials.json.
   *
   * @member {number}
   * @private
   */
  private readonly _id: number | undefined;

  /**
   * @param {Scuti} [engine] - The scuti engine instance to use.
   * @param {number} [id] - The id of the material (it can be found into materials.json).
   **/
  constructor(engine: Scuti, id?: number) {
    super(0xffffff, Texture.WHITE);

    this._engine = engine;
    this._id = id;

    this._load();
  }

  /**
   * Load the material.
   *
   * @return {void}
   * @private
   */
  private _load(): void {
    const materials = Assets.get<RoomMaterial>('room/materials');
    const defaultMaterial = materials.floorData.floors[0];

    let material = materials.floorData.floors.find((material) => {
      if (this._id != null) return material.id === this._id.toString();
      else return defaultMaterial;
    });

    if (material == null) {
      const console = new Logger('FloorMaterial');
      this._id != null && console.warn(`Unknown floor id: "${this._id}"`);
      /** apply default (white) one rather than throwing an error */
      material = defaultMaterial;
    }

    const { color, materialId } = material.visualizations[0].layers[0];
    const materialTexture = materials.floorData.textures.find((texture) => {
      return texture.id === materialId.toString();
    });

    const name = materialTexture?.bitmaps[0].assetName as string;
    const texture = Assets.get<Spritesheet>('room/room').textures[`room_${name}.png`];
    const sprite = new Sprite(texture);

    this.color = color;
    this.texture = new Texture(this._engine.application.renderer.generateTexture(sprite).baseTexture);
  }
}
