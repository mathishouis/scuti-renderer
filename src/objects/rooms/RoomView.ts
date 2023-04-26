import { Container, Ticker } from 'pixi.js';

import type { Room } from './Room';
import type { IPosition3D, ITileInfo } from '../../interfaces/Room';
import { Tile } from './parts/Tile';
import { Wall } from './parts/Wall';
import { Stair } from './parts/Stair';
import { WallType } from '../../enums/WallType';
import type { StairType } from '../../enums/StairType';
import { Cursor } from './parts/Cursor';
import { RoomObjectLayer } from './layers/RoomObjectLayer';
import { RoomTileLayer } from './layers/RoomTileLayer';
import type { IInteractionEvent } from '../../interfaces/Interaction';

/**
 * RoomView class that manage all the rendering part of the room.
 *
 * @class
 * @memberof Scuti
 */
export class RoomView extends Container {
  /**
   * The room instance that will be managed by the camera.
   *
   * @member {Room}
   * @private
   */
  private readonly _room: Room;

  /**
   * The container that will contains all the walls objects.
   *
   * @member {Container}
   * @private
   */
  private readonly _wallLayer = new Container();

  /**
   * The container that will contains all the tiles objects.
   *
   * @member {RoomTileLayer}
   * @private
   */
  private readonly _tileLayer: RoomTileLayer;

  /**
   * The container that will contains all the objects like avatars or furnitures.
   *
   * @member {RoomObjectLayer}
   * @private
   */
  private readonly _objectLayer: RoomObjectLayer;

  /**
   * List containing all the walls instances.
   *
   * @member {Wall}
   * @private
   */
  private _walls: Wall[] = [];

  /**
   * List containing all the tiles and stairs instances.
   *
   * @member {Tile | Stair}
   * @private
   */
  private _tiles: Array<Tile | Stair> = [];

  /**
   * The room tile cursor instance.
   *
   * @member {Cursor}
   * @private
   */
  private _cursor!: Cursor;

  /**
   * The room animation ticker instance that will manage all the objects animations
   *
   * @member {Ticker}
   * @private
   */
  private readonly _animationTicker = new Ticker();

  /**
   * @param {Room} [room] - The room instance that we want to visualize.
   */
  constructor(room: Room) {
    super();

    this._room = room;
    this._tileLayer = new RoomTileLayer();
    this._objectLayer = new RoomObjectLayer(this._room);

    /** Add layers to the visualization */
    this.addChild(this._wallLayer);
    this.addChild(this._tileLayer);
    this.addChild(this._objectLayer);

    /** Start the animation ticker */
    //this._animationTicker.maxFPS = 15.666;
    this._animationTicker.maxFPS = 4;
    this._animationTicker.start();

    /** Render everything */
    this._draw();
  }

  /**
   * Draw the room visualization with all the tiles and walls.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    this._destroyParts();

    for (let y = 0; y < this._room.tileMap.tileMap.length; y++) {
      for (let x = 0; x < this._room.tileMap.tileMap[y].length; x++) {
        const tileInfo: ITileInfo = this._room.tileMap.getTileInfo({ x, y });
        this._createPart(tileInfo, { x, y, z: tileInfo.height });
      }
    }
  }

  /**
   * Destroy all the parts (tiles, walls, stairs, ...).
   *
   * @return {void}
   * @private
   */
  private _destroyParts(): void {
    [...this._tiles, ...this._walls].forEach((part: Tile | Stair | Wall) => {
      return part.destroy();
    });
    this._tiles = [];
    this._walls = [];
  }

  /**
   * Rerender all the room visualization.
   *
   * @return {void}
   * @private
   */
  public update(): void {
    this._draw();
  }

  /**
   * Create a room part and add it into the visualization.
   *
   * @param {ITileInfo} [tileInfo] - The tile informations where we want to create the part.
   * @param {IPosition3D} [position] - And the position.
   * @return {void}
   * @private
   */
  private _createPart(tileInfo: ITileInfo, position: IPosition3D): void {
    if (tileInfo.wallType !== null || tileInfo.door) {
      if (
        tileInfo.wallType === WallType.CORNER_WALL &&
        !this._room.tileMap.hasWall(position).x &&
        !this._room.tileMap.hasWall(position).y
      ) {
        this._createWall(position, WallType.CORNER_WALL);
        this._createWall(position, WallType.LEFT_WALL);
        this._createWall(position, WallType.RIGHT_WALL);
      } else if (tileInfo.wallType === WallType.CORNER_WALL && !this._room.tileMap.hasWall(position).x) {
        this._createWall(position, WallType.LEFT_WALL);
      } else if (tileInfo.wallType === WallType.CORNER_WALL && !this._room.tileMap.hasWall(position).y) {
        this._createWall(position, WallType.RIGHT_WALL);
      }
      if (tileInfo.wallType === WallType.LEFT_WALL && !this._room.tileMap.hasWall(position).x)
        this._createWall(position, WallType.LEFT_WALL);
      if (tileInfo.wallType === WallType.RIGHT_WALL && !this._room.tileMap.hasWall(position).y)
        this._createWall(position, WallType.RIGHT_WALL);
      if (tileInfo.door) this._createWall(position, WallType.DOOR_WALL);
    }
    if (tileInfo.stairType != null) {
      position.direction = tileInfo.stairType.direction;
      this._createStair(position, tileInfo.stairType.type);
    } else if (tileInfo.door) {
      this._createDoor(position);
    } else if (tileInfo.tile) {
      this._createTile(position, tileInfo);
    }
  }

  /**
   * Destroy the current cursor and draw a new one at the new position.
   *
   * @param {IPosition3D} [position] - The cursor position.
   * @return {void}
   * @private
   */
  private _createCursor(position: IPosition3D): void {
    if (this._cursor != null) {
      this._cursor.visible = true;
      return this._cursor.moveTo(position);
    }

    this._destroyCursor();
    const cursor = new Cursor(position);
    this._objectLayer.addChild(cursor);
    this._cursor = cursor;
  }

  /**
   * Destroy the room cursor
   *
   * @return {void}
   * @private
   */
  private _destroyCursor(): void {
    if (this._cursor != null) {
      this._cursor.visible = false;
    }
  }

  /**
   * Create a tile.
   *
   * @param {IPosition3D} [position] - The tile position.
   * @return {void}
   * @private
   */
  private _createTile(position: IPosition3D, tileInfo: ITileInfo): void {
    const tile = new Tile(
      this._room,
      { position, material: this._room.floorMaterial, thickness: this._room.floorThickness },
      tileInfo
    );
    /** Register interactions */
    tile.onPointerDown = (event): void => {
      if (this._tileLayer.onPointerDown != null) this._tileLayer.onPointerDown(event);
    };
    tile.onPointerUp = (event): void => {
      if (this._tileLayer.onPointerUp != null) this._tileLayer.onPointerUp(event);
    };
    tile.onPointerMove = (event): void => {
      if (this._tileLayer.onPointerMove != null) this._tileLayer.onPointerMove(event);
    };
    tile.onPointerOut = (event): void => {
      if (this._tileLayer.onPointerOut != null) this._tileLayer.onPointerOut(event);
      this._destroyCursor();
    };
    tile.onPointerOver = (event): void => {
      if (this._tileLayer.onPointerOver != null) this._tileLayer.onPointerOver(event);
      this._createCursor(position);
    };
    tile.onDoubleClick = (event): void => {
      if (this._tileLayer.onDoubleClick != null) this._tileLayer.onDoubleClick(event);
    };
    this._tileLayer.addChild(tile);
    this._tiles.push(tile);
  }

  /**
   * Create a door.
   *
   * @param {IPosition3D} [position] - The door position.
   * @return {void}
   * @private
   */
  private _createDoor(position: IPosition3D): void {
    const tile = new Tile(this._room, { position, material: this._room.floorMaterial, thickness: 0 });

    /** Register interactions */
    tile.onPointerDown = (event): void => {
      if (this._tileLayer.onPointerDown != null) this._tileLayer.onPointerDown(event);
    };
    tile.onPointerUp = (event): void => {
      if (this._tileLayer.onPointerUp != null) this._tileLayer.onPointerUp(event);
    };
    tile.onPointerMove = (event): void => {
      if (this._tileLayer.onPointerMove != null) this._tileLayer.onPointerMove(event);
    };
    tile.onPointerOut = (event): void => {
      if (this._tileLayer.onPointerOut != null) this._tileLayer.onPointerOut(event);
      this._destroyCursor();
    };
    tile.onPointerOver = (event): void => {
      if (this._tileLayer.onPointerOver != null) this._tileLayer.onPointerOver(event);
      this._createCursor(position);
    };
    tile.onDoubleClick = (event): void => {
      if (this._tileLayer.onDoubleClick != null) this._tileLayer.onDoubleClick(event);
    };
    this._tileLayer.addChild(tile);
    this._tiles.push(tile);
  }

  /**
   * Create a wall.
   *
   * @param {IPosition3D} [position] - The wall position.
   * @param {WallType} [type] - The wall type.
   * @return {void}
   * @private
   */
  private _createWall(position: IPosition3D, type: WallType): void {
    const wall = new Wall(this._room, {
      position,
      material: this._room.wallMaterial,
      thickness: this._room.wallThickness,
      height: this._room.wallHeight,
      type
    });
    this._wallLayer.addChild(wall);
    this._walls.push(wall);
  }

  /**
   * Create stairs.
   *
   * @param {IPosition3D} [position] - The stairs position.
   * @param {StairType} [type] - The stairs type.
   * @return {void}
   * @private
   */
  private _createStair(position: IPosition3D, type: StairType): void {
    const stair = new Stair(this._room, {
      position,
      material: this._room.floorMaterial,
      thickness: this._room.floorThickness,
      type
    });
    /** Register interactions */
    stair.onPointerDown = (event: IInteractionEvent): void => {
      if (this._tileLayer.onPointerDown != null) this._tileLayer.onPointerDown(event);
    };
    stair.onPointerUp = (event: IInteractionEvent): void => {
      if (this._tileLayer.onPointerUp != null) this._tileLayer.onPointerUp(event);
    };
    stair.onPointerMove = (event: IInteractionEvent): void => {
      if (this._tileLayer.onPointerMove != null) this._tileLayer.onPointerMove(event);
    };
    stair.onPointerOut = (event: IInteractionEvent): void => {
      if (this._tileLayer.onPointerOut != null) this._tileLayer.onPointerOut(event);
      this._destroyCursor();
    };
    stair.onPointerOver = (event: IInteractionEvent): void => {
      if (this._tileLayer.onPointerOver != null) this._tileLayer.onPointerOver(event);
      this._createCursor(position);
    };
    stair.onDoubleClick = (event: IInteractionEvent): void => {
      if (this._tileLayer.onDoubleClick != null) this._tileLayer.onDoubleClick(event);
    };
    this._tileLayer.addChild(stair);
    this._tiles.push(stair);
  }

  /**
   * Reference to the room visualization room instance.
   *
   * @member {Room}
   * @readonly
   * @public
   */
  public get room(): Room {
    return this._room;
  }

  /**
   * Reference to the tile layer container.
   *
   * @member {RoomTileLayer}
   * @readonly
   * @public
   */
  public get tileLayer(): RoomTileLayer {
    return this._tileLayer;
  }

  /**
   * Reference to the wall layer container.
   *
   * @member {Container}
   * @readonly
   * @public
   */
  public get wallLayer(): Container {
    return this._wallLayer;
  }

  /**
   * Reference to the object layer container.
   *
   * @member {RoomObjectLayer}
   * @readonly
   * @public
   */
  public get objectLayer(): RoomObjectLayer {
    return this._objectLayer;
  }

  /**
   * Reference to the room animation ticker instance.
   *
   * @member {Ticker}
   * @readonly
   * @public
   */
  public get animationTicker(): Ticker {
    return this._animationTicker;
  }
}
