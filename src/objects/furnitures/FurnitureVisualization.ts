import {FloorFurniture} from "./FloorFurniture";
import {WallFurniture} from "./WallFurniture";
import {Assets, BLEND_MODES, Spritesheet} from "pixi.js";
import {IFurnitureLayerData, IFurnitureProperty, IFurnitureVisualization} from "../../interfaces/Furniture";
import {Direction} from "../../enums/Direction";
import {ZOrder} from "../../utilities/ZOrder";

export abstract class FurnitureVisualization {
  public _furniture: FloorFurniture | WallFurniture

  constructor(
    furniture: FloorFurniture | WallFurniture
  ) {
    this._furniture = furniture;
  }

  abstract destroy(): void;
  abstract render(): void;
  abstract renderLayer(layer: number, frame: number): void;

  layerData(layer: number, frame: number = 0): IFurnitureLayerData {
    const spritesheet: Spritesheet = Assets.get('furnitures/' + this._furniture.data.baseName);
    // @ts-ignore
    const properties: IFurnitureProperty = spritesheet.data.furniProperty as IFurnitureProperty;
    const visualization: IFurnitureVisualization = properties.visualization;
    const layerData: IFurnitureLayerData = {
      layer: layer,
      alpha: 1,
      z: 0,
      blendMode: BLEND_MODES.NORMAL,
      flip: false,
      frame: 0,
      ignoreMouse: false,
      direction: Direction.NORTH,
      tag: "",
    }

    if (!visualization.directions.includes(this._furniture.direction))
      this._furniture.direction = visualization.directions[0];

    if (
      this._furniture.data.color !== null &&
      visualization.colors[this._furniture.data.color] !== undefined &&
      // @ts-expect-error
      visualization.colors[this._furniture.data.color][layer] !== undefined
    )
      // @ts-expect-error
      layerData.tint = Number('0x' + String(visualization.colors[this._furniture.data.color][layer]));

    const visualizationLayerData = visualization.layers[layer];
    if (visualizationLayerData !== undefined) {
      if (visualizationLayerData.z !== undefined) layerData.z = visualizationLayerData.z;
      if (visualizationLayerData.alpha !== undefined) layerData.alpha = visualizationLayerData.alpha / 255;
      if (visualizationLayerData.ink !== undefined)
        // @ts-expect-error
        layerData.blendMode = BLEND_MODES[visualizationLayerData.ink];
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

    if (this._furniture instanceof FloorFurniture) layerData.z = ZOrder.floorItem(this._furniture.roomPosition, layerData.z);
    if (this._furniture instanceof WallFurniture) layerData.z = ZOrder.wallItem(this._furniture.roomPosition, layerData.z);

    // @ts-ignore
    if (spritesheet.data.frames[name] !== undefined) layerData.flip = spritesheet.data.frames[name].flipH;
    return layerData;
  }
  abstract update(): void;
}
