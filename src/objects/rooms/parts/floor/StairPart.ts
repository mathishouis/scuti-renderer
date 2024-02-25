import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';
import { Container, FederatedPointerEvent, Graphics, Point, Polygon } from 'pixi.js';
import { FloorMaterial } from '../../materials/FloorMaterial';
import { Cube } from '../../geometry/Cube';
import { Vector2D, Vector3D } from '../../../../types/Vector';
import { CubeFace } from '../../../../enums/CubeFace';
import { EventManager } from '../../../events/EventManager';
import { StairType } from '../../../../enums/StairType';
import { Direction } from '../../../../enums/Direction';
import { floorOrder } from '../../../../utils/Sorting';
import { StairMesh } from '../../../..';

interface Configuration extends StairMesh {
  material: FloorMaterial;
  thickness: number;
}

export class StairPart extends RoomPart {
  public room!: Room;
  public container: Container | undefined = new Container();
  public eventManager: EventManager = new EventManager();

  private _material: Configuration['material'];
  private _position: Configuration['position'];
  private _thickness: Configuration['thickness'];
  private _length: Configuration['length'];
  private _direction: Configuration['direction'];
  private _corners: Configuration['corners'];

  constructor({ material, position, thickness, length, direction, corners }: Configuration) {
    super();

    this._material = material;
    this.container!.name = `X:${position.x}, Y: ${position.y} / ${StairType[corners.left]} ${StairType[corners.right]} ${
      Direction[direction]
    }`;

    this._position = position;
    this._thickness = thickness;
    this._length = length;
    this._direction = direction;
    this._corners = corners;

    this._registerEvents();
  }

  private _registerEvents(): void {
    this.container!.onpointerdown = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerDown({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container!.onpointerup = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerUp({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container!.onpointermove = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerMove({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container!.onpointerout = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerOut({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container!.onpointerover = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerOver({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });

    this.container!.eventMode = 'static';
  }

  public render(): void {
    const position = this._containerPosition();
    this.container!.x = position.x;
    this.container!.y = position.y;

    switch (this._direction) {
      case Direction.NORTH:
        const graphics = new Graphics();

        const polygonPoints = [
          new Point(0, 0),
          new Point(32, -16),
          new Point(32 * (this._length + 1), 16 * (this._length - 1)),
          new Point(32 * this._length, 16 * this._length),
          new Point(0, 0),
        ];

        this.container!.hitArea = new Polygon(polygonPoints);

        // rectangle
        /* graphics
          .beginFill('ffd800', 0.3)
          .drawPolygon(...polygonPoints)
          .endFill(); */

        // circles
        /* for (const point of polygonPoints) {
          graphics.beginFill('#ffd800').drawCircle(point.x, point.y, 1).endFill();
        } */

        this.container!.addChild(graphics);

        this._renderStair({ x: 8, y: -12 });
        break;
      case Direction.WEST:
        const graphics2 = new Graphics();

        const test = [
          new Point(0, 24),
          new Point(32 * this._length, -16 * this._length + 24),
          new Point(64 + 32 * (this._length - 1), -16 * (this._length - 1) + 24),
          new Point(32, 40),
          new Point(0, 24),
        ];

        this.container!.y -= 24;
        this.container!.hitArea = new Polygon(test);

        // rectangle
        /* graphics2
          .beginFill(0x00ff00, 0.3)
          .drawPolygon(...test)
          .endFill(); */

        // circles
        /* for (const point of test) {
          graphics2.beginFill('#ffd800').drawCircle(point.x, point.y, 1).endFill();
        } */

        this.container!.addChild(graphics2);

        this._renderStair({ x: 8, y: 12 });
        break;
      case Direction.SOUTH:
        this.container!.x += 24;
        this.container!.y -= 12;
        this.container!.hitArea = new Polygon();
        /*this.container.addChild(new Graphics().beginFill(0x00FF00, 0.3).drawPolygon(
                new Point(0 - 24, 0 + 12),
                new Point(32 * 1 - 24, -16 * 1 + 12),
                new Point(32 * (this._length + 1) + 32 * (1 - 1) - 24, -16 * (1 - 1) + 16 * (this._length - 1) + 12),
                new Point(32 * this._length - 24, 16 * this._length + 12),
                new Point(0 - 24, 0 + 12)
            ).endFill());*/

        this._renderStair({ x: -8, y: -4 });
        break;
      case Direction.EAST:
        this.container!.x += 24;
        this.container!.y -= 12;
        this.container!.hitArea = new Polygon();
        /* this.container!.addChild(
          new Graphics()
            .beginFill(0xff0000, 0.3)
            .drawPolygon(
              new Point(0 - 24, 24 - 12),
              new Point(32 * this._length - 24, -16 * this._length + 24 - 12),
              new Point(64 + 32 * (this._length - 1) - 24, -16 * (this._length - 1) + 24 - 12),
              new Point(32 - 24, 40 - 12),
              new Point(0 - 24, 24 - 12),
            )
            .endFill(),
        ); */

        this._renderStair({ x: -8, y: 4 });
        break;
    }
  }

  private _renderStair(offsets: Vector2D): void {
    for (let i: number = 0; i < 4; i++) {
      const size: Vector3D = {
        x: this._direction === Direction.NORTH || this._direction === Direction.SOUTH ? this._length : 8 / 32,
        y: this._direction === Direction.WEST || this._direction === Direction.EAST ? this._length : 8 / 32,
        z: this._thickness / 32,
      };

      if (
        this._corners.left === StairType.OUTER_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.SOUTH)
      ) {
        size.x -= (8 / 32) * i;
      } else if (
        this._corners.left === StairType.OUTER_CORNER_STAIR &&
        (this._direction === Direction.WEST || this._direction === Direction.EAST)
      ) {
        size.y -= (8 / 32) * (3 - i);
      }

      if (
        this._corners.right == StairType.OUTER_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.SOUTH)
      ) {
        size.x -= (8 / 32) * i;
      } else if (
        this._corners.right === StairType.OUTER_CORNER_STAIR &&
        (this._direction === Direction.WEST || this._direction === Direction.EAST)
      ) {
        size.y -= (8 / 32) * (3 - i);
      }

      if (
        this._corners.left === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.SOUTH)
      ) {
        size.x -= (8 / 32) * (3 - i);
      } else if (
        this._corners.left === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.WEST || this._direction === Direction.EAST)
      ) {
        size.y -= (8 / 32) * i;
      }

      if (
        this._corners.right === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.SOUTH)
      ) {
        size.x -= (8 / 32) * (4 - i) + 0.25;
      } else if (
        this._corners.right === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.WEST || this._direction === Direction.EAST)
      ) {
        size.y -= (8 / 32) * i;
      }

      // NEEDS REFACTORING
      if (this._corners.right === StairType.TWIN_CORNER_STAIR && this._direction === Direction.WEST) {
        /* this._position.x === 13 && this._position.y === 3 && console.log(size.y); */
        // cuurent: [0.25, 0.5, 0.75, 1]
        // expected: [0.25, 0.5, 0.5, 0.25]
        size.y = i === 0 || i === 3 ? 0.25 : 0.5;
        /* this._position.x === 13 && this._position.y === 3 && console.log(size.y); */
      }

      if (this._corners.left === StairType.TWIN_CORNER_STAIR && this._direction === Direction.NORTH) {
        size.x -= (8 / 32) * (3 - i);
      }

      const textureOffset: Vector2D = { x: 0, y: 0 };

      if (this._direction === Direction.NORTH || this._direction === Direction.SOUTH) {
        switch (this._corners.left) {
          case StairType.STAIR:
            textureOffset.x = 0;
            textureOffset.y = 0;
            break;
          case StairType.OUTER_CORNER_STAIR:
            textureOffset.x = -i * 8;
            textureOffset.y = -i * 4;
            break;
          case StairType.INNER_CORNER_STAIR:
            textureOffset.x = (i + 1) * 8;
            textureOffset.y = (i + 1) * 4;
            break;
        }
      } else {
        switch (this._corners.left) {
          case StairType.STAIR:
            textureOffset.x = 8;
            textureOffset.y = 4;
            break;
          case StairType.OUTER_CORNER_STAIR:
            textureOffset.x = (i + 2) * 8;
            textureOffset.y = -i * 4;
            break;
          case StairType.INNER_CORNER_STAIR:
            textureOffset.x = -(i + 3) * 8;
            textureOffset.y = (i + 5) * 4;
            break;
        }
      }

      const zOrders = {
        [CubeFace.TOP]: floorOrder(this._position, size),
        [CubeFace.LEFT]: floorOrder(this._position, size),
        [CubeFace.RIGHT]: floorOrder(this._position, size),
      };

      if (this._direction === Direction.WEST || this._direction === Direction.EAST) {
        zOrders[CubeFace.TOP] -= i - 3;
        zOrders[CubeFace.LEFT] -= i - 3;
        zOrders[CubeFace.RIGHT] -= i - 3;
      } else {
        zOrders[CubeFace.TOP] += i;
        zOrders[CubeFace.LEFT] += i;
        zOrders[CubeFace.RIGHT] += i;
      }

      const cubes: Cube[] = [];

      const cube: Cube = new Cube({
        layer: this.room.renderer.layer,
        texture: this._material.texture,
        color: this._material.color,
        zOrders: zOrders,
        size: size,
        offsets: {
          [CubeFace.TOP]: textureOffset,
          [CubeFace.LEFT]: textureOffset,
          [CubeFace.RIGHT]: textureOffset,
        },
      });

      cube.name = `Cube -> ${i}, size: ${size.x} ${size.y} ${size.z} ${zOrders[CubeFace.RIGHT]}`;

      cube.x = offsets.x * i;
      cube.y = offsets.y * i;

      if (
        this._corners.left === StairType.OUTER_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.SOUTH)
      ) {
        cube.x += 8 * i;
        cube.y += 4 * i;
      } else if (
        this._corners.left === StairType.OUTER_CORNER_STAIR &&
        (this._direction === Direction.WEST || this._direction === Direction.EAST)
      ) {
        cube.x += 8 * (3 - i);
        cube.y -= 4 * (3 - i);
      }

      if (
        this._corners.left === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.SOUTH)
      ) {
        cube.x += 8 * (3 - i);
        cube.y += 4 * (3 - i);
      } else if (
        this._corners.left === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.WEST || this._direction === Direction.EAST)
      ) {
        cube.x += 8 * i;
        cube.y -= 4 * i;
      }

      if (this._corners.left === StairType.TWIN_CORNER_STAIR && this._direction === Direction.NORTH) {
        cube.x += 8 * (3 - i);
        cube.y += 4 * (3 - i);
      }

      cubes.push(cube);

      // NEEDS REFACTORING
      if (
        this._corners.left === StairType.TWIN_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.WEST)
      ) {
        const cube: Cube = new Cube({
          layer: this.room.renderer.layer,
          texture: this._material.texture,
          color: this._material.color,
          zOrders: zOrders,
          size: size,
          offsets: {
            [CubeFace.TOP]: textureOffset,
            [CubeFace.LEFT]: textureOffset,
            [CubeFace.RIGHT]: textureOffset,
          },
        });

        // what you're doing is right

        // this._position.x === 13 && this._position.y === 3 && console.log(8 * (3 - i));
        this._position.x === 13 && this._position.y === 3 && console.log(offsets.x, offsets.y, -offsets.x + offsets.x, offsets.y * (3 - i));

        cube.x = offsets.x + offsets.x * i;
        cube.y = offsets.y * (3 - i);

        cubes.push(cube);
      }

      this.container!.addChild(...cubes);
    }
  }

  public destroy(): void {
    if (this.container != undefined) {
      this.container.destroy();
      this.container = undefined;
    }
  }

  private _containerPosition(): Vector2D {
    const position: Vector2D = {
      x: 32 * this._position.x - 32 * (this._position.y + this._length - 1),
      y: 16 * this._position.x + 16 * (this._position.y + this._length - 1) - 32 * this._position.z,
    };

    if (this._direction === Direction.NORTH || this._direction === Direction.SOUTH) {
      position.x = 32 * this._position.x - 32 * this._position.y;
      position.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    return position;
  }

  public getGlobalTilePosition(point: Point): Vector3D {
    const localPosition: Point = this.container!.toLocal(point);
    let localX: number;
    let localY: number;

    if (this._direction === Direction.NORTH || this._direction === Direction.SOUTH) {
      localX = Math.floor(localPosition.x / 64 + localPosition.y / 32);
      localY = Math.floor(localPosition.y / 32 - localPosition.x / 64) + 1;
    } else {
      localX = Math.floor(localPosition.x / 64 + localPosition.y / 32 + 0.3) - 1;
      localY = Math.floor(localPosition.y / 32 - localPosition.x / 64 + 0.24) + this._length - 1;
    }

    /* console.log({
      x: localX + this._position.x,
      y: localY + this._position.y,
      z: this._position.z,
    }) */

    return {
      x: localX + this._position.x,
      y: localY + this._position.y,
      z: this._position.z,
    };
  }
}
