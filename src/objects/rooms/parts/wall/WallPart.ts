import { RoomPart } from '../RoomPart';
import { Room } from '../../Room';
import { Container } from 'pixi.js';
import { Cube } from '../../geometry/Cube';
import { EventManager } from '../../../events/EventManager';
import { Vector2D, Vector3D } from '../../../../types/Vector';
import { CubeFace } from '../../../../enums/CubeFace';
import { WallMaterial } from '../../materials/WallMaterial';
import { Direction } from '../../../../enums/Direction';
import { DoorMaskFilter } from '../../../filters/DoorMaskFilter';

interface Configuration {
  material?: WallMaterial;
  position: Vector3D;
  length: number;
  thickness?: number;
  floorThickness?: number;
  height?: number;
  direction: Direction;
  corner: boolean;
  dorr?: number;
}

export class WallPart extends RoomPart {
  public room!: Room;
  public container: Container = new Container();
  public eventManager: EventManager = new EventManager();

  private _material: WallMaterial;
  private _position: Vector3D;
  private _length: number;
  private _thickness: number;
  private _floorThickness: number;
  private _height: number;
  private _direction: Direction;
  private _corner: boolean;

  constructor({ material, position, length, thickness, floorThickness, height, direction, corner }: Configuration) {
    super();

    this._material = material ?? new WallMaterial(101);
    this._position = position;
    this._length = length;
    this._thickness = thickness ?? 8;
    this._floorThickness = floorThickness ?? 8;
    this._height = height ?? -1;
    this._direction = direction;
    this._corner = corner;
  }

  public render(): void {
    const zOrder: number = (this.position.z - 1) * 4;
    const size = this.calculateCubeSize();

    const cube: Cube = new Cube({
      layer: this.room.renderer.layer,
      zOrders: {
        [CubeFace.TOP]: zOrder,
        [CubeFace.LEFT]: zOrder - 0.5,
        [CubeFace.RIGHT]: zOrder - 0.6,
      },
      texture: this.material.texture,
      color: this.material.color,
      size: size,
    });

    if (this.isDoor()) {
      const filter: DoorMaskFilter = new DoorMaskFilter(this.room.visualization.layers.parts.door.sprite);
      cube.faces[CubeFace.RIGHT].filters = [filter];
    }

    this.container.x = this.calculateContainerPosition(size).x;
    this.container.y = this.calculateContainerPosition(size).y;

    this.container.addChild(cube);
    this.room.visualization.container.addChild(this.container);
  }

  public destroy() {
    if (this.container !== undefined) {
      this.container.destroy();
      this.container = undefined as any;
    }
  }

  public isDoor(): boolean {
    return (
      (this.room.parsedHeightMap.door &&
        this.room.visualization.layers.parts.door &&
        this.position.x - 1 === this.room.parsedHeightMap.door.x &&
        this.position.y <= this.room.parsedHeightMap.door.y &&
        this.room.parsedHeightMap.door.y <= this.position.y + this.length - 1 &&
        this.direction === Direction.WEST) ??
      false
    );
  }

  public calculateCubeSize(): Vector3D {
    return {
      x: this.direction === Direction.WEST ? this.thickness / 32 : this.length,
      y: this.direction === Direction.WEST ? this.length + (this._corner ? this.thickness / 32 : 0) : this.thickness / 32,
      z:
        this.floorThickness / 32 -
        this.position.z +
        115 / 32 +
        (this.height === -1 ? this.room.parsedHeightMap.maxHeight : (64 / 32) * this.height),
    };
  }

  public calculateContainerPosition(size: Vector3D): Vector2D {
    return {
      x:
        this.direction === Direction.WEST
          ? 32 * (this.position.x - (this.position.y + this.length - 1)) - this.thickness
          : 32 * this.position.x - 32 * (this.position.y - 1),
      y:
        this.direction === Direction.WEST
          ? 16 * (this.position.x + this.position.y + this.length - 1 - 2 * (this.position.z + size.z)) -
            this.thickness / 2 +
            this.floorThickness
          : 16 * this.position.x + 16 * (this.position.y - 1) - 32 * this.position.z - size.z * 32 + this.floorThickness,
    };
  }

  public get material(): WallMaterial {
    return this._material;
  }

  public set material(material: WallMaterial) {
    this._material = material;
    this.render();
  }

  public get position(): Vector3D {
    return this._position;
  }

  public set position(position: Vector3D) {
    this._position = position;
    this.render();
  }

  public get length(): number {
    return this._length;
  }

  public set length(length: number) {
    this._length = length;
    this.render();
  }

  public get thickness(): number {
    return this._thickness;
  }

  public set thickness(thickness: number) {
    this._thickness = thickness;
    this.render();
  }

  public get floorThickness(): number {
    return this._floorThickness;
  }

  public set floorThickness(thickness: number) {
    this._floorThickness = thickness;
    this.render();
  }

  public get height(): number {
    return this._height;
  }

  public set height(height: number) {
    this._height = height;
    this.render();
  }

  public get direction(): Direction {
    return this._direction;
  }

  public set direction(direction: Direction) {
    this._direction = direction;
    this.render();
  }
}
