export function isTile(tile: string | undefined) {
    return tile !== 'x';
}

export function parse(tilemap: string) {
    let lines: number = 0;
    let matrix: [[]] = [[]];
    for(let i = 0; i < tilemap.length; i++) {
        if(tilemap[i] === "\n" || tilemap[i] === "\r") {
            matrix.push([]);
            lines++;
        } else {
            // @ts-ignore
            matrix[lines].push(tilemap[i]);
        }
    }

    let parsedTileMap: { type: string; }[][] = [];

    for (let y = 0; y < matrix.length; y++) {
        parsedTileMap[y] = []
        for (let x = 0; x < matrix[y].length; x++) {
            if(isTile(matrix[y][x])) {
                parsedTileMap[y][x] = {
                    type: "tile"
                }
            } else {
                parsedTileMap[y][x] = {
                    type: "hidden"
                }
            }
        }
    }

    return parsedTileMap;
}

export function getTile(tilemap: [[]], x: number, y: number) {
    if(x < 0) return 'x';
    if(y < 0) return 'x';
    if(tilemap[y] === undefined) return 'x';
    if(tilemap[y][x] === undefined) return 'x';
    return tilemap[y][x]
}