import { Container } from 'pixi.js';
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

type RoomLayers = {
  parts: PartLayer;
};

export class RoomVisualization {
  public container: Container = new Container();
  public layers: RoomLayers = {} as RoomLayers;

  constructor(public room: Room) {
    this._initializeMaterials();
    this._initializeLayers();
  }

  private _initializeMaterials(): void {
    this.room.configuration.floorMaterial.render();
    this.room.configuration.wallMaterial.render();
  }

  private _initializeLayers(): void {
    this.layers.parts = new PartLayer(this.room);
  }

  private _registerCursor(): void {
    this.layers.parts.cursor = new CursorPart({});
    this.layers.parts.cursor.room = this.room;
    this.layers.parts.cursor.render();
    this.layers.parts.cursor.hide();
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
    const greedyMesher: GreedyMesher = new GreedyMesher(this.room.heightMap);

    if (!this.room.configuration.floorHidden)
      greedyMesher.tiles.forEach((tile: TileMesh): void =>
        this._registerFloorPart(
          new TilePart({
            material: this.room.configuration.floorMaterial,
            position: tile.position,
            size: tile.size,
            thickness: this.room.configuration.floorThickness,
            door: tile.door,
          }),
        ),
      );

    if (!this.room.configuration.floorHidden)
      greedyMesher.stairs.forEach((stair: StairMesh): void =>
        this._registerFloorPart(
          new StairPart({
            material: this.room.configuration.floorMaterial,
            position: stair.position,
            length: stair.length,
            thickness: this.room.configuration.floorThickness,
            direction: stair.direction,
            corners: stair.corners,
          }),
        ),
      );

    if (!this.room.configuration.wallHidden)
      greedyMesher.walls.forEach((wall: WallMesh): void => {
        this.add(
          new WallPart({
            material: this.room.configuration.wallMaterial,
            position: wall.position,
            length: wall.length,
            floorThickness: this.room.configuration.floorThickness,
            thickness: this.room.configuration.wallThickness,
            height: this.room.configuration.wallHeight,
            direction: wall.direction,
            corner: wall.corner,
            door: wall.door,
          }),
        );
        /*this.add(
          new LandscapePart({
            position: wall.position,
            length: wall.length,
            floorThickness: this.room.configuration.floorThickness,
            height: this.room.configuration.wallHeight,
            direction: wall.direction,
            door: wall.door,
          }),
        );*/
      });

    benchmark('ls');
    greedyMesher.walls.forEach((wall: WallMesh): void => {
      this.add(
        new LandscapePart({
          material: this.room.configuration.landscapeMaterial,
          position: wall.position,
          length: wall.length,
          floorThickness: this.room.configuration.floorThickness,
          height: this.room.configuration.wallHeight,
          direction: wall.direction,
          door: wall.door,
        }),
      );
    });
    perf('Landscape', 'ls');

    perf('Room Visualization', 'room-visualization');

    // Resets room position to the top-left corner by default
    this.container.pivot.x = this.container.getBounds().left;
    this.container.pivot.y = this.container.getBounds().top;

    this.room.camera.centerCamera(0);
  }

  public update(): void {
    this.destroy();
    this.render();
  }

  public destroy(): void {
    this.layers.parts.cursor.container.destroy();
    [...this.layers.parts.childrens].forEach((part: RoomPart) => {
      part.container.destroy();
      this.layers.parts.remove(part);
    });
  }

  public add(item: RoomPart): void {
    this.layers.parts.add(item);

    item.room = this.room;
    item.render();
  }
}
