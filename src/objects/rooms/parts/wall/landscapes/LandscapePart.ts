import { RoomPart } from '../../RoomPart';
import { Room } from '../../../Room';
import { Container, Point } from 'pixi.js';
import { EventManager } from '../../../../events/EventManager';
import { Vector3D } from '../../../../../types/Vector';
import { Direction } from '../../../../../enums/Direction';
import { LandscapeMaterial } from '../../../materials/LandscapeMaterial';
import { LandscapeColorLayer } from './layers/LandscapeColorLayer';
import { LandscapeTextureLayer } from './layers/LandscapeTextureLayer';
import { LandscapeMatriceLayer } from './layers/LandscapeMatriceLayer';

interface Configuration {
  material?: LandscapeMaterial;
  position: Vector3D;
  length: number;
  floorThickness: number;
  height: number;
  direction: Direction;
  door?: number;
}

// todo(): Add animated layer :(
export class LandscapePart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  constructor(public configuration: Configuration) {
    super();
  }

  public render(): void {
    const material: LandscapeMaterial = this.configuration.material ?? new LandscapeMaterial(101);

    material.staticLayers.forEach((layer: any) => {
      if (layer['color']) {
        new LandscapeColorLayer({ part: this, color: layer['color'] }).render();
      } else if (layer['texture']) {
        new LandscapeTextureLayer({ part: this, name: layer['texture'] }).render();
      } else if (layer['matrice']) {
        new LandscapeMatriceLayer({ part: this, name: layer['matrice'] }).render();
      }
    });

    const size: Vector3D = {
      x: 0,
      y: 0,
      z: this.configuration.floorThickness / 32 - this.configuration.position.z,
    };

    if (this.configuration.height !== -1) {
      size.z += 115 / 32 + (64 / 32) * this.configuration.height;
    } else {
      size.z += this.room.heightMap.maxHeight + 115 / 32;
    }

    if (this.configuration.direction === Direction.WEST) {
      size.y = this.configuration.length;
    } else if (this.configuration.direction === Direction.NORTH) {
      size.x = this.configuration.length;
    }

    if (this.configuration.direction === Direction.WEST) {
      this.container.x =
        32 * this.configuration.position.x - 32 * (this.configuration.position.y + this.configuration.length - 1);
      this.container.y =
        16 * this.configuration.position.x +
        16 * (this.configuration.position.y + this.configuration.length - 1) -
        32 * this.configuration.position.z -
        size.z * 32 +
        this.configuration.floorThickness;
    } else if (this.configuration.direction === Direction.NORTH) {
      this.container.x = 32 * this.configuration.position.x - 32 * (this.configuration.position.y - 1);
      this.container.y =
        16 * this.configuration.position.x +
        16 * (this.configuration.position.y - 1) -
        32 * this.configuration.position.z -
        size.z * 32 +
        this.configuration.floorThickness;
    }

    this.room.visualization.container.addChild(this.container);
  }

  public getGlobalTilePosition(point: Point): Vector3D {
    const localPosition: Point = this.container.toLocal(point);
    const localX: number = Math.floor(localPosition.x / 64 + localPosition.y / 32),
      localY: number = Math.floor(localPosition.y / 32 - localPosition.x / 64 - 0.01) + this.configuration.length;
    return {
      x: localX + this.configuration.position.x,
      y: localY + this.configuration.position.y,
      z: this.configuration.position.z,
    };
  }
}
