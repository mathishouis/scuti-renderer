import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';
import { Container, FederatedPointerEvent, Point, Polygon } from 'pixi.js';
import { FloorMaterial } from '../../materials/FloorMaterial';
import { Cube } from '../../geometry/Cube';
import { Vector2D, Vector3D } from '../../../../types/Vector';
import { CubeFace } from '../../../../enums/CubeFace';
import { EventManager } from '../../../events/EventManager';
import { StairType } from '../../../../enums/StairType';
import { Direction } from '../../../../enums/Direction';
import { floorOrder } from '../../../../utils/Sorting';

interface Corners {
  left: StairType;
  right: StairType;
}

interface Configuration {
  material?: FloorMaterial;
  position: Vector3D;
  thickness: number;
  length: number;
  direction: Direction;
  corners: Corners;
}

export class StairPart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  private _material: FloorMaterial;
  private _position: Vector3D;
  private _thickness: number;
  private _length: number;
  private _direction: Direction;
  private _corners: Corners;

  constructor({ material, position, thickness, length, direction, corners }: Configuration) {
    super();

    this._material = material ?? new FloorMaterial(101);
    this._position = position;
    this._thickness = thickness;
    this._length = length;
    this._direction = direction;
    this._corners = corners;

    this._registerEvents();
  }

  private _registerEvents(): void {
    this.container.onpointerdown = (event: FederatedPointerEvent) =>
      this.eventManager.handlePointerDown({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera.hasDragged,
      });
    this.container.onpointerup = (event: FederatedPointerEvent) =>
      this.eventManager.handlePointerUp({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera.hasDragged,
      });
    this.container.onpointermove = (event: FederatedPointerEvent) =>
      this.eventManager.handlePointerMove({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera.hasDragged,
      });
    this.container.onpointerout = (event: FederatedPointerEvent) =>
      this.eventManager.handlePointerOut({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera.hasDragged,
      });
    this.container.onpointerover = (event: FederatedPointerEvent) =>
      this.eventManager.handlePointerOver({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera.hasDragged,
      });
  }

  public render(): void {
    const position = this._containerPosition();
    this.container.x = position.x;
    this.container.y = position.y;

    switch (this._direction) {
      case Direction.NORTH:
        this._renderStair({
          x: 8,
          y: -12,
        });
        break;
      case Direction.WEST:
        this.container.y -= 24;
        this._renderStair({
          x: 8,
          y: 12,
        });
        break;
      case Direction.SOUTH:
        this.container.x += 24;
        this.container.y -= 12;
        this._renderStair({
          x: -8,
          y: -4,
        });
        break;
      case Direction.EAST:
        this.container.x += 24;
        this.container.y -= 12;
        this._renderStair({
          x: -8,
          y: 4,
        });
        break;
    }

    if (this._direction === Direction.NORTH) {
      this.container.hitArea = new Polygon(
        new Point(0, 0),
        new Point(32, -16),
        new Point(32 * (this._length + 1) + 32 * (1 - 1), -16 * (1 - 1) + 16 * (this._length - 1)),
        new Point(32 * this._length, 16 * this._length),
        new Point(0, 0),
      );
    } else if (this._direction === Direction.WEST) {
      this.container.hitArea = new Polygon(
        new Point(0, 24),
        new Point(32 * this._length, -16 * this._length + 24),
        new Point(64 + 32 * (this._length - 1), -16 * (this._length - 1) + 24),
        new Point(32, 40),
        new Point(0, 24),
      );
    } else if (this._direction === Direction.SOUTH) {
      this.container.hitArea = new Polygon();
      /*this.container.addChild(new Graphics().beginFill(0x00FF00, 0.3).drawPolygon(
                new Point(0 - 24, 0 + 12),
                new Point(32 * 1 - 24, -16 * 1 + 12),
                new Point(32 * (this._length + 1) + 32 * (1 - 1) - 24, -16 * (1 - 1) + 16 * (this._length - 1) + 12),
                new Point(32 * this._length - 24, 16 * this._length + 12),
                new Point(0 - 24, 0 + 12)
            ).endFill());*/
    } else if (this._direction === Direction.EAST) {
      this.container.hitArea = new Polygon();
      /*this.container.addChild(new Graphics().beginFill(0xFF0000, 0.3).drawPolygon(
                new Point(0 - 24, 24 - 12),
                new Point(32 * this._length - 24, -16 * this._length + 24 - 12),
                new Point(64 + 32 * (this._length - 1) - 24, -16 * (this._length - 1) + 24 - 12),
                new Point(32 - 24, 40 - 12),
                new Point(0 - 24, 24 - 12)
            ).endFill());*/
    }

    this.container.eventMode = 'static';
  }

  private _renderStair(offsets: Vector2D): void {
    const material: FloorMaterial = this._material ?? new FloorMaterial(101);

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
        size.y += (8 / 32) * (i - 3);
      }

      if (
        this._corners.left === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.NORTH || this._direction === Direction.SOUTH)
      ) {
        size.x += (8 / 32) * (i - 4);
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
        size.x += (8 / 32) * (i - 4) + 0.25;
      } else if (
        this._corners.right === StairType.INNER_CORNER_STAIR &&
        (this._direction === Direction.WEST || this._direction === Direction.EAST)
      ) {
        size.y -= (8 / 32) * i;
        if (this._direction === Direction.WEST) size.y -= 0.25;
      }

      const textureOffset: Vector2D = {
        x: 0,
        y: 0,
      };

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
        [CubeFace.TOP]: floorOrder(this._position),
        [CubeFace.LEFT]: floorOrder(this._position) - 0.5,
        [CubeFace.RIGHT]: floorOrder(this._position) - 0.6,
      };

      /*if (this._direction === Direction.WEST || this._direction === Direction.EAST) {
        zOrders[CubeFace.TOP] += 3 - i;
        zOrders[CubeFace.LEFT] += 3 - i;
        zOrders[CubeFace.RIGHT] += 3 - i;

        if (this._direction === Direction.EAST) zOrders[CubeFace.RIGHT] -= 100;
      } else {
        zOrders[CubeFace.TOP] += i;
        zOrders[CubeFace.LEFT] += i;
        zOrders[CubeFace.RIGHT] += i;

        if (this._direction === Direction.SOUTH) zOrders[CubeFace.LEFT] -= 100;
      }*/

      const cube: Cube = new Cube({
        layer: this.room.renderer.layer,
        zOrders: zOrders,
        texture: material.texture,
        color: material.color,
        size: size,
        offsets: {
          [CubeFace.TOP]: textureOffset,
          [CubeFace.LEFT]: textureOffset,
          [CubeFace.RIGHT]: textureOffset,
        },
      });

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

      if (this._direction === Direction.EAST) cube.zIndex = -i;

      this.container.addChild(cube);
    }
  }

  public destroy() {
    if (this.container !== undefined) {
      this.container.destroy();
      this.container = undefined as any;
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
    const localPosition: Point = this.container.toLocal(point);
    let localX: number;
    let localY: number;
    if (this._direction === Direction.NORTH || this._direction === Direction.SOUTH) {
      localX = Math.floor(localPosition.x / 64 + localPosition.y / 32);
      localY = Math.floor(localPosition.y / 32 - localPosition.x / 64) + 1;
    } else {
      localX = Math.floor(localPosition.x / 64 + localPosition.y / 32 + 0.3) - 1;
      localY = Math.floor(localPosition.y / 32 - localPosition.x / 64 + 0.24) + this._length - 1;
    }
    return {
      x: localX + this._position.x,
      y: localY + this._position.y,
      z: this._position.z,
    };
  }
}
