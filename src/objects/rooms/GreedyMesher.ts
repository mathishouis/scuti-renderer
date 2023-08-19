import {RoomHeightmap} from "./RoomHeightmap.ts";
import {Direction, Position2D, Position3D} from "../../interfaces/Position.ts";
import {Stair} from "../../interfaces/Stair.ts";
import {StairType} from "../../interfaces/StairType.ts";

// TODO: REFACTOR EVERYTHING HERE!!!!!!!
export class GreedyMesher {

    constructor(
        public heightMap: RoomHeightmap
    ) {}

    public getParts() {
        const sizes: Record<number, Record<number, Position3D | undefined>> = {};
        const blocks: Array<Record<'startPos' | 'size', Position2D | Position3D>> = [];

        for (let y = 0; y < this.heightMap.heightMap.length; y++) {
            sizes[y] = {}
            for (let x = 0; x < this.heightMap.heightMap[y].length; x++) {
                if (!this.heightMap.isTile({ x, y }) || this.heightMap.getStair({x, y})) sizes[y][x] = undefined
                else sizes[y][x] = { x: 1, y: 1, z: this.heightMap.getTileHeight({ x, y }) }
            }
        }

        for (let y = 0; y < this.heightMap.heightMap.length; y++) {
            for (let x = 1; x < this.heightMap.heightMap[y].length; x++) {
                if (!this.heightMap.isTile({ x, y: y - 1 }) || this.heightMap.getTileHeight({ x, y: y - 1 }) !== this.heightMap.getTileHeight({ x, y })) continue
                if (this.heightMap.isTile({ x, y })) {
                    if (sizes[y][x] && sizes[y - 1][x]) sizes[y][x]!.y += sizes[y - 1][x]!.y
                    if (this.heightMap.getStair({ x, y}) === undefined) {
                        sizes[y - 1][x] = undefined
                    }
                }
            }
        }

        for (let y = 1; y < this.heightMap.heightMap.length; y++) {
            for (const x in sizes[y]) {
                if (!this.heightMap.isTile({ x: Number(x) - 1, y }) || this.heightMap.getTileHeight({ x: Number(x) - 1, y }) !== this.heightMap.getTileHeight({ x: Number(x), y })) continue
                if (sizes[y][x] && sizes[y][Number(x) - 1] && sizes[y][x]!.y === sizes[y][Number(x) - 1]!.y) {
                    sizes[y][x]!.x += sizes[y][Number(x) - 1]!.x
                    sizes[y][Number(x) - 1] = undefined
                }
            }
        }

        for (const y in sizes) {
            for (const x in sizes[y]) {
                if (sizes[y][x])
                    blocks.push({
                        startPos: { x: Number(x) - sizes[y][x]!.x + 1, y: Number(y) - sizes[y][x]!.y + 1, z: sizes[y][x]!.z },
                        size: sizes[y][x] as Position2D
                    })
            }
        }

        return blocks;
    }

    public getStairs() {
        const stairs: Array<{
            startPos: Position3D,
            length: number,
            direction: Direction,
            leftCorner: StairType,
            rightCorner: StairType
        }> = [];

        const rowStairSizes: Record<number, Record<number, Position3D | undefined>> = {};
        const columnStairSizes: Record<number, Record<number, Position3D | undefined>> = {};

        for (let y = 0; y < this.heightMap.heightMap.length; y++) {
            rowStairSizes[y] = {}
            columnStairSizes[y] = {}
            for (let x = 1; x < this.heightMap.heightMap[y].length; x++) {
                const stair: Stair | undefined = this.heightMap.getStair({ x, y });
                if (stair) {
                    if (stair.direction === Direction.NORTH || stair.direction === Direction.SOUTH) {
                        rowStairSizes[y][x] = { x: 1, y: 1, z: this.heightMap.getTileHeight({ x: Number(x), y: Number(y) }) };
                    } else if(stair.direction === Direction.WEST || stair.direction === Direction.EAST) {
                        columnStairSizes[y][x] = { x: 1, y: 1, z: this.heightMap.getTileHeight({ x: Number(x), y: Number(y) }) };
                    } else if (stair.type !== StairType.STAIR) {
                        rowStairSizes[y][x] = { x: 1, y: 1, z: this.heightMap.getTileHeight({ x: Number(x), y: Number(y) }) };
                        columnStairSizes[y][x] = { x: 1, y: 1, z: this.heightMap.getTileHeight({ x: Number(x), y: Number(y) }) };
                    } else {
                        rowStairSizes[y][x] = undefined;
                        columnStairSizes[y][x] = undefined;
                    }
                } else {
                    rowStairSizes[y][x] = undefined;
                    columnStairSizes[y][x] = undefined;
                }
            }
        }

        for (let y = 1; y < this.heightMap.heightMap.length; y++) {
            for (const x in rowStairSizes[y]) {
                const stair: Stair | undefined = this.heightMap.getStair({ x: Number(x) - 1, y: Number(y) });
                if (stair) {
                    if (stair.direction === Direction.NORTH || stair.direction === Direction.SOUTH || stair.type !== StairType.STAIR) {
                        if (rowStairSizes[y][x] && rowStairSizes[y][Number(x) - 1] && rowStairSizes[y][x]!.y === rowStairSizes[y][Number(x) - 1]!.y) {
                            rowStairSizes[y][x]!.x += rowStairSizes[y][Number(x) - 1]!.x;
                            rowStairSizes[y][Number(x) - 1] = undefined;
                            //sizes[y][Number(x) - 1] = undefined;
                        }
                    }
                }
            }
        }

        for (let y = 1; y < this.heightMap.heightMap.length; y++) {
            for (const x in columnStairSizes[y]) {
                const stair: Stair | undefined = this.heightMap.getStair({ x: Number(x), y: Number(y) - 1 });
                if (stair) {
                    if (stair.direction === Direction.WEST || stair.direction === Direction.EAST || stair.type !== StairType.STAIR) {
                        if (columnStairSizes[y][x] && columnStairSizes[Number(y) - 1][x] && columnStairSizes[y][x]!.x === columnStairSizes[Number(y) - 1][x]!.x) {
                            columnStairSizes[y][x]!.y += columnStairSizes[Number(y) - 1][x]!.y;
                            columnStairSizes[Number(y) - 1][x] = undefined;
                            //sizes[Number(y) - 1][x] = undefined;
                        }
                    }
                }
            }
        }

        for (const y in rowStairSizes) {
            for (const x in rowStairSizes[y]) {
                const stair: Stair | undefined = this.heightMap.getStair({ x: Number(x), y: Number(y) })
                if (rowStairSizes[y][x] && stair) {
                    let length: number = Number(rowStairSizes[y][x]!.x);
                    let direction: Direction = stair.direction;

                    if (direction === Direction.NORTH_WEST || direction === Direction.NORTH_EAST) direction = Direction.NORTH;
                    if (direction === Direction.SOUTH_WEST || direction === Direction.SOUTH_EAST) direction = Direction.SOUTH;

                    const leftType: StairType | undefined = this.heightMap.getStair({
                        x: Number(x) - rowStairSizes[y][x]!.x + 1,
                        y: Number(y) - rowStairSizes[y][x]!.y + 1
                    })?.type;

                    const rightType: StairType | undefined = this.heightMap.getStair({
                        x: Number(x),
                        y: Number(y)
                    })?.type;

                    stairs.push({
                        startPos: {
                            x: Number(x) - rowStairSizes[y][x]!.x + 1,
                            y: Number(y) - rowStairSizes[y][x]!.y + 1,
                            z: rowStairSizes[y][x]!.z
                        },
                        length: length,
                        direction: direction,
                        leftCorner: leftType ?? StairType.STAIR,
                        rightCorner: rightType ?? StairType.STAIR
                    });
                }
            }
        }

        for (const y in columnStairSizes) {
            for (const x in columnStairSizes[y]) {
                const stair: Stair | undefined = this.heightMap.getStair({ x: Number(x), y: Number(y) })
                if (columnStairSizes[y][x] && stair) {
                    let length: number = Number(columnStairSizes[y][x]!.y);
                    let direction: Direction = stair.direction;

                    if (direction === Direction.NORTH_WEST || direction === Direction.SOUTH_WEST) direction = Direction.WEST;
                    if (direction === Direction.SOUTH_EAST || direction === Direction.NORTH_EAST) direction = Direction.EAST;

                    const leftType: StairType | undefined = this.heightMap.getStair({
                        x: Number(x),
                        y: Number(y)
                    })?.type;

                    const rightType: StairType | undefined = this.heightMap.getStair({
                        x: Number(x) - columnStairSizes[y][x]!.x + 1,
                        y: Number(y) - columnStairSizes[y][x]!.y + 1
                    })?.type;

                    stairs.push({
                        startPos: {
                            x: Number(x) - columnStairSizes[y][x]!.x + 1,
                            y: Number(y) - columnStairSizes[y][x]!.y + 1,
                            z: columnStairSizes[y][x]!.z
                        },
                        length: length,
                        direction: direction,
                        leftCorner: leftType ?? StairType.STAIR,
                        rightCorner: rightType ?? StairType.STAIR
                    });
                }
            }
        }

        return stairs;
    }

}
