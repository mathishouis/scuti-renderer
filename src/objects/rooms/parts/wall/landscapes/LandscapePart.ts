import { RoomPart } from '../../RoomPart';
import { Room } from '../../../Room';
import { Container } from 'pixi.js';
import { EventManager } from '../../../../events/EventManager';
import { Vector3D } from '../../../../../types/Vector';
import { Direction } from '../../../../../enums/Direction';
import { LandscapeMaterial } from '../../../materials/LandscapeMaterial';
import { Cube } from '../../../geometry/Cube';
import { CubeFace } from '../../../../../enums/CubeFace';
import { LandscapeLayer } from './layers/LandscapeLayer';

interface Configuration {
  material?: LandscapeMaterial;
  position: Vector3D;
  length: number;
  floorThickness: number;
  height: number;
  direction: Direction;
}

export class LandscapePart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  private _mask!: Cube;
  private _layers: LandscapeLayer[] = [];

  constructor(public configuration: Configuration) {
    super();
  }

  public get mask(): Cube {
    if (this._mask) return this._mask;

    this._mask = new Cube({
      layer: this.room.renderer.layer,
      size: {
        x: this.configuration.direction === Direction.NORTH ? this.configuration.length : 0,
        y: this.configuration.direction === Direction.WEST ? this.configuration.length : 0,
        z:
          this.configuration.height === -1
            ? this.room.parsedHeightMap.maxHeight + 115 / 32
            : 115 / 32 + (64 / 32) * this.configuration.height,
      },
      zOrders: {
        [CubeFace.TOP]: -4,
        [CubeFace.LEFT]: -4 - 0.5,
        [CubeFace.RIGHT]: -4 - 0.6,
      },
    });

    return this._mask;
  }

  public render(): void {
    const material: LandscapeMaterial = this.configuration.material ?? new LandscapeMaterial(101);
    const { direction, length, floorThickness, position, height } = this.configuration;
    const baseX = 32 * position.x - 32 * (direction === Direction.WEST ? position.y + length - 1 : position.y - 1);
    const baseY = 16 * position.x + 16 * (direction === Direction.WEST ? position.y + length - 1 : position.y - 1);
    const size: Vector3D = {
      x: direction === Direction.NORTH ? length : 0,
      y: direction === Direction.WEST ? length : 0,
      z:
        floorThickness / 32 - position.z + (height === -1 ? this.room.parsedHeightMap.maxHeight + 115 / 32 : 115 / 32 + (64 / 32) * height),
    };

    this._layers = [];

    material.layers.forEach((layer: any) => {
      const landscapeLayer: LandscapeLayer = new layer.layer({ ...layer.params, ...{ part: this } });
      this._layers.push(landscapeLayer);
      this.container.addChild(landscapeLayer.container);
      landscapeLayer.render();
    });

    this.container.interactiveChildren = false;
    this.container.addChild(this.mask);
    this.container.mask = this.mask;
    this.container.parentLayer = this.room.visualization.layers.parts.landscapes;
    this.container.x = baseX;
    this.container.y = baseY - 32 * position.z - size.z * 32 + floorThickness;
  }

  public destroy() {
    if (this._mask !== undefined) {
      this._mask.destroy();
      this._mask = undefined as any;
    }

    if (this._layers.length > 0) {
      this._layers.forEach((layer: LandscapeLayer) => layer.destroy());
      this._layers = [];
    }

    if (this.container !== undefined) {
      this.container.destroy();
      this.container = undefined as any;
    }
  }
}
