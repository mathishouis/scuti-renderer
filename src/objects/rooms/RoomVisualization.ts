import { Container, Ticker } from 'pixi.js';
import { Room } from './Room';
import { TilePart } from './parts/floor/TilePart';
import { PartLayer } from './layers/PartLayer';
import { RoomPart } from './parts/RoomPart';
import { StairPart } from './parts/floor/StairPart';
import { GreedyMesher } from './geometry/GreedyMesher';
import { TileEvent, WallEvent } from '../../entities/Events';
import { CursorPart } from './parts/floor/CursorPart';
import { StairMesh, TileMesh, WallMesh, Vector3D } from '../../types';
import { WallPart } from './parts/wall/WallPart';
import { benchmark } from '../../utils/Benchmark';
import { LandscapePart } from './parts/wall/landscapes/LandscapePart';
import { DoorPart } from './parts/wall/DoorPart';
import { MaskLayer } from './layers/MaskLayer';
import { LandscapeWindowMask } from './parts/wall/landscapes/layers/items/LandscapeWindowMask';
import { RoomObject } from './objects/RoomObject';
import { ObjectLayer } from './layers/ObjectLayer';
import { landscapeOrder } from '../../utils';

interface RoomLayers {
  parts: PartLayer;
  masks: MaskLayer;
  objects: ObjectLayer;
}

export interface UpdateConfiguration {
  parts?: boolean;
  objects?: boolean;
  cursor?: boolean;
  mesher?: boolean;
}

export class RoomVisualization {
  public container: Container = new Container();
  public layers = {} as RoomLayers;
  public furnituresTicker!: Ticker;
  public greedyMesher!: GreedyMesher;

  constructor(public room: Room) {
    this._initializeMaterials();
    this._initializeLayers();
    this._initializeTickers();
  }

  private _initializeMaterials(): void {
    this.room.floorMaterial.render();
    this.room.wallMaterial.render();
  }

  private _initializeLayers(): void {
    this.layers.parts = new PartLayer(this.room);
    this.room.renderer.layer.addChild(this.layers.parts.landscapes);
    this.layers.parts.landscapes.zOrder = landscapeOrder();
    this.layers.masks = new MaskLayer(this.room);
    this.layers.objects = new ObjectLayer(this.room);
  }

  private _initializeTickers(): void {
    this.furnituresTicker = new Ticker();
    this.furnituresTicker.maxFPS = 24;
    this.furnituresTicker.start();
  }

  private _registerCursor(): void {
    const cursor = new CursorPart();
    this.layers.parts.cursor = cursor;
    cursor.room = this.room;
    cursor.render();
    this.container.addChild(cursor.container!);
    cursor.hide();
  }

  private _registerDoor(): void {
    if (this.room.parsedHeightMap.door && !this.room.wallHidden) {
      const door = new DoorPart({
        position: {
          x: this.room.parsedHeightMap.door.x,
          y: this.room.parsedHeightMap.door.y,
          z: this.room.parsedHeightMap.getTileHeight(this.room.parsedHeightMap.door),
        },
        floorThickness: this.room.floorThickness,
        thickness: this.room.wallThickness,
      });
      this.layers.parts.door = door;
      this.add(door);
    }
  }

  private _registerFloorPart(part: TilePart | StairPart): void {
    this.add(part);

    part.eventManager.onPointerDown = (event: TileEvent | WallEvent): void => {
      if (this.room.events.tiles.onPointerDown) this.room.events.tiles.onPointerDown(event);
    };
    part.eventManager.onPointerUp = (event: TileEvent | WallEvent): void => {
      if (this.room.events.tiles.onPointerUp) this.room.events.tiles.onPointerUp(event);
    };
    part.eventManager.onPointerMove = (event: TileEvent | WallEvent): void => {
      if (this.room.events.tiles.onPointerMove) this.room.events.tiles.onPointerMove(event);
      if (this.layers.parts.cursor) this.layers.parts.cursor.move(event.position as Vector3D);
    };
    part.eventManager.onPointerOut = (event: TileEvent | WallEvent): void => {
      if (this.room.events.tiles.onPointerOut) this.room.events.tiles.onPointerOut(event);
      if (this.layers.parts.cursor) this.layers.parts.cursor.hide();
    };
    part.eventManager.onPointerOver = (event: TileEvent | WallEvent): void => {
      if (this.room.events.tiles.onPointerOver) this.room.events.tiles.onPointerOver(event);
      if (this.layers.parts.cursor) this.layers.parts.cursor.show();
    };
    part.eventManager.onDoublePointerDown = (event: TileEvent | WallEvent): void => {
      if (this.room.events.tiles.onDoublePointerDown) this.room.events.tiles.onDoublePointerDown(event);
    };
  }

  private _registerWallPart(part: WallPart): void {
    this.add(part);

    part.eventManager.onPointerDown = (event: TileEvent | WallEvent): void => {
      if (this.room.events.walls.onPointerDown) this.room.events.walls.onPointerDown(event);
    };
    part.eventManager.onPointerUp = (event: TileEvent | WallEvent): void => {
      if (this.room.events.walls.onPointerUp) this.room.events.walls.onPointerUp(event);
    };
    part.eventManager.onPointerMove = (event: TileEvent | WallEvent): void => {
      if (this.room.events.walls.onPointerMove) this.room.events.walls.onPointerMove(event);
    };
    part.eventManager.onPointerOut = (event: TileEvent | WallEvent): void => {
      if (this.room.events.walls.onPointerOut) this.room.events.walls.onPointerOut(event);
    };
    part.eventManager.onPointerOver = (event: TileEvent | WallEvent): void => {
      if (this.room.events.walls.onPointerOver) this.room.events.walls.onPointerOver(event);
    };
    part.eventManager.onDoublePointerDown = (event: TileEvent | WallEvent): void => {
      if (this.room.events.walls.onDoublePointerDown) this.room.events.walls.onDoublePointerDown(event);
    };
  }

  public render(): void {
    const { perf } = benchmark('room-visualization');

    this._registerCursor();
    this._registerDoor();

    this.greedyMesher = new GreedyMesher(this.room.parsedHeightMap);

    this.renderFloors();
    this.renderWalls();
    if (this.layers.masks.childrens.length > 0) this.renderLandscapes();

    perf();
  }

  public renderFloors(): void {
    if (!this.room.floorHidden) {
      this.greedyMesher.tiles.forEach((tile: TileMesh): void =>
        this._registerFloorPart(
          new TilePart({
            material: this.room.floorMaterial,
            position: tile.position,
            size: tile.size,
            thickness: this.room.floorThickness,
            door: tile.door,
          }),
        ),
      );

      this.greedyMesher.stairs.forEach((stair: StairMesh): void =>
        this._registerFloorPart(
          new StairPart({
            material: this.room.floorMaterial,
            position: stair.position,
            length: stair.length,
            thickness: this.room.floorThickness,
            direction: stair.direction,
            corners: stair.corners,
          }),
        ),
      );
    }
  }

  public renderWalls(): void {
    if (!this.room.wallHidden)
      this.greedyMesher.walls.forEach((wall: WallMesh): void => {
        this._registerWallPart(
          new WallPart({
            material: this.room.wallMaterial,
            position: wall.position,
            length: wall.length,
            thickness: this.room.wallThickness,
            height: this.room.wallHeight,
            direction: wall.direction,
            corner: wall.corner,
          }),
        );
      });
  }

  public renderLandscapes(): void {
    if (!this.room.wallHidden)
      this.greedyMesher.walls.forEach((wall: WallMesh): void => {
        this.add(
          new LandscapePart({
            material: this.room.landscapeMaterial,
            position: wall.position,
            length: wall.length,
            floorThickness: this.room.floorThickness,
            height: this.room.wallHeight,
            direction: wall.direction,
          }),
        );
      });
  }

  public update({ parts, objects, cursor, mesher }: UpdateConfiguration): void {
    this.destroy({ parts, objects, cursor });

    if (mesher) this.greedyMesher = new GreedyMesher(this.room.parsedHeightMap);

    if (parts) {
      if (this.layers.parts.cursor === undefined) this._registerCursor();
      this._registerDoor();

      this.renderWalls();
      this.renderFloors();
      if (this.layers.masks.childrens.length > 0) this.renderLandscapes();
    }
  }

  public destroy({ parts, objects, cursor }: Omit<UpdateConfiguration, 'mesher'>): void {
    if (cursor) {
      this.layers.parts.cursor?.destroy();
      this.layers.parts.cursor = undefined;
    }

    if (parts) {
      this.layers.parts.door?.destroy();
      this.layers.parts.door = undefined;
      console.log(this.layers.parts);

      [...this.layers.parts.childrens].forEach((item: RoomPart): void => {
        item.destroy();
        this.layers.parts.remove(item);
      });

      console.log(this.layers.parts);
    }

    if (objects) {
      [...this.layers.masks.childrens].forEach((item: LandscapeWindowMask): void => {
        item.destroy();
        this.layers.masks.remove(item);
      });
      [...this.layers.objects.childrens].forEach((item: RoomObject): void => {
        item.destroy();
        this.layers.objects.remove(item);
      });

      this.layers.masks.destroy();
    }
  }

  public add(item: RoomPart | RoomObject): void {
    if (item instanceof RoomPart) {
      this.layers.parts.add(item);
      this.container.addChild(item.container!);
    }

    if (item instanceof RoomObject) {
      this.layers.objects.add(item);
    }

    item.room = this.room;
    item.render();
  }
}
