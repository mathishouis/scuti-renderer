import { RoomHeightmap } from '../RoomHeightmap';
import { Vector2D, Vector3D } from '../../../types/Vector';
import { Stair } from '../../../types/Stair';
import { StairType } from '../../../enums/StairType';
import { Direction } from '../../../enums/Direction';
import { StairMesh, TileMesh, WallMesh } from '../../../types/Mesh';
import { WallType } from '../../../enums/WallType';

export class GreedyMesher {
  constructor(public heightMap: RoomHeightmap) {}

  public get tiles(): Array<TileMesh> {
    const sizes: Record<number, Record<number, Vector3D | undefined>> = {};
    let tiles: Array<TileMesh> = [];

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      sizes[y] = {};
      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        if (!this.heightMap.isTile({ x, y }) || this.heightMap.getStair({ x, y })) sizes[y][x] = undefined;
        else
          sizes[y][x] = {
            x: 1,
            y: 1,
            z: this.heightMap.getTileHeight({ x, y }),
          };
      }
    }

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
        if (sizes[y][x] && sizes[y][x - 1] && sizes[y][x]!.y === sizes[y][x - 1]!.y) {
          sizes[y][x]!.x += sizes[y][x - 1]!.x;
          sizes[y][x - 1] = undefined;
        }
      }
    }

    for (const y in sizes) {
      for (const x in sizes[y]) {
        if (sizes[y][x]) {
          const door: boolean = this.heightMap.door?.x === Number(x) && this.heightMap.door?.y === Number(y);

          tiles.push({
            position: {
              x: Number(x) - sizes[y][x]!.x + 1,
              y: Number(y) - sizes[y][x]!.y + 1,
              z: sizes[y][x]!.z,
            },
            size: sizes[y][x] as Vector2D,
            door: door,
          });
        }
      }
    }

    tiles = tiles.sort((a, b) => {
      if (a.position.x + a.size.x <= b.position.x || a.position.y + a.size.y <= b.position.y || a.position.z <= b.position.z) return 1;
      return -1;
    });
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
        if (stair) {
          if (stair.direction === Direction.NORTH || stair.direction === Direction.SOUTH) {
            rowStairSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
          } else if (stair.direction === Direction.WEST || stair.direction === Direction.EAST) {
            columnStairSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
          } else if (stair.type !== StairType.STAIR) {
            rowStairSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
            columnStairSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
          }
        }
      }
    }

    for (let y: number = 1; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        const stair: Stair | undefined = this.heightMap.getStair({
          x: x - 1,
          y,
        });
        if (stair && this.heightMap.getTileHeight({ x, y }) === this.heightMap.getTileHeight({ x: x - 1, y: y })) {
          if (stair.direction === Direction.NORTH || stair.direction === Direction.SOUTH || stair.type !== StairType.STAIR) {
            if (rowStairSizes[y][x] && rowStairSizes[y][x - 1] && rowStairSizes[y][x]!.y === rowStairSizes[y][x - 1]!.y) {
              rowStairSizes[y][x]!.x += rowStairSizes[y][x - 1]!.x;
              rowStairSizes[y][x - 1] = undefined;
            } else if (!rowStairSizes[y][x - 1]) {
              rowStairSizes[y][x]!.x += rowStairSizes[y][x]!.x;
            }
          }
        }
      }
    }

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 1; x < this.heightMap.heightMap[y].length; x++) {
        const stair: Stair | undefined = this.heightMap.getStair({
          x,
          y: y - 1,
        });
        if (stair && this.heightMap.getTileHeight({ x, y }) === this.heightMap.getTileHeight({ x: x, y: y - 1 })) {
          if (stair.direction === Direction.WEST || stair.direction === Direction.EAST || stair.type !== StairType.STAIR) {
            if (columnStairSizes[y][x] && columnStairSizes[y - 1][x] && columnStairSizes[y][x]!.x === columnStairSizes[y - 1][x]!.x) {
              columnStairSizes[y][x]!.y += columnStairSizes[y - 1][x]!.y;
              columnStairSizes[y - 1][x] = undefined;
            } else if (!columnStairSizes[y - 1][x]) {
              columnStairSizes[y][x]!.y += columnStairSizes[y][x]!.y;
            }
          }
        }
      }
    }

    for (const y in rowStairSizes) {
      for (const x in rowStairSizes[y]) {
        const stair: Stair | undefined = this.heightMap.getStair({
          x: Number(x),
          y: Number(y),
        });
        if (rowStairSizes[y][x] && stair) {
          const length: number = Number(rowStairSizes[y][x]!.x);
          let direction: Direction = stair.direction;

          if (direction === Direction.NORTH_WEST || direction === Direction.NORTH_EAST) direction = Direction.NORTH;
          if (direction === Direction.SOUTH_WEST || direction === Direction.SOUTH_EAST) direction = Direction.SOUTH;

          const leftStair: Stair | undefined = this.heightMap.getStair({
            x: Number(x) - rowStairSizes[y][x]!.x + 1,
            y: Number(y) - rowStairSizes[y][x]!.y + 1,
          });

          const rightStair: Stair | undefined = this.heightMap.getStair({
            x: Number(x),
            y: Number(y),
          });

          // Check if it's a tiny stair
          if (rowStairSizes[y][x]!.x == 1 && rowStairSizes[y][x]!.y == 1) {
            if (leftStair) {
              if (leftStair.direction === Direction.NORTH_EAST) {
                rightStair!.type = StairType.STAIR;
              } else if (leftStair.direction === Direction.NORTH_WEST) {
                leftStair!.type = StairType.STAIR;
              }
            }
          }

          stairs.push({
            position: {
              x: Number(x) - rowStairSizes[y][x]!.x + 1,
              y: Number(y) - rowStairSizes[y][x]!.y + 1,
              z: rowStairSizes[y][x]!.z,
            },
            length: length,
            direction: direction,
            corners: {
              left: leftStair ? leftStair.type : StairType.STAIR,
              right: rightStair ? rightStair.type : StairType.STAIR,
            },
          });
        }
      }
    }

    for (const y in columnStairSizes) {
      for (const x in columnStairSizes[y]) {
        const stair: Stair | undefined = this.heightMap.getStair({
          x: Number(x),
          y: Number(y),
        });
        if (columnStairSizes[y][x] && stair) {
          const length: number = Number(columnStairSizes[y][x]!.y);
          let direction: Direction = stair.direction;

          if (direction === Direction.NORTH_WEST || direction === Direction.SOUTH_WEST) direction = Direction.WEST;
          if (direction === Direction.SOUTH_EAST || direction === Direction.NORTH_EAST) direction = Direction.EAST;

          const leftStair: Stair | undefined = this.heightMap.getStair({
            x: Number(x),
            y: Number(y),
          });

          const rightStair: Stair | undefined = this.heightMap.getStair({
            x: Number(x) - columnStairSizes[y][x]!.x + 1,
            y: Number(y) - columnStairSizes[y][x]!.y + 1,
          });

          // Check if it's a tiny stair
          if (columnStairSizes[y][x]!.x == 1 && columnStairSizes[y][x]!.y == 1) {
            if (leftStair) {
              if (leftStair.direction === Direction.NORTH_WEST) {
                rightStair!.type = StairType.STAIR;
              } else if (leftStair.direction === Direction.SOUTH_WEST) {
                leftStair!.type = StairType.STAIR;
              }
            }
          }

          stairs.push({
            position: {
              x: Number(x) - columnStairSizes[y][x]!.x + 1,
              y: Number(y) - columnStairSizes[y][x]!.y + 1,
              z: columnStairSizes[y][x]!.z,
            },
            length: length,
            direction: direction,
            corners: {
              left: leftStair ? leftStair.type : StairType.STAIR,
              right: rightStair ? rightStair.type : StairType.STAIR,
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
        if (wall !== undefined) {
          if (wall === WallType.RIGHT_WALL) {
            rowWallSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
          } else if (wall === WallType.LEFT_WALL) {
            columnWallSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
          } else if (wall === WallType.CORNER_WALL) {
            rowWallSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
            columnWallSizes[y][x] = {
              x: 1,
              y: 1,
              z: this.heightMap.getTileHeight({ x, y }),
            };
          }
        }
      }
    }

    for (let y: number = 1; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 0; x < this.heightMap.heightMap[y].length; x++) {
        const wall: WallType | undefined = this.heightMap.getWall({
          x: x - 1,
          y,
        });
        if (wall !== undefined) {
          if (wall === WallType.RIGHT_WALL || wall === WallType.CORNER_WALL) {
            if (rowWallSizes[y][x] && rowWallSizes[y][x - 1] && rowWallSizes[y][x]!.y === rowWallSizes[y][x - 1]!.y) {
              rowWallSizes[y][x]!.x += rowWallSizes[y][x - 1]!.x;
              rowWallSizes[y][x - 1] = undefined;
            }
          }
        }
      }
    }

    for (let y: number = 0; y < this.heightMap.heightMap.length; y++) {
      for (let x: number = 1; x < this.heightMap.heightMap[y].length; x++) {
        const wall: WallType | undefined = this.heightMap.getWall({
          x,
          y: y - 1,
        });
        if (wall !== undefined) {
          if (wall === WallType.LEFT_WALL || wall === WallType.CORNER_WALL) {
            if (columnWallSizes[y][x] && columnWallSizes[y - 1][x] && columnWallSizes[y][x]!.x === columnWallSizes[y - 1][x]!.x) {
              columnWallSizes[y][x]!.y += columnWallSizes[y - 1][x]!.y;
              columnWallSizes[y - 1][x] = undefined;
            }
          }
        }
      }
    }

    for (const y in rowWallSizes) {
      for (const x in rowWallSizes[y]) {
        const wall: WallType | undefined = this.heightMap.getWall({
          x: Number(x),
          y: Number(y),
        });
        if (rowWallSizes[y][x] && wall !== undefined) {
          const length: number = Number(rowWallSizes[y][x]!.x);

          walls.push({
            position: {
              x: Number(x) - rowWallSizes[y][x]!.x + 1,
              y: Number(y) - rowWallSizes[y][x]!.y + 1,
              z: rowWallSizes[y][x]!.z,
            },
            length: length,
            direction: Direction.NORTH,
            corner: false,
          });
        }
      }
    }

    for (const y in columnWallSizes) {
      for (const x in columnWallSizes[y]) {
        const wall: WallType | undefined = this.heightMap.getWall({
          x: Number(x),
          y: Number(y),
        });

        if (columnWallSizes[y][x] && wall !== undefined) {
          const length: number = Number(columnWallSizes[y][x]!.y);

          const corner: boolean =
            this.heightMap.getWall({
              x: Number(x) - columnWallSizes[y][x]!.x + 1,
              y: Number(y) - columnWallSizes[y][x]!.y + 1,
            }) === WallType.CORNER_WALL;

          walls.push({
            position: {
              x: Number(x) - columnWallSizes[y][x]!.x + 1,
              y: Number(y) - columnWallSizes[y][x]!.y + 1,
              z: columnWallSizes[y][x]!.z,
            },
            length: length,
            direction: Direction.WEST,
            corner: corner,
          });
        }
      }
    }

    return walls;
  }
}
