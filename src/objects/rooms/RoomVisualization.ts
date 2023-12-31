import { Container, Ticker } from 'pixi.js';
import { Room } from './Room';
import { TilePart } from './parts/floor/TilePart';
import { PartLayer } from './layers/PartLayer';
import { RoomPart } from './parts/RoomPart';
import { StairPart } from './parts/floor/StairPart';
import { GreedyMesher } from './geometry/GreedyMesher';
import { TileEvent } from '../../entities/Events';
import { CursorPart } from './parts/floor/CursorPart';
import { StairMesh, TileMesh, WallMesh } from '../../types/Mesh';
import { WallPart } from './parts/wall/WallPart';
import { benchmark } from '../../utils/Benchmark';
import { perf } from '../../utils/Logger';
import { LandscapePart } from './parts/wall/landscapes/LandscapePart';
import { DoorPart } from './parts/wall/DoorPart';
import { MaskLayer } from './layers/MaskLayer';
import { ObjectLayer } from './layers/ObjectLayer';
import { LandscapeWindowMask } from './parts/wall/landscapes/layers/items/LandscapeWindowMask.ts';
import { RoomObject } from './objects/RoomObject.ts';

type RoomLayers = {
  parts: PartLayer;
  masks: MaskLayer;
  objects: ObjectLayer;
};

export class RoomVisualization {
  public container: Container = new Container();
  public layers: RoomLayers = {} as RoomLayers;
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
    this.layers.masks = new MaskLayer(this.room);
    this.layers.objects = new ObjectLayer(this.room);
  }

  private _initializeTickers(): void {
    this.furnituresTicker = new Ticker();
    this.furnituresTicker.maxFPS = 24;
    this.furnituresTicker.start();
  }

  private _registerCursor(): void {
    this.layers.parts.cursor = new CursorPart({});
    this.layers.parts.cursor.room = this.room;
    this.layers.parts.cursor.render();
    this.layers.parts.cursor.hide();
  }

  private _registerDoor(): void {
    if (this.room.parsedHeightMap.door) {
      this.layers.parts.door = new DoorPart({
        position: {
          x: this.room.parsedHeightMap.door.x,
          y: this.room.parsedHeightMap.door.y,
          z: this.room.parsedHeightMap.getTileHeight(this.room.parsedHeightMap.door),
        },
        floorThickness: this.room.floorThickness,
        thickness: this.room.wallThickness,
      });
      this.layers.parts.door.room = this.room;
      this.layers.parts.door.render();
    }
  }

  private _registerFloorPart(part: TilePart | StairPart): void {
    this.add(part);

    part.eventManager.onPointerDown = (event: TileEvent): void => {
      if (this.room.events.tiles.onPointerDown) this.room.events.tiles.onPointerDown(event);
    };
    part.eventManager.onPointerUp = (event: TileEvent): void => {
      if (this.room.events.tiles.onPointerUp) this.room.events.tiles.onPointerUp(event);
    };
    part.eventManager.onPointerMove = (event: TileEvent): void => {
      if (this.room.events.tiles.onPointerMove) this.room.events.tiles.onPointerMove(event);
      if (this.layers.parts.cursor) this.layers.parts.cursor.move(event.position);
    };
    part.eventManager.onPointerOut = (event: TileEvent): void => {
      if (this.room.events.tiles.onPointerOut) this.room.events.tiles.onPointerOut(event);
      if (this.layers.parts.cursor) this.layers.parts.cursor.hide();
    };
    part.eventManager.onPointerOver = (event: TileEvent): void => {
      if (this.room.events.tiles.onPointerOver) this.room.events.tiles.onPointerOver(event);
      if (this.layers.parts.cursor) this.layers.parts.cursor.show();
    };
    part.eventManager.onDoublePointerDown = (event: TileEvent): void => {
      if (this.room.events.tiles.onDoublePointerDown) this.room.events.tiles.onDoublePointerDown(event);
    };
  }

  public render(): void {
    benchmark('room-visualization');

    this._registerCursor();
    this._registerDoor();

    this.greedyMesher = new GreedyMesher(this.room.parsedHeightMap);

    this.renderFloors();
    this.renderWalls();
    if (this.layers.masks.childrens.length > 0) this.renderLandscapes();

    perf('Room Visualization', 'room-visualization');

    // Resets room position to the top-left corner by default
    this.container.pivot.x = this.container.getBounds().left;
    this.container.pivot.y = this.container.getBounds().top;

    this.room.camera.centerCamera(0);
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
        this.add(
          new WallPart({
            material: this.room.wallMaterial,
            position: wall.position,
            length: wall.length,
            floorThickness: this.room.floorThickness,
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

  public update(parts = true, objects = true, cursor = true): void {
    this.destroy(parts, objects, cursor);

    if (parts) {
      if (this.layers.parts.cursor === undefined) this._registerCursor();
      this._registerDoor();

      this.renderWalls();
      this.renderFloors();
      if (this.layers.masks.childrens.length > 0) this.renderLandscapes();
    }
  }

  public destroy(parts = true, objects = true, cursor = true): void {
    if (cursor) {
      this.layers.parts.cursor.destroy();
      this.layers.parts.cursor = undefined as any;
    }

    if (parts) {
      this.layers.parts.door.destroy();
      [...this.layers.parts.childrens].forEach((item: RoomPart) => {
        item.destroy();
        this.layers.parts.remove(item);
      });
    }

    if (objects) {
      [...this.layers.masks.childrens].forEach((item: LandscapeWindowMask) => {
        item.destroy();
        this.layers.masks.remove(item);
      });
      [...this.layers.objects.childrens].forEach((item: RoomObject) => {
        item.destroy();
        this.layers.objects.remove(item);
      });
      this.layers.masks.destroy();
    }
  }

  public add(item: RoomPart | RoomObject): void {
    if (item instanceof RoomPart) this.layers.parts.add(item);
    if (item instanceof RoomObject) this.layers.objects.add(item);

    item.room = this.room;
    item.render();
  }
}
