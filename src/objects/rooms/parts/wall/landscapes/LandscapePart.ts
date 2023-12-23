import { RoomPart } from '../../RoomPart';
import { Room } from '../../../Room';
import { Container, Point } from 'pixi.js';
import { EventManager } from '../../../../events/EventManager';
import { Vector2D, Vector3D } from '../../../../../types/Vector';
import { Direction } from '../../../../../enums/Direction';
import { AssetLoader } from '../../../../assets/AssetLoader';
import { LandscapeMatriceLayer } from './layers/LandscapeMatriceLayer.ts';

interface Configuration {
  position: Vector3D;
  length: number;
  floorThickness: number;
  height: number;
  direction: Direction;
  door?: number;
}

// todo(): SEPARATE EVERYTHING IN DIFFERENT CLASS AND MAKE EVERYTHING LOOKS CLEANER
export class LandscapePart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  constructor(public configuration: Configuration) {
    super();
  }

  public render(): void {
    let spritesheet = AssetLoader.get('room/materials');
    let landscapeId = 101;
    let landscapeData = spritesheet.data.materials.landscapes.data.find(
      (landscape: any) => landscape.id === landscapeId,
    );
    landscapeData.layers.static.forEach((staticLayer: any) => {
      if (staticLayer.matrice) {
      } else if (staticLayer.texture) {
        //new LandscapeTextureLayer({ part: this, name: staticLayer.texture }).render();
        new LandscapeMatriceLayer({ part: this, name: 'landscape_64_foreground_1' }).render();
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
