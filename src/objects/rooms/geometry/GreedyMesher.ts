import { RoomHeightmap } from '../RoomHeightmap';
import { Vector2D, Vector3D, Stair } from '../../../types';
import { Direction, WallType, StairType } from '../../../enums';
import { StairMesh, TileMesh, WallMesh } from '../../../types';

export class GreedyMesher {
  constructor(public heightMap: RoomHeightmap) {}

  public get tiles(): Array<TileMesh> {
    let sizes: Record<number, Record<number, Vector3D | undefined>> = {};
    const tiles: Array<TileMesh> = [];

    sizes = this.heightMap.heightMap.map(
      (row, y): Array<Vector3D | undefined> =>
        row.map((_, x): Vector3D | undefined => {
          if (!this.heightMap.isTile({ x, y }) || this.heightMap.getStair({ x, y })) return undefined;
          else return { x: 1, y: 1, z: this.heightMap.getTileHeight({ x, y }) };
        }),
    );

    for (let y: number = 1; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        if (
          this.heightMap.isTile({ x, y }) &&
          this.heightMap.getTileHeight({ x, y }) === this.heightMap.getTileHeight({ x, y: y - 1 }) &&
          !(this.heightMap.door?.x === x && this.heightMap.door?.y === y - 1)
        ) {
          if (sizes[y][x] && sizes[y - 1][x]) sizes[y][x]!.y += sizes[y - 1][x]!.y;
          if (this.heightMap.getStair({ x, y }) === undefined) sizes[y - 1][x] = undefined;
        }
      }
    }

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 1; x < this.heightMap.heightMap[y].length; x++) {
        if (
          !this.heightMap.isTile({ x: x - 1, y }) ||
          this.heightMap.getTileHeight({ x: x - 1, y }) !== this.heightMap.getTileHeight({ x: x, y }) ||
          (this.heightMap.door?.x === x - 1 && this.heightMap.door?.y === y)
        )
          continue;
        if (sizes[y][x] && sizes[y][x - 1]) {
          if (sizes[y][x]!.y === sizes[y][x - 1]!.y) {
            sizes[y][x]!.x += sizes[y][x - 1]!.x;
            sizes[y][x - 1] = undefined;
          }
        }
      }
    }

    for (const [y, row] of Object.entries(sizes)) {
      for (const [x, size] of Object.entries(row)) {
        if (size) {
          const door: boolean = this.heightMap.door?.x === Number(x) && this.heightMap.door?.y === Number(y);

          tiles.push({
            position: {
              x: Number(x) - size.x + 1,
              y: Number(y) - size.y + 1,
              z: size.z,
            },
            size: size as Vector2D,
            door: door,
          });
        }
      }
    }

    return tiles;
  }

  public get stairs(): Array<StairMesh> {
    const stairs: Array<StairMesh> = [];

    const rowStairSizes: Record<number, Record<number, Vector3D | undefined>> = {};
    const columnStairSizes: Record<number, Record<number, Vector3D | undefined>> = {};

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      rowStairSizes[y] = {};
      columnStairSizes[y] = {};

      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        const stair: Stair | undefined = this.heightMap.getStair({ x, y });

        if (!stair) continue;

        const z = this.heightMap.getTileHeight({ x, y });
        if (stair.direction === Direction.NORTH || stair.direction === Direction.SOUTH) {
          rowStairSizes[y][x] = { x: 1, y: 1, z: z };
        } else if (stair.direction === Direction.WEST || stair.direction === Direction.EAST) {
          columnStairSizes[y][x] = { x: 1, y: 1, z: z };
        } else {
          rowStairSizes[y][x] = { x: 1, y: 1, z: z };
          columnStairSizes[y][x] = { x: 1, y: 1, z: z };
        }
      }
    }

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 1; x <= this.heightMap.heightMap[y].length; x++) {
        const currentStair: Stair | undefined = this.heightMap.getStair({ x, y }, 'x');
        const stair: Stair | undefined = this.heightMap.getStair({ x: x - 1, y }, 'x');

        if (!stair || !currentStair) continue;
        if ([Direction.NORTH, Direction.SOUTH].includes(stair.direction) || stair.type !== StairType.STAIR) {
          if (this.heightMap.getTileHeight({ x, y }) === this.heightMap.getTileHeight({ x: x - 1, y })) {
            if (
              (stair.type !== currentStair.type || stair.direction === currentStair.direction) &&
              stair.type !== StairType.TWIN_CORNER_STAIR &&
              currentStair.type !== StairType.TWIN_CORNER_STAIR
            ) {
              if (rowStairSizes[y][x] && rowStairSizes[y][x - 1]) {
                if (rowStairSizes[y][x]?.y === rowStairSizes[y][x - 1]?.y) {
                  rowStairSizes[y][x]!.x += rowStairSizes[y][x - 1]!.x;
                  rowStairSizes[y][x - 1] = undefined;
                }
              }
            }
          }
        }
      }
    }

    for (let y: number = 1; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        const currentStair: Stair | undefined = this.heightMap.getStair({ x, y }, 'y');
        const stair: Stair | undefined = this.heightMap.getStair({ x, y: y - 1 }, 'y');

        if (!stair || !currentStair) continue;
        console.log(stair, currentStair);
        if ([Direction.WEST, Direction.EAST].includes(stair.direction) || stair.type !== StairType.STAIR) {
          if (this.heightMap.getTileHeight({ x, y }) === this.heightMap.getTileHeight({ x, y: y - 1 })) {
            if (
              (stair.type !== currentStair.type || stair.direction === currentStair.direction) &&
              stair.type !== StairType.TWIN_CORNER_STAIR &&
              currentStair.type !== StairType.TWIN_CORNER_STAIR
            ) {
              if (columnStairSizes[y][x] && columnStairSizes[y - 1][x]) {
                if (columnStairSizes[y][x]?.x === columnStairSizes[y - 1][x]?.x) {
                  columnStairSizes[y][x]!.y += columnStairSizes[y - 1][x]!.y;
                  columnStairSizes[y - 1][x] = undefined;
                }
              }
            }
          }
        }
      }
    }

    for (const [y, row] of Object.entries(rowStairSizes)) {
      for (const [x, size] of Object.entries(row)) {
        const stair: Stair = this.heightMap.getStair({ x: Number(x), y: Number(y) }, 'x')!;

        if (size) {
          let direction: Direction = stair.direction;

          if (direction === Direction.NORTH_WEST || direction === Direction.NORTH_EAST) direction = Direction.NORTH;
          if (direction === Direction.SOUTH_WEST || direction === Direction.SOUTH_EAST) direction = Direction.SOUTH;

          const leftStair: Stair = this.heightMap.getStair({ x: Number(x) - size.x + 1, y: Number(y) - size.y + 1 }, 'x')!;
          const rightStair: Stair = this.heightMap.getStair({ x: Number(x), y: Number(y) }, 'x')!;

          // Check if it's a tiny stair
          if (size.x === 1 && size.y === 1) {
            if (leftStair.direction === Direction.SOUTH_EAST || leftStair.direction === Direction.NORTH_EAST) {
              rightStair.type = StairType.STAIR;
            } else if (leftStair.direction === Direction.SOUTH_WEST || leftStair.direction === Direction.NORTH_WEST) {
              leftStair.type = StairType.STAIR;
            }
          }

          stairs.push({
            position: {
              x: Number(x) - size.x + 1,
              y: Number(y) - size.y + 1,
              z: size.z,
            },
            length: size.x,
            direction,
            corners: {
              left: leftStair.type,
              right: rightStair.type,
            },
          });
        }
      }
    }

    for (const [y, column] of Object.entries(columnStairSizes)) {
      for (const [x, size] of Object.entries(column)) {
        const stair: Stair = this.heightMap.getStair({ x: Number(x), y: Number(y) }, 'y')!;

        if (size) {
          let direction: Direction = stair.direction;

          if (direction == Direction.NORTH_WEST || direction == Direction.SOUTH_WEST) direction = Direction.WEST;
          if (direction == Direction.SOUTH_EAST || direction == Direction.NORTH_EAST) direction = Direction.EAST;

          const leftStair: Stair = this.heightMap.getStair({ x: Number(x), y: Number(y) }, 'y')!;
          const rightStair: Stair = this.heightMap.getStair({ x: Number(x) - size.x + 1, y: Number(y) - size.y + 1 }, 'y')!;

          // Check if it's a tiny stair
          if (size.x === 1 && size.y === 1) {
            // || leftStair.direction === Direction.NORTH_WEST
            if (leftStair.direction === Direction.NORTH_EAST || leftStair.direction === Direction.NORTH_WEST) {
              rightStair.type = StairType.STAIR;
            } else if (leftStair.direction === Direction.SOUTH_EAST || leftStair.direction === Direction.SOUTH_WEST) {
              leftStair.type = StairType.STAIR;
            }
          }

          stairs.push({
            position: {
              x: Number(x) - size.x + 1,
              y: Number(y) - size.y + 1,
              z: size.z,
            },
            length: size.y,
            direction,
            corners: {
              left: leftStair.type,
              right: rightStair.type,
            },
          });
        }
      }
    }

    return stairs;
  }

  public get walls(): Array<WallMesh> {
    const walls: Array<WallMesh> = [];

    const rowWallSizes: Record<number, Record<number, Vector3D | undefined>> = {};
    const columnWallSizes: Record<number, Record<number, Vector3D | undefined>> = {};

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      rowWallSizes[y] = {};
      columnWallSizes[y] = {};
      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        const wall: WallType | undefined = this.heightMap.getWall({ x, y });

        if (wall === undefined) continue;

        const z = this.heightMap.getTileHeight({ x, y });
        if (wall === WallType.RIGHT_WALL) {
          rowWallSizes[y][x] = { x: 1, y: 1, z: z };
        } else if (wall === WallType.LEFT_WALL) {
          columnWallSizes[y][x] = { x: 1, y: 1, z: z };
        } else if (wall === WallType.CORNER_WALL) {
          rowWallSizes[y][x] = { x: 1, y: 1, z: z };
          columnWallSizes[y][x] = { x: 1, y: 1, z: z };
        }
      }
    }

    for (let y: number = 1; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        const wall: WallType | undefined = this.heightMap.getWall({ x: x - 1, y });

        if (wall === undefined) continue;
        if (wall === WallType.RIGHT_WALL || wall === WallType.CORNER_WALL) {
          if (rowWallSizes[y][x] && rowWallSizes[y][x - 1] && rowWallSizes[y][x]!.y === rowWallSizes[y][x - 1]!.y) {
            rowWallSizes[y][x]!.x += rowWallSizes[y][x - 1]!.x;
            rowWallSizes[y][x - 1] = undefined;
          }
        }
      }
    }

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 1; x < this.heightMap.heightMap[y].length; x++) {
        const wall: WallType | undefined = this.heightMap.getWall({ x, y: y - 1 });

        if (wall === undefined) continue;
        if (wall === WallType.LEFT_WALL || wall === WallType.CORNER_WALL) {
          if (columnWallSizes[y][x] && columnWallSizes[y - 1][x] && columnWallSizes[y][x]!.x === columnWallSizes[y - 1][x]!.x) {
            columnWallSizes[y][x]!.y += columnWallSizes[y - 1][x]!.y;
            columnWallSizes[y - 1][x] = undefined;
          }
        }
      }
    }

    for (const [y, row] of Object.entries(rowWallSizes)) {
      for (const [x, size] of Object.entries(row)) {
        if (size) {
          walls.push({
            position: {
              x: Number(x) - size.x + 1,
              y: Number(y) - size.y + 1,
              z: size.z,
            },
            length: size.x,
            direction: Direction.NORTH,
            corner: false,
          });
        }
      }
    }

    for (const [y, column] of Object.entries(columnWallSizes)) {
      for (const [x, size] of Object.entries(column)) {
        if (size) {
          const corner: boolean =
            this.heightMap.getWall({
              x: Number(x) - size.x + 1,
              y: Number(y) - size.y + 1,
            }) === WallType.CORNER_WALL;

          walls.push({
            position: {
              x: Number(x) - size.x + 1,
              y: Number(y) - size.y + 1,
              z: size.z,
            },
            length: size.y,
            direction: Direction.WEST,
            corner: corner,
          });
        }
      }
    }

    return walls;
  }
}
