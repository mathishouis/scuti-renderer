import type { IPosition2D, ITileInfo, TileMap } from '../../types/Room';
import { WallType } from '../../enums/WallType';
import { StairType } from '../../enums/StairType';
import { Direction } from '../../enums/Direction';

/**
 * RoomTileMap class that manage all the things about the room model.
 *
 * @class
 * @memberof Scuti
 */
export class RoomTileMap {
  /**
   * The room tile map where every informations about the room model is stored.
   *
   * @member {TileMap}
   * @private
   */
  private readonly _tileMap: TileMap;

  /**
   * @param {string} [tileMap] - The room tile map string that need to be parsed.
   */
  constructor(tileMap: string) {
    /** Parse the tile map string to convert it into a matrix */
    this._tileMap = this._parse(tileMap);
  }

  /**
   * Parse the given tile map to convert it into a matrix.
   *
   * @param {string} [tileMap] - The tile map string that we want to convert into a matrix.
   * @return {TileMap}
   * @private
   */
  private _parse(tileMap: string): TileMap {
    tileMap = tileMap.replace(/ /g, '');
    tileMap = tileMap.replace(/\n\n/g, '\n');
    return tileMap.split(/\r?\n/).map((line) => {
      return line.split('');
    });
  }

  /**
   * Reference to the room tile map matrix.
   *
   * @member {TileMap}
   * @readonly
   * @public
   */
  public get tileMap(): TileMap {
    return this._tileMap;
  }

  /**
   * Convert the 2D position into it's tile type character.
   *
   * @param {IPosition2D} [position] - The tile position that we want to have the type.
   * @return {string}
   * @public
   */
  public getTile(position: IPosition2D): string {
    return position.x < 0 ||
      position.y < 0 ||
      this._tileMap[position.y] === undefined ||
      this._tileMap[position.y][position.x] === undefined
      ? 'x'
      : this._tileMap[position.y][position.x];
  }

  /**
   * Convert the tile character into a number that is the height of the tile.
   *
   * @param {IPosition2D} [position] - The tile position that we want to have the height.
   * @return {string}
   * @public
   */
  public getTileHeight(position: IPosition2D): number {
    const tile = this.getTile(position);
    return tile === 'x' ? 0 : isNaN(Number(tile)) ? tile.charCodeAt(0) - 96 + 9 : Number(tile);
  }

  /**
   * Return informations about the tile (if it's a stair, a door, if there is walls, ...).
   *
   * @param {IPosition2D} [position] - The tile position that we want to have informations.
   * @return {ITileInfo}
   * @public
   */
  public getTileInfo(position: IPosition2D): ITileInfo {
    return {
      tile: this.isTile(position),
      door: this.isDoor(position),
      height: this.getTileHeight(position),
      stairType: this._getStairType(position),
      wallType: this._getWallType(position)
    };
  }

  /**
   * Return walls informations about the given tile, like if it's a left wall, a corner wall, ...
   *
   * @param {IPosition2D} [position] - The tile position where we want to have the wall informations.
   * @return {WallType}
   * @private
   */
  private _getWallType(position: IPosition2D): WallType | undefined {
    const topLeftTile: IPosition2D = { x: position.x - 1, y: position.y - 1 };
    const topTile: IPosition2D = { x: position.x, y: position.y - 1 };
    const midLeftTile: IPosition2D = { x: position.x - 1, y: position.y };

    if (this.isDoor(position)) return;

    if (!this.isTile(topLeftTile) && !this.isTile(topTile) && !this.isTile(midLeftTile) && this.isTile(position))
      return WallType.CORNER_WALL;
    if (!this.isTile(midLeftTile) && this.isTile(position)) return WallType.LEFT_WALL;
    if (!this.isTile(topTile) && this.isTile(position)) return WallType.RIGHT_WALL;
  }

  /**
   * Return stairs informations about the given tile, like if it's a normal stair, a corner stair, ...
   *
   * @param {IPosition2D} [position] - The tile position where we want to have the stair informations.
   * @return {{ type: StairType, direction: Direction }}
   * @private
   */
  private _getStairType(position: IPosition2D): { type: StairType; direction: Direction } | undefined {
    const topLeftTile: IPosition2D = { x: position.x - 1, y: position.y - 1 };
    const topTile: IPosition2D = { x: position.x, y: position.y - 1 };
    const topRightTile: IPosition2D = { x: position.x + 1, y: position.y - 1 };

    const midLeftTile: IPosition2D = { x: position.x - 1, y: position.y };
    const midRightTile: IPosition2D = { x: position.x + 1, y: position.y };

    const botLeftTile: IPosition2D = { x: position.x - 1, y: position.y + 1 };
    const botTile: IPosition2D = { x: position.x, y: position.y + 1 };
    const botRightTile: IPosition2D = { x: position.x + 1, y: position.y + 1 };

    if (
      this.isTile(position) &&
      this.isTile(topRightTile) &&
      this._getTileDifference(topRightTile, position) === 1 &&
      this._getTileDifference(midRightTile, position) === 1 &&
      this._getTileDifference(topTile, position) === 1
    )
      return { type: StairType.INNER_CORNER_STAIR, direction: Direction.NORTH_EAST };
    if (
      this.isTile(position) &&
      this.isTile(botRightTile) &&
      this._getTileDifference(botRightTile, position) === 1 &&
      this._getTileDifference(midRightTile, position) === 1 &&
      this._getTileDifference(botTile, position) === 1
    )
      return { type: StairType.INNER_CORNER_STAIR, direction: Direction.SOUTH_EAST };
    if (
      this.isTile(position) &&
      this.isTile(botLeftTile) &&
      this._getTileDifference(botLeftTile, position) === 1 &&
      this._getTileDifference(midLeftTile, position) === 1 &&
      this._getTileDifference(botTile, position) === 1
    )
      return { type: StairType.INNER_CORNER_STAIR, direction: Direction.SOUTH_WEST };
    if (
      this.isTile(position) &&
      this.isTile(topLeftTile) &&
      this._getTileDifference(topLeftTile, position) === 1 &&
      this._getTileDifference(midLeftTile, position) === 1 &&
      this._getTileDifference(topTile, position) === 1
    )
      return { type: StairType.INNER_CORNER_STAIR, direction: Direction.NORTH_WEST };
    if (this.isTile(position) && this.isTile(topTile) && this._getTileDifference(topTile, position) === 1)
      return { type: StairType.STAIR, direction: Direction.NORTH };
    if (
      this.isTile(position) &&
      this.isTile(topRightTile) &&
      this._getTileDifference(topRightTile, position) === 1 &&
      this._getTileDifference(midRightTile, position) === 0 &&
      this._getTileDifference(topTile, position) === 0
    )
      return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.NORTH_EAST };
    if (this.isTile(position) && this.isTile(midRightTile) && this._getTileDifference(midRightTile, position) === 1)
      return { type: StairType.STAIR, direction: Direction.EAST };
    if (
      this.isTile(position) &&
      this.isTile(botRightTile) &&
      this._getTileDifference(botRightTile, position) === 1 &&
      this._getTileDifference(midRightTile, position) === 0 &&
      this._getTileDifference(botTile, position) === 0
    )
      return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.SOUTH_EAST };
    if (this.isTile(position) && this.isTile(botTile) && this._getTileDifference(botTile, position) === 1)
      return { type: StairType.STAIR, direction: Direction.SOUTH };
    if (
      this.isTile(position) &&
      this.isTile(botLeftTile) &&
      this._getTileDifference(botLeftTile, position) === 1 &&
      this._getTileDifference(midLeftTile, position) === 0 &&
      this._getTileDifference(botTile, position) === 0
    )
      return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.SOUTH_WEST };
    if (this.isTile(position) && this.isTile(midLeftTile) && this._getTileDifference(midLeftTile, position) === 1)
      return { type: StairType.STAIR, direction: Direction.WEST };
    if (
      this.isTile(position) &&
      this.isTile(topLeftTile) &&
      this._getTileDifference(topLeftTile, position) === 1 &&
      this._getTileDifference(midLeftTile, position) === 0 &&
      this._getTileDifference(topTile, position) === 0
    )
      return { type: StairType.OUTER_CORNER_STAIR, direction: Direction.NORTH_WEST };
  }

  /**
   * Calculate the height differencte between two tile position.
   *
   * @param {IPosition2D} [position1] - The tile position that we want to compare the height.
   * @param {IPosition2D} [position2] - The tile position that we want to compare the height.
   * @return {number}
   * @private
   */
  private _getTileDifference(position1: IPosition2D, position2: IPosition2D): number {
    return Number(this.getTileHeight(position1)) - Number(this.getTileHeight(position2));
  }

  /**
   * Return a boolean that indicate if the tile position given refer to an existing tile.
   *
   * @param {IPosition2D} [position] - The tile position that we want to see if it exist.
   * @return {boolean}
   * @public
   */
  public isTile(position: IPosition2D): boolean {
    return this.getTile(position) !== 'x';
  }

  /**
   * Return a boolean that indicate if the given tile is a door.
   *
   * @param {IPosition2D} [position] - The tile position that we want to see if it's a door.
   * @return {boolean}
   * @public
   */
  public isDoor(position: IPosition2D): boolean {
    const topLeftTile: IPosition2D = { x: position.x - 1, y: position.y - 1 };
    const topTile: IPosition2D = { x: position.x, y: position.y - 1 };

    const midLeftTile: IPosition2D = { x: position.x - 1, y: position.y };
    const midTile: IPosition2D = { x: position.x, y: position.y };

    const botLeftTile: IPosition2D = { x: position.x - 1, y: position.y + 1 };
    const botTile: IPosition2D = { x: position.x, y: position.y + 1 };

    return (
      !this.isTile(topTile) &&
      !this.isTile(topLeftTile) &&
      !this.isTile(midLeftTile) &&
      !this.isTile(botLeftTile) &&
      !this.isTile(botTile) &&
      this.isTile(midTile)
    );
  }

  /**
   * Return the max Z value of this tile map.
   *
   * @return {number}
   * @public
   */
  public get maxZ(): number {
    let z = 0;
    for (let y = 0; y < this._tileMap.length; y++) {
      for (let x = 0; x < this._tileMap[y].length; x++) {
        const height = this.getTileHeight({ x, y });
        if (height > z) z = height;
      }
    }
    return z;
  }

  /**
   * Indicate if the given tile position have a left or a right wall.
   *
   * @param {IPosition2D} [position] - The given tile position that we wan't to check if it have walls.
   * @return {{ x: boolean, y: boolean }}
   * @public
   */
  public hasWall(position: IPosition2D): { x: boolean; y: boolean } {
    // TODO: Integrate it in _getWallType()
    let wallX = false;
    let wallY = false;
    for (let i = position.y - 1; i >= 0; i--) {
      const wall: WallType | undefined = this._getWallType({ x: position.x, y: i });
      if (wall) {
        if (wall === WallType.RIGHT_WALL || wall === (WallType.CORNER_WALL as WallType)) {
          wallY = true;
        }
      }
      for (let j = position.x - 1; j >= 0; j--) {
        const wall2: WallType | undefined = this._getWallType({ x: j, y: i });
        if (wall2) {
          if (wall2 === WallType.LEFT_WALL || wall2 === (WallType.CORNER_WALL as WallType)) {
            wallY = true;
          }
        }
      }
    }
    for (let i = position.x - 1; i >= 0; i--) {
      const wall: WallType | undefined = this._getWallType({ x: i, y: position.y });
      if (wall) {
        if (wall === WallType.LEFT_WALL || wall === (WallType.CORNER_WALL as WallType)) {
          wallX = true;
        }
      }
      for (let j = position.y - 1; j >= 0; j--) {
        const wall2: WallType | undefined = this._getWallType({ x: i, y: j });
        if (wall2) {
          if (wall2 === WallType.RIGHT_WALL || wall2 === (WallType.CORNER_WALL as WallType)) {
            wallX = true;
          }
        }
      }
    }
    return { x: wallX, y: wallY };
  }
}
