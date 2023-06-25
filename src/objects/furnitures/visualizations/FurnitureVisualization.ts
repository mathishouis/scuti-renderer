import type { Spritesheet } from 'pixi.js';
import { Assets, BLEND_MODES, Sprite } from 'pixi.js';

import { Direction } from '../../../enums/Direction';
import { ZOrder } from '../../../utilities/ZOrder';
import { AssetLoader } from '../../../utilities/AssetLoader';
import { FurnitureLayer } from './FurnitureLayer';
import { RoomObjectVisualization } from '../../rooms/objects/RoomObjectVisualization';
import type {
  IFloorPosition,
  IFurnitureLayerData,
  IFurnitureProperty,
  IFurnitureVisualization,
  IWallPosition
} from '../../../types/Furniture';
import { WallFurniture } from '../WallFurniture';
import { FloorFurniture } from '../FloorFurniture';

export class FurnitureVisualization extends RoomObjectVisualization {
  // updateLayerPosition and layerData private
  private readonly _frames: Map<number, number> = new Map();

  public _layers = new Map<number, FurnitureLayer>();

  public _spritesheet!: Spritesheet;

  public _properties!: IFurnitureProperty;

  public _furniture: FloorFurniture | WallFurniture;

  constructor(furniture: FloorFurniture | WallFurniture) {
    super();

    this._furniture = furniture;
    this._loadAssets();

    this._furniture.onRoomAdded = (room) => {
      if (this.loaded) room.visualization.animationTicker.add(() => this._update());
    };
  }

  private _loadAssets(): void {
    const name = this._furniture.data.baseName;

    if (this._furniture.onLoad !== undefined) this._furniture.onLoad();
    AssetLoader.load('furnitures/' + name, 'furniture/' + name + '/' + name + '.json')
      .then(() => {
        if (this._furniture.onLoadComplete !== undefined) this._furniture.onLoadComplete();

        this._spritesheet = Assets.get('furnitures/' + name);
        // @ts-expect-error
        this._properties = this._spritesheet.data.furniProperty;
        this.loaded = true;

        if (this.placeholder !== undefined) this.placeholder.destroy();
        if (this._furniture.room != null) this._furniture.room.visualization.animationTicker.add(() => this._update());
      })
      .catch(() => {
        this.logger.error(
          'Unable to load the assets "' +
            name +
            '". It can be an invalid file, an invalid json format or just it don\t exist!'
        );
      });
  }

  private _update(): void {
    const visualization = this._properties.visualization;

    for (let i = 0; i < this._properties.visualization.layerCount; i++) {
      const frame = visualization.animation[String(this._furniture.state)];

      if (frame !== undefined && frame[i] !== undefined) {
        const frameSequence = frame[i].frameSequence;
        const currentFrame = this._frames.get(i) ?? 0;

        if (frameSequence.length > 1) {
          if (frameSequence.length - 1 > currentFrame) {
            this._frames.set(i, currentFrame + 1);
          } else this._frames.set(i, 0);

          this._renderLayer(i, this._frames.get(i) ?? 0);
        } else {
          if (this._layers.get(i) == null) this._renderLayer(i, 0);
        }
      } else {
        if (this._layers.get(i) == null) this._renderLayer(i, 0);
      }
    }
  }

  private _renderLayer(layer: number, frame: number): void {
    const visualization = this._properties.visualization;
    const furnitureLayer = this._layers.get(layer);
    const frames = visualization.animation[this._furniture.state];

    if (furnitureLayer != null) furnitureLayer.destroy();

    if (this._properties.infos.visualization === 'furniture_animated' && frames === undefined) {
      this._furniture.state = Number(Object.keys(visualization.animation)[0]);
      return;
    }

    const layerData = this.layerData(layer, frame);

    if (!visualization.directions.includes(this._furniture.direction)) {
      this._furniture.rotate(visualization.directions[0], 0);
    }

    if (frames !== undefined && frames[layer] !== undefined && frames[layer].frameSequence.length > 1)
      layerData.frame = frame;

    if (frames !== undefined && frames[layer] !== undefined)
      layerData.frame = frames[layer].frameSequence[layerData.frame] ?? 0;

    const layerContainer = new FurnitureLayer(this._furniture, layerData);

    layerContainer.zIndex = layerData.z;
    this._layers.set(layer, layerContainer);

    if (this._furniture.room != null) {
      // @ts-expect-error
      this._furniture.addChild(layerContainer);
      this.updateLayerPosition(layer);
    }

    layerContainer.filters = this._furniture.filters; // TODO: Move this to global
  }

  destroy(): void {
    if (this.placeholder.parent !== null) this.placeholder.destroy();
    this._layers.forEach((layer) => layer.destroy());
    this._layers.clear();
  }

  render(): void {
    this.destroy();
    this.directions = this._properties.visualization.directions;

    for (let i = 0; i < this._properties.visualization.layerCount; i++) {
      this._renderLayer(i, this._frames.get(i) ?? 0);
    }
  }

  updatePosition(): void {
    if (this._furniture instanceof FloorFurniture) {
      const position = this._furniture.position as IFloorPosition;

      return this._layers.forEach((layer) => {
        layer.x = layer.texture.orig.x + 32 + 32 * position.x - 32 * position.y;
        layer.y = layer.texture.orig.y + 16 * position.x + 16 * position.y - 32 * position.z;
      });
    } else {
      const position = this._furniture.position as IWallPosition;

      // TODO: Refactor wall items
      return this._layers.forEach((layer) => {
        if (this._furniture.direction === Direction.EAST) {
          layer.x = layer.texture.orig.x + 32 + 32 * position.x - 32 * position.y + position.offsetX * 2 - 1;
          layer.y = layer.texture.orig.y + 16 * position.x + 16 * position.y - 32 + position.offsetY * 2 + 31;
        } else if (this._furniture.direction === Direction.SOUTH) {
          layer.x = layer.texture.orig.x + 32 + 32 * position.x - 32 * position.y + position.offsetX * 2 - 32;
          layer.y = layer.texture.orig.x + 16 * position.x + 16 * position.y - 32 + position.offsetY * 2 + 31;
        }
      });
    }
  }

  updateLayerPosition(layer: number): void {
    const furnitureLayer = this._layers.get(layer);
    if (furnitureLayer == null) return;
    if (this._furniture instanceof FloorFurniture) {
      const position = this._furniture.position as IFloorPosition;

      furnitureLayer.x = furnitureLayer.texture.orig.x + 32 + 32 * position.x - 32 * position.y;
      furnitureLayer.y = furnitureLayer.texture.orig.y + 16 * position.x + 16 * position.y - 32 * position.z;
    } else {
      const position = this._furniture.position as IWallPosition;

      if (this._furniture.direction === Direction.EAST) {
        furnitureLayer.x =
          furnitureLayer.texture.orig.x + 32 + 32 * position.x - 32 * position.y + position.offsetX * 2 - 1;
        furnitureLayer.y =
          furnitureLayer.texture.orig.y + 16 * position.x + 16 * position.y - 32 + position.offsetY * 2 + 31;
      } else if (this._furniture.direction === Direction.SOUTH) {
        furnitureLayer.x =
          furnitureLayer.texture.orig.x + 32 + 32 * position.x - 32 * position.y + position.offsetX * 2 - 32;
        furnitureLayer.y =
          furnitureLayer.texture.orig.x + 16 * position.x + 16 * position.y - 32 + position.offsetY * 2 + 31;
      }
    }
  }

  renderPlaceholder(): void {
    if (this._furniture instanceof FloorFurniture) {
      const position = this._furniture.position as IFloorPosition;

      this.placeholder = new Sprite(
        Assets.get('furnitures/floor/placeholder').textures['place_holder_furniture_64.png']
      );

      if (this._furniture.room != null) this._furniture.addChild(this.placeholder);

      this.placeholder.x = 32 + 32 * position.x - 32 * position.y - 32;
      this.placeholder.y = 16 * position.x + 16 * position.y - 32 * position.z - 50;
    } else {
      const position = this._furniture.position as IWallPosition;

      this.placeholder = new Sprite(
        Assets.get('furnitures/wall/placeholder').textures['place_holder_wall_item_64.png']
      );

      if (this._furniture.room != null) this._furniture.addChild(this.placeholder);
      if (this._furniture.direction === Direction.EAST) {
        this.placeholder.x = 32 + 32 * position.x - 32 * position.y + position.offsetX * 2 - 1;
        this.placeholder.y = 16 * position.x + 16 * position.y - 32 + position.offsetY * 2 + 31 - 50;
      } else if (this._furniture.direction === Direction.SOUTH) {
        this.placeholder.scale.x = -1;
        this.placeholder.x = 32 + 32 * position.x - 32 * position.y + position.offsetX * 2 - 32;
        this.placeholder.y = 16 * position.x + 16 * position.y - 32 + position.offsetY * 2 + 31 - 50;
      }
    }
  }

  layerData(layer: number, frame: number = 0): IFurnitureLayerData {
    const spritesheet = Assets.get<Spritesheet>('furnitures/' + this._furniture.data.baseName);
    // @ts-expect-error
    const visualization = spritesheet.data.furniProperty.visualization as IFurnitureVisualization;
    const layerData: IFurnitureLayerData = {
      layer,
      alpha: 1,
      z: 0,
      blendMode: BLEND_MODES.NORMAL,
      flip: false,
      frame: 0,
      ignoreMouse: false,
      direction: Direction.NORTH
    };

    if (!visualization.directions.includes(this._furniture.direction))
      this._furniture.rotate(visualization.directions[0], 0);

    layerData.direction = this._furniture.direction;

    if (
      this._furniture.data.color !== null &&
      visualization.colors[this._furniture.data.color] !== undefined &&
      visualization.colors[this._furniture.data.color][layer] !== undefined
    )
      layerData.tint = Number('0x' + String(visualization.colors[this._furniture.data.color][layer]));

    const visualizationLayerData = visualization.layers[layer];

    if (visualizationLayerData !== undefined) {
      if (visualizationLayerData.z !== undefined) layerData.z = visualizationLayerData.z;
      if (visualizationLayerData.alpha !== undefined) layerData.alpha = visualizationLayerData.alpha / 255;
      if (visualizationLayerData.ink !== undefined) layerData.blendMode = BLEND_MODES[visualizationLayerData.ink];
      if (visualization.layers[layer].ignoreMouse !== undefined)
        layerData.ignoreMouse = visualizationLayerData.ignoreMouse;
      if (visualization.layers[layer].tag !== undefined) layerData.tag = visualizationLayerData.tag;
    }

    const name = [
      this._furniture.data.baseName,
      this._furniture.data.baseName,
      64,
      String.fromCharCode(97 + Number(layer)),
      this._furniture.direction,
      frame
    ].join('_');

    if (this._furniture instanceof FloorFurniture)
      layerData.z = ZOrder.floorItem(this._furniture.position as IFloorPosition, layerData.z);

    if (this._furniture instanceof WallFurniture)
      layerData.z = ZOrder.wallItem(this._furniture.position as IWallPosition, layerData.z);

    // @ts-expect-error
    if (spritesheet.data.frames[name] !== undefined) layerData.flip = spritesheet.data.frames[name].flipH;

    return layerData;
  }
}
