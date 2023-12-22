import { RoomPart } from './RoomPart';
import { Room } from '../Room';
import { Container, Point, Sprite, Spritesheet, Texture } from 'pixi.js';
import { Cube } from '../geometry/Cube';
import { EventManager } from '../../events/EventManager';
import { Vector2D, Vector3D } from '../../../types/Vector';
import { CubeFace } from '../../../enums/CubeFace';
import { Direction } from '../../../enums/Direction';
import { AssetLoader } from '../../assets/AssetLoader';
import { random } from '../../../utils/Random';

interface Configuration {
  position: Vector3D;
  length: number;
  floorThickness: number;
  height: number;
  direction: Direction;
  door?: number;
}

enum RepeatMode {
  NONE = 'none',
  RANDOM = 'random',
}

enum Align {
  BOTTOM = 'bottom',
  TOP = 'top',
  ALL = 'all',
}

interface Material {
  id: string;
  repeat: RepeatMode;
  align: Align;
  columns: Column[];
}

interface Column {
  texture: string;
  extras: Extra[];
}

interface Extra {
  max: number;
  texture: string;
  offsets: Vector2D[];
}

interface Layer {
  texture: Texture;
  align: Align;
}

// todo(): SEPARATE EVERYTHING IN DIFFERENT CLASS AND MAKE EVERYTHING LOOKS CLEANER
export class LandscapePart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  constructor(public configuration: Configuration) {
    super();
  }

  public parseLandscapeColumn({ texture, extras }: Column): Texture {
    const spritesheet = AssetLoader.get('room/materials') as Spritesheet;
    const container = new Container();
    const background = new Sprite(spritesheet.textures[texture]);

    container.addChild(background);

    extras.forEach((extra: Extra) => {
      const seed = this.configuration.position.x + this.configuration.position.y + this.configuration.length;
      const finalOffsets: Vector2D[] = [];
      const randomIndex = random(seed, 0, extra.offsets.length - 1);

      for (let i = 0; i < extra.max; i++) {
        const offset = extra.offsets[randomIndex];
        if (!finalOffsets.includes(offset)) finalOffsets.push(offset);
      }

      finalOffsets.forEach((offset: Vector2D) => {
        const sprite = new Sprite(spritesheet.textures[extra.texture]);
        //if (this.configuration.direction === Direction.NORTH) sprite.scale.x = -1;
        sprite.x = offset.x;
        sprite.y = offset.y;
        container.addChild(sprite);
      });
    });

    return this.room.renderer.application.renderer.generateTexture(container);
  }

  public parseLandscapeMaterial({ repeat, align, columns }: Material): Texture {
    //console.log(repeat, align, columns);
    const columnTextures = columns.map((column: Column) => this.parseLandscapeColumn(column));
    const container = new Container();
    const maxWidth = this.configuration.length * 32;
    let offset = 0;

    if (repeat === RepeatMode.RANDOM) {
      while (offset < maxWidth) {
        const seed = this.configuration.position.x + this.configuration.position.y + this.configuration.length + offset;
        const randomIndex = random(seed, 0, 1);
        const column = columnTextures[randomIndex];
        const sprite = new Sprite(column);

        sprite.x = offset;
        if (this.configuration.direction === Direction.NORTH) sprite.scale.x = -1;
        container.addChild(sprite);
        offset += sprite.width;
      }
    } else if (repeat === RepeatMode.NONE) {
    }

    return this.room.renderer.application.renderer.generateTexture(container);
  }

  public renderLayer({ texture, align }: Layer): Cube {
    const zOrder: number = (this.configuration.position.z - 1) * 4;
    const size: Vector3D = {
      x: 0,
      y: 0,
      z: texture.height / 32,
    };
    const position: Vector2D = {
      x: 0,
      y: 0,
    };
    if (align === Align.BOTTOM) {
      if (this.configuration.height !== -1) {
        position.y = 115 + 64 * this.configuration.height - texture.height;
      } else {
        position.y = this.room.heightMap.maxHeight * 32 + 115 - texture.height;
      }
    } else if (align === Align.ALL) {
      if (this.configuration.height !== -1) {
        size.z = 115 / 32 + (64 / 32) * this.configuration.height;
      } else {
        size.z = this.room.heightMap.maxHeight + 115 / 32;
      }
    }

    if (this.configuration.direction === Direction.WEST) {
      size.y = this.configuration.length;
    } else if (this.configuration.direction === Direction.NORTH) {
      size.x = this.configuration.length;
    }

    const cube: Cube = new Cube({
      layer: this.room.renderer.layer,
      size: size,
      zOrders: {
        [CubeFace.TOP]: zOrder,
        [CubeFace.LEFT]: zOrder - 0.5,
        [CubeFace.RIGHT]: zOrder - 0.6,
      },
      texture: texture,
      shadows: false,
    });
    cube.x = position.x;
    cube.y = position.y;

    return cube;
  }

  public render(): void {
    let spritesheet = AssetLoader.get('room/materials');
    let landscapeId = 'default';
    let landscapeData = spritesheet.data.materials.landscapes.data.find(
      (landscape: any) => landscape.id === landscapeId,
    );
    landscapeData.layers.static.forEach((staticLayer: any) => {
      if (staticLayer.material) {
        let material = spritesheet.data.materials.landscapes.materials.find(
          (fMaterial: any) => staticLayer.material === fMaterial.id,
        ) as Material;
        //console.log(material);
        this.container.addChild(
          this.renderLayer({ texture: this.parseLandscapeMaterial(material), align: material.align }),
        );
      } else if (staticLayer.texture) {
        // color
        const texture = this.room.renderer.application.renderer.generateTexture(
          new Sprite(spritesheet.textures[staticLayer.texture]),
        );
        this.container.addChild(this.renderLayer({ texture: texture, align: Align.ALL }));
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
