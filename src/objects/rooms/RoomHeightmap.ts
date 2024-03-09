import { HeightMap } from '../../types/HeightMap';
import { Vector2D } from '../../types/Vector';
import { Stair } from '../../types/Stair';
import { StairType } from '../../enums/StairType';
import { Direction } from '../../enums/Direction';
import { WallType } from '../../enums/WallType';

export class RoomHeightmap {
  public heightMap: HeightMap;
  public door: Vector2D | undefined;

  constructor(heightMap: string) {
    this.heightMap = RoomHeightmap.parse(heightMap);
    this.door = this.calculateDoor();
  }

  public static parse(heightMap: string): HeightMap {
    return heightMap
      .trim()
      .split(/\r?\n/)
      .map((line: string): string[] => line.split(''));
  }

  public isEntrance({ x, y }: Vector2D): typeof this.door {
    const topLeftTile: Vector2D = { x: x - 1, y: y - 1 };
    const topTile: Vector2D = { x, y: y - 1 };

    const midLeftTile: Vector2D = { x: x - 1, y };
    const midTile: Vector2D = { x: x, y: y };

    const botLeftTile: Vector2D = { x: x - 1, y: y + 1 };
    const botTile: Vector2D = { x, y: y + 1 };

    if (
      !this.isTile(topTile) &&
      !this.isTile(topLeftTile) &&
      !this.isTile(midLeftTile) &&
      !this.isTile(botLeftTile) &&
      !this.isTile(botTile) &&
      this.isTile(midTile)
    )
      return { x, y };
  }

  public calculateDoor(): typeof this.door {
    for (let y: number = 0; y < this.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap[y].length; x++) {
        return this.isEntrance({ x, y });
      }
    }
  }

  public isTile({ x, y }: Vector2D): boolean {
    return this.getTile({ x, y }) !== 'x';
  }

  public getTile({ x, y }: Vector2D): string {
    return x < 0 || y < 0 || this.heightMap[y] === undefined || this.heightMap[y][x] === undefined ? 'x' : this.heightMap[y][x];
  }

  public getTileHeight({ x, y }: Vector2D): number {
    const tile: string = this.getTile({ x, y });

    return tile === 'x' ? 0 : isNaN(Number(tile)) ? tile.charCodeAt(0) - 96 + 9 : Number(tile);
  }

  public getTileHeightDiff(position1: Vector2D, position2: Vector2D): number {
    return this.getTileHeight(position1) - this.getTileHeight(position2);
  }

  public getStair({ x, y }: Vector2D, axis?: 'x' | 'y'): Stair | undefined {
    if (!this.isTile({ x, y })) return undefined;

    const topLeftTile: Vector2D = { x: x - 1, y: y - 1 };
    const topTile: Vector2D = { x: x, y: y - 1 };
    const topRightTile: Vector2D = { x: x + 1, y: y - 1 };

    const midLeftTile: Vector2D = { x: x - 1, y: y };
    const midTile: Vector2D = { x: x, y: y };
    const midRightTile: Vector2D = { x: x + 1, y: y };

    const botLeftTile: Vector2D = { x: x - 1, y: y + 1 };
    const botTile: Vector2D = { x: x, y: y + 1 };
    const botRightTile: Vector2D = { x: x + 1, y: y + 1 };

    if (
      this.isTile(topRightTile) &&
      this.getTileHeightDiff(topRightTile, midTile) === 1 &&
      this.getTileHeightDiff(midRightTile, midTile) === 1 &&
      this.getTileHeightDiff(topTile, midTile) === 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.NORTH_EAST,
      };

    if (
      this.isTile(botRightTile) &&
      this.getTileHeightDiff(botRightTile, midTile) === 1 &&
      this.getTileHeightDiff(midRightTile, midTile) === 1 &&
      this.getTileHeightDiff(botTile, midTile) === 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.SOUTH_EAST,
      };

    if (
      this.isTile(botLeftTile) &&
      this.getTileHeightDiff(botLeftTile, midTile) === 1 &&
      this.getTileHeightDiff(midLeftTile, midTile) === 1 &&
      this.getTileHeightDiff(botTile, midTile) === 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.SOUTH_WEST,
      };

    if (
      this.isTile(topLeftTile) &&
      this.getTileHeightDiff(topLeftTile, { x, y }) >= 1 &&
      this.getTileHeightDiff(midLeftTile, { x, y }) >= 1 &&
      this.getTileHeightDiff(topTile, { x, y }) >= 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.NORTH_WEST,
      };

    if (this.isTile(topTile) && this.getTileHeightDiff(topTile, midTile) === 1)
      return { type: StairType.STAIR, direction: Direction.NORTH };

    const IS_NORTH_EAST_STAIR = (): boolean =>
      this.isTile(topRightTile) &&
      this.getTileHeightDiff(topRightTile, midTile) === 1 &&
      this.getTileHeightDiff(midRightTile, midTile) !== 1 &&
      this.getTileHeightDiff(topTile, midTile) !== 1;

    const IS_SOUTH_WEST_STAIR = (): boolean =>
      this.isTile(botLeftTile) &&
      !this.isEntrance(botLeftTile) &&
      this.getTileHeightDiff(botLeftTile, midTile) === 1 &&
      this.getTileHeightDiff(midLeftTile, midTile) !== 1 &&
      this.getTileHeightDiff(botTile, midTile) !== 1;

    if (IS_NORTH_EAST_STAIR()) {
      if (this.getTileHeightDiff(midLeftTile, midTile) === 1)
        return {
          type: StairType.INNER_CORNER_STAIR,
          direction: Direction.NORTH_EAST,
        };

      if (IS_SOUTH_WEST_STAIR())
        return {
          type: StairType.TWIN_CORNER_STAIR,
          direction: axis === 'x' ? Direction.NORTH_EAST : Direction.SOUTH_WEST,
        };

      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.NORTH_EAST,
      };
    }

    if (this.isTile(midRightTile) && this.getTileHeightDiff(midRightTile, midTile) === 1)
      return { type: StairType.STAIR, direction: Direction.EAST };

    if (
      this.isTile(botRightTile) &&
      this.getTileHeightDiff(botRightTile, midTile) === 1 &&
      this.getTileHeightDiff(midRightTile, midTile) !== 1 &&
      this.getTileHeightDiff(botTile, midTile) !== 1
    )
      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.SOUTH_EAST,
      };

    if (this.isTile(botTile) && this.getTileHeightDiff(botTile, midTile) === 1)
      return { type: StairType.STAIR, direction: Direction.SOUTH };

    if (IS_SOUTH_WEST_STAIR())
      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.SOUTH_WEST,
      };

    if (this.isTile(midLeftTile) && this.getTileHeightDiff(midLeftTile, midTile) === 1)
      return { type: StairType.STAIR, direction: Direction.WEST };

    if (
      this.isTile(topLeftTile) &&
      this.getTileHeightDiff(topLeftTile, midTile) === 1 &&
      this.getTileHeightDiff(midLeftTile, midTile) !== 1 &&
      this.getTileHeightDiff(topTile, midTile) !== 1
    )
      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.NORTH_WEST,
      };

    return undefined;
  }

  public getWall({ x, y }: Vector2D): WallType | undefined {
    if (!this.isTile({ x, y }) || this.isDoor({ x, y })) return;

    let rightWall: boolean = true;
    let leftWall: boolean = true;

    for (let i = y - 1; i >= 0; i--) {
      for (let j = x; j >= 0; j--) {
        if (this.isTile({ x, y: i }) && !this.isDoor({ x, y: i })) rightWall = false;
        if (this.isTile({ x: j, y: i }) && !this.isDoor({ x: j, y: i })) rightWall = false;
      }
    }

    for (let i = x - 1; i >= 0; i--) {
      for (let j = y; j >= 0; j--) {
        if (this.isTile({ x: i, y }) && !this.isDoor({ x: i, y })) leftWall = false;
        if (this.isTile({ x: i, y: j }) && !this.isDoor({ x: i, y: j })) leftWall = false;
      }
    }

    if (rightWall && leftWall) return WallType.CORNER_WALL;
    if (leftWall) return WallType.LEFT_WALL;
    if (rightWall) return WallType.RIGHT_WALL;
  }

  public isDoor({ x, y }: Vector2D): boolean {
    return this.door != null && this.door.x === x && this.door.y === y;
  }

  public get maxHeight(): number {
    let z: number = 0;

    for (let y: number = 0; y < this.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap[y].length; x++) {
        const height: number = this.getTileHeight({ x, y });
        if (height > z) z = height;
      }
    }

    return z;
  }

  public get sizeX(): number {
    return this.heightMap.sort((a, b): number => b.length - a.length)[0].length;
  }

  public get sizeY(): number {
    return this.heightMap.length;
  }
}
