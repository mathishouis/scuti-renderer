import { FurnitureVisualization } from "../FurnitureVisualization";
import { FloorFurniture } from "../FloorFurniture";
import { WallFurniture } from "../WallFurniture";
import { Assets, Spritesheet } from "pixi.js";
import { IFurnitureLayerData, IFurnitureProperty, IFurnitureVisualization } from "../../../interfaces/Furniture";
import { FurnitureLayer } from "../FurnitureLayer";

export class FurnitureAnimatedVisualization extends FurnitureVisualization {

  private _frames: Map<number, number> = new Map();
  private _layers: Map<number, FurnitureLayer> = new Map();

  constructor(
    furniture: FloorFurniture | WallFurniture
  ) {
    super(furniture);
  }

  public render(): void {
    const spritesheet: Spritesheet = Assets.get('furnitures/' + this._furniture.data.baseName);
    // @ts-ignore
    const properties: IFurnitureProperty = spritesheet.data.furniProperty as IFurnitureProperty;
    this.destroy();
    for (let i = 0; i < properties.visualization.layerCount; i++) {
      this.renderLayer(i, this._frames.get(i) ?? 0);
    }
  }

  public renderLayer(layer: number, frame: number): void {
    const spritesheet: Spritesheet = Assets.get('furnitures/' + this._furniture.data.baseName);
    // @ts-ignore
    const properties: IFurnitureProperty = spritesheet.data.furniProperty as IFurnitureProperty;
    const visualization: IFurnitureVisualization = properties.visualization;
    const furnitureLayer: FurnitureLayer | undefined = this._layers.get(layer);

    if (furnitureLayer) furnitureLayer.destroy();

    if (
      properties.infos.visualization === 'furniture_animated' &&
      visualization.animation[this._furniture.state] === undefined
    ) {
      this._furniture.state = Number(Object.keys(visualization.animation)[0]);
      return;
    }
    const layerData: IFurnitureLayerData = this.layerData(layer, frame);

    if (!visualization.directions.includes(this._furniture.direction))
      this._furniture.direction = visualization.directions[0];

    if (
      visualization.animation[this._furniture.state] !== undefined &&
      visualization.animation[this._furniture.state][layer] !== undefined &&
      visualization.animation[this._furniture.state][layer].frameSequence.length > 1
    )
      layerData.frame = frame;

    if (
      visualization.animation[this._furniture.state] !== undefined &&
      visualization.animation[this._furniture.state][layer] !== undefined
    )
      layerData.frame = visualization.animation[this._furniture.state][layer].frameSequence[layerData.frame] ?? 0;

    //console.log("frame:", layer, layerData.frame);

    const layerContainer = new FurnitureLayer(this._furniture, {
      layer: layerData.layer,
      alpha: layerData.alpha,
      tint: layerData.tint,
      z: layerData.z,
      blendMode: layerData.blendMode,
      flip: layerData.flip,
      frame: layerData.frame,
      ignoreMouse: layerData.ignoreMouse,
      direction: this._furniture.direction,
      tag: layerData.tag,
    });
    layerContainer.zIndex = layerData.z;
    this._furniture.room.objects.addChild(
      // @ts-expect-error
      layerContainer
    );
    layerContainer.x += 32 + 32 * this._furniture.roomPosition.x - 32 * this._furniture.roomPosition.y;
    layerContainer.y += 16 * this._furniture.roomPosition.x + 16 * this._furniture.roomPosition.y - 32 * this._furniture.roomPosition.z;
    this._layers.set(layer, layerContainer);
  }

  public update(): void {
    const spritesheet: Spritesheet = Assets.get('furnitures/' + this._furniture.data.baseName);
    // @ts-ignore
    const properties: IFurnitureProperty = spritesheet.data.furniProperty as IFurnitureProperty;
    const visualization: IFurnitureVisualization = properties.visualization;
    for (let i = 0; i < properties.visualization.layerCount; i++) {
      if (
        // @ts-expect-error
        visualization.animation[String(this._furniture.state)] !== undefined &&
        // @ts-expect-error
        visualization.animation[String(this._furniture.state)][i] !== undefined
      ) {
        // @ts-expect-error
        const frameSequence: number[] = visualization.animation[String(this._furniture.state)][i].frameSequence;
        const currentFrame = this._frames.get(i) ?? 0;
        if (frameSequence.length > 1) {
          if (frameSequence.length - 1 > currentFrame) {
            this._frames.set(i, currentFrame + 1);
          } else {
            this._frames.set(i, 0);
          }
          this.renderLayer(i, this._frames.get(i) ?? 0);
        } else {
          if (!this._layers.get(i)) this.renderLayer(i, 0);
        }
      } else {
        if (!this._layers.get(i)) this.renderLayer(i, 0);
      }
    }
  }

  public destroy(): void {
    this._layers.forEach((layer: FurnitureLayer) => {
      layer.destroy();
    });
    this._layers = new Map<number, FurnitureLayer>();
  }
}
