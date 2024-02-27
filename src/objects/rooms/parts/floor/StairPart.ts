import { Container, FederatedPointerEvent, Graphics, Point, Polygon } from 'pixi.js';
import { StairMesh, Vector2D, Vector3D } from '../../../../types';
import { StairType, Direction, CubeFace } from '../../../../enums';
import { FloorMaterial } from '../../materials';
import { EventManager } from '../../../events';
import { floorOrder } from '../../../../utils';
import { Cube } from '../../geometry';
import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';

interface Configuration extends StairMesh {
  material: FloorMaterial;
  thickness: number;
}

export class StairPart extends RoomPart {
  public room!: Room;
  public container: Container | undefined = new Container();
  public eventManager: EventManager = new EventManager();

  constructor(public configuration: Configuration) {
    super();

    this._registerEvents();
  }

  private _registerEvents(): void {
    if (this.container == undefined) return;

    this.container.onpointerdown = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerDown({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container.onpointerup = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerUp({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container.onpointermove = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerMove({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container.onpointerout = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerOut({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });
    this.container.onpointerover = (event: FederatedPointerEvent): void =>
      this.eventManager.handlePointerOver({
        position: this.getGlobalTilePosition(event.global),
        dragging: this.room.camera!.hasDragged,
      });

    this.container.eventMode = 'static';
  }

  public render(): void {
    if (this.container == undefined) return;

    const position = this._containerPosition();
    this.container.x = position.x;
    this.container.y = position.y;

    if (this.configuration.direction === Direction.NORTH) {
      const graphics = new Graphics();

      const polygonPoints = [
        new Point(0, 0),
        new Point(32, -16),
        new Point(32 * (this.configuration.length + 1), 16 * (this.configuration.length - 1)),
        new Point(32 * this.configuration.length, 16 * this.configuration.length),
        new Point(0, 0),
      ];

      this.container.hitArea = new Polygon(polygonPoints);

      // rectangle
      /* graphics
          .beginFill('ffd800', 0.3)
          .drawPolygon(...polygonPoints)
          .endFill(); */

      // circles
      /* for (const point of polygonPoints) {
          graphics.beginFill('#ffd800').drawCircle(point.x, point.y, 1).endFill();
        } */

      this.container.addChild(graphics);

      this._renderStair({ x: 8, y: -12 });
    } else if (this.configuration.direction === Direction.WEST) {
      const graphics2 = new Graphics();

      const test = [
        new Point(0, 24),
        new Point(32 * this.configuration.length, -16 * this.configuration.length + 24),
        new Point(64 + 32 * (this.configuration.length - 1), -16 * (this.configuration.length - 1) + 24),
        new Point(32, 40),
        new Point(0, 24),
      ];

      this.container.y -= 24;
      this.container.hitArea = new Polygon(test);

      // rectangle
      /* graphics2
          .beginFill(0x00ff00, 0.3)
          .drawPolygon(...test)
          .endFill(); */

      // circles
      /* for (const point of test) {
          graphics2.beginFill('#ffd800').drawCircle(point.x, point.y, 1).endFill();
        } */

      this.container.addChild(graphics2);

      this._renderStair({ x: 8, y: 12 });
    } else if (this.configuration.direction === Direction.SOUTH) {
      this.container.x += 24;
      this.container.y -= 12;
      this.container.hitArea = new Polygon();
      /*this.container.addChild(new Graphics().beginFill(0x00FF00, 0.3).drawPolygon(
                new Point(0 - 24, 0 + 12),
                new Point(32 * 1 - 24, -16 * 1 + 12),
                new Point(32 * (this.configuration.length + 1) + 32 * (1 - 1) - 24, -16 * (1 - 1) + 16 * (this.configuration.length - 1) + 12),
                new Point(32 * this.configuration.length - 24, 16 * this.configuration.length + 12),
                new Point(0 - 24, 0 + 12)
            ).endFill());*/

      this._renderStair({ x: -8, y: -4 });
    } else if (this.configuration.direction === Direction.EAST) {
      this.container.x += 24;
      this.container.y -= 12;
      this.container.hitArea = new Polygon();
      /* this.container.addChild(
          new Graphics()
            .beginFill(0xff0000, 0.3)
            .drawPolygon(
              new Point(0 - 24, 24 - 12),
              new Point(32 * this.configuration.length - 24, -16 * this.configuration.length + 24 - 12),
              new Point(64 + 32 * (this.configuration.length - 1) - 24, -16 * (this.configuration.length - 1) + 24 - 12),
              new Point(32 - 24, 40 - 12),
              new Point(0 - 24, 24 - 12),
            )
            .endFill(),
        ); */

      this._renderStair({ x: -8, y: 4 });
    }
  }

  private _renderStair(offsets: Vector2D): void {
    for (let i: number = 0; i < 4; i++) {
      const size: Vector3D = {
        x:
          this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH
            ? this.configuration.length
            : 8 / 32,
        y:
          this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST
            ? this.configuration.length
            : 8 / 32,
        z: this.configuration.thickness / 32,
      };

      if (this.configuration.corners.left === StairType.OUTER_CORNER_STAIR) {
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
          size.x -= (8 / 32) * i;
        } else if (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST) {
          size.y -= (8 / 32) * (3 - i);
        }
      }

      if (this.configuration.corners.right === StairType.OUTER_CORNER_STAIR) {
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
          size.x -= (8 / 32) * i;
        } else if (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST) {
          size.y -= (8 / 32) * (3 - i);
        }
      }

      if (this.configuration.corners.left === StairType.INNER_CORNER_STAIR) {
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
          size.x -= (8 / 32) * (3 - i);
        } else if (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST) {
          size.y -= (8 / 32) * i;
        }
      }

      if (this.configuration.corners.right === StairType.INNER_CORNER_STAIR) {
        if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
          size.x -= (8 / 32) * (4 - i) + 0.25;
        } else if (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST) {
          size.y -= (8 / 32) * i;
        }
      }

      if (
        (this.configuration.corners.left === StairType.TWIN_CORNER_STAIR ||
          this.configuration.corners.right === StairType.TWIN_CORNER_STAIR) &&
        (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)
      ) {
        size.y -= i === 0 || i === 3 ? 0.75 : 0.5;
      }

      if (
        (this.configuration.corners.right === StairType.TWIN_CORNER_STAIR ||
          this.configuration.corners.left === StairType.TWIN_CORNER_STAIR) &&
        (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)
      ) {
        size.x -= i === 0 || i === 3 ? 0.75 : 0.5;
      }

      const textureOffset: Vector2D = { x: 0, y: 0 };

      if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
        switch (this.configuration.corners.left) {
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
        switch (this.configuration.corners.left) {
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
        [CubeFace.TOP]: floorOrder(this.configuration.position, size),
        [CubeFace.LEFT]: floorOrder(this.configuration.position, size),
        [CubeFace.RIGHT]: floorOrder(this.configuration.position, size),
      };

      if (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST) {
        zOrders[CubeFace.TOP] -= i - 3;
        zOrders[CubeFace.LEFT] -= i - 3;
        zOrders[CubeFace.RIGHT] -= i - 3;
      } else {
        zOrders[CubeFace.TOP] += i;
        zOrders[CubeFace.LEFT] += i;
        zOrders[CubeFace.RIGHT] += i;
      }

      const cube: Cube = new Cube({
        layer: this.room.renderer.layer,
        texture: this.configuration.material.texture,
        color: this.configuration.material.color,
        zOrders: zOrders,
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
        this.configuration.corners.left === StairType.OUTER_CORNER_STAIR &&
        (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)
      ) {
        cube.x += 8 * i;
        cube.y += 4 * i;
      } else if (
        this.configuration.corners.left === StairType.OUTER_CORNER_STAIR &&
        (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)
      ) {
        cube.x += 8 * (3 - i);
        cube.y -= 4 * (3 - i);
      }

      if (
        this.configuration.corners.left === StairType.INNER_CORNER_STAIR &&
        (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)
      ) {
        cube.x += 8 * (3 - i);
        cube.y += 4 * (3 - i);
      } else if (
        this.configuration.corners.left === StairType.INNER_CORNER_STAIR &&
        (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)
      ) {
        cube.x += 8 * i;
        cube.y -= 4 * i;
      }

      if (
        this.configuration.corners.left === StairType.TWIN_CORNER_STAIR &&
        (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH)
      ) {
        cube.x += 8 * 2 + (i === 0 || i === 3 ? 8 : 0);
        cube.y += 4 * 2 + (i === 0 || i === 3 ? 4 : 0);
      }

      if (
        this.configuration.corners.left === StairType.TWIN_CORNER_STAIR &&
        (this.configuration.direction === Direction.WEST || this.configuration.direction === Direction.EAST)
      ) {
        cube.x += 8 * 2 + (i === 0 || i === 3 ? 8 : 0);
        cube.y -= 4 * 2 + (i === 0 || i === 3 ? 4 : 0);
      }

      this.container!.addChild(cube);
    }
  }

  public destroy(): void {
    if (this.container != undefined) {
      this.container.destroy();
      this.container = undefined;
    }
  }

  private _containerPosition(): Vector2D {
    const { x, y, z } = this.configuration.position;
    const position: Vector2D = {
      x: 32 * x - 32 * (y + this.configuration.length - 1),
      y: 16 * x + 16 * (y + this.configuration.length - 1) - 32 * z,
    };

    if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
      position.x = 32 * x - 32 * y;
      position.y = 16 * x + 16 * y - 32 * z;
    }

    return position;
  }

  public getGlobalTilePosition(point: Point): Vector3D {
    const localPosition: Point = this.container!.toLocal(point);
    let localX: number;
    let localY: number;

    if (this.configuration.direction === Direction.NORTH || this.configuration.direction === Direction.SOUTH) {
      localX = Math.floor(localPosition.x / 64 + localPosition.y / 32);
      localY = Math.floor(localPosition.y / 32 - localPosition.x / 64) + 1;
    } else {
      localX = Math.floor(localPosition.x / 64 + localPosition.y / 32 + 0.3) - 1;
      localY = Math.floor(localPosition.y / 32 - localPosition.x / 64 + 0.24) + this.configuration.length - 1;
    }

    return {
      x: localX + this.configuration.position.x,
      y: localY + this.configuration.position.y,
      z: this.configuration.position.z,
    };
  }
}
