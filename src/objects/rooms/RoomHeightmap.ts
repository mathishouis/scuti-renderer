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
      .map((line: string) => {
        return line.split('');
      });
  }

  public calculateDoor(): Vector2D | undefined {
    for (let y: number = 0; y < this.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap[y].length; x++) {
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

  public getTileDifference(position1: Vector2D, position2: Vector2D): number {
    return Number(this.getTileHeight(position1)) - Number(this.getTileHeight(position2));
  }

  public getStair({ x, y }: Vector2D): Stair | undefined {
    const topLeftTile: Vector2D = { x: x - 1, y: y - 1 };
    const topTile: Vector2D = { x: x, y: y - 1 };
    const topRightTile: Vector2D = { x: x + 1, y: y - 1 };

    const midLeftTile: Vector2D = { x: x - 1, y: y };
    const midRightTile: Vector2D = { x: x + 1, y: y };

    const botLeftTile: Vector2D = { x: x - 1, y: y + 1 };
    const botTile: Vector2D = { x: x, y: y + 1 };
    const botRightTile: Vector2D = { x: x + 1, y: y + 1 };

    if (
      this.isTile({ x, y }) &&
      this.isTile(topRightTile) &&
      this.getTileDifference(topRightTile, { x, y }) === 1 &&
      this.getTileDifference(midRightTile, { x, y }) === 1 &&
      this.getTileDifference(topTile, { x, y }) === 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.NORTH_EAST,
      };

    if (
      this.isTile({ x, y }) &&
      this.isTile(botRightTile) &&
      this.getTileDifference(botRightTile, { x, y }) === 1 &&
      this.getTileDifference(midRightTile, { x, y }) === 1 &&
      this.getTileDifference(botTile, { x, y }) === 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.SOUTH_EAST,
      };

    if (
      this.isTile({ x, y }) &&
      this.isTile(botLeftTile) &&
      this.getTileDifference(botLeftTile, { x, y }) === 1 &&
      this.getTileDifference(midLeftTile, { x, y }) === 1 &&
      this.getTileDifference(botTile, { x, y }) === 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.SOUTH_WEST,
      };

    if (
      this.isTile({ x, y }) &&
      this.isTile(topLeftTile) &&
      this.getTileDifference(topLeftTile, { x, y }) === 1 &&
      this.getTileDifference(midLeftTile, { x, y }) === 1 &&
      this.getTileDifference(topTile, { x, y }) === 1
    )
      return {
        type: StairType.INNER_CORNER_STAIR,
        direction: Direction.NORTH_WEST,
      };

    if (this.isTile({ x, y }) && this.isTile(topTile) && this.getTileDifference(topTile, { x, y }) === 1)
      return { type: StairType.STAIR, direction: Direction.NORTH };

    if (
      this.isTile({ x, y }) &&
      this.isTile(topRightTile) &&
      this.getTileDifference(topRightTile, { x, y }) === 1 &&
      this.getTileDifference(midRightTile, { x, y }) !== 1 &&
      this.getTileDifference(topTile, { x, y }) !== 1
    ) {
      if (this.getTileDifference(midLeftTile, { x, y }) === 1)
        return {
          type: StairType.INNER_CORNER_STAIR,
          direction: Direction.NORTH_EAST,
        };

      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.NORTH_EAST,
      };
    }

    if (this.isTile({ x, y }) && this.isTile(midRightTile) && this.getTileDifference(midRightTile, { x, y }) === 1)
      return { type: StairType.STAIR, direction: Direction.EAST };

    if (
      this.isTile({ x, y }) &&
      this.isTile(botRightTile) &&
      this.getTileDifference(botRightTile, { x, y }) === 1 &&
      this.getTileDifference(midRightTile, { x, y }) !== 1 &&
      this.getTileDifference(botTile, { x, y }) !== 1
    )
      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.SOUTH_EAST,
      };

    if (this.isTile({ x, y }) && this.isTile(botTile) && this.getTileDifference(botTile, { x, y }) === 1)
      return { type: StairType.STAIR, direction: Direction.SOUTH };

    if (
      this.isTile({ x, y }) &&
      this.isTile(botLeftTile) &&
      this.getTileDifference(botLeftTile, { x, y }) === 1 &&
      this.getTileDifference(midLeftTile, { x, y }) !== 1 &&
      this.getTileDifference(botTile, { x, y }) !== 1
    )
      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.SOUTH_WEST,
      };

    if (this.isTile({ x, y }) && this.isTile(midLeftTile) && this.getTileDifference(midLeftTile, { x, y }) === 1)
      return { type: StairType.STAIR, direction: Direction.WEST };

    if (
      this.isTile({ x, y }) &&
      this.isTile(topLeftTile) &&
      this.getTileDifference(topLeftTile, { x, y }) === 1 &&
      this.getTileDifference(midLeftTile, { x, y }) !== 1 &&
      this.getTileDifference(topTile, { x, y }) !== 1
    )
      return {
        type: StairType.OUTER_CORNER_STAIR,
        direction: Direction.NORTH_WEST,
      };

    return;
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
    return this.heightMap.sort((a, b) => b.length - a.length)[0].length;
  }

  public get sizeY(): number {
    return this.heightMap.length;
  }
}
