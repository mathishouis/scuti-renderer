export function getZOrder(x, y, z) {
    return x * 1000 + y * 1000 + z
}

export function getZOrderAvatar(x, y, z) {
    return (((Math.floor(x) + Math.floor(y)) * COMPARABLE_X_Y + (z + 0.001 * COMPARABLE_Z)) + PRIORITY_MULTIPLIER * PRIORITY_ROOM_AVATAR);
}

export function getZOrderTileCursor(x, y) {
    return (((x + y) * COMPARABLE_X_Y) + PRIORITY_MULTIPLIER * PRIORITY_TILE_CURSOR) - 500000;
}

export function getZOrderFloorItem(x, y, z, zIndex) {
    const compareY = (Math.trunc(zIndex / 100)) / 10;
    return (((x + y + compareY) * COMPARABLE_X_Y + (z * COMPARABLE_Z)) + PRIORITY_MULTIPLIER * PRIORITY_ROOM_ITEM);
}

// Credit: Relevance

const PRIORITY_TILE_CURSOR = 11;
const PRIORITY_ROOM_AVATAR = 11;
const PRIORITY_ROOM_ITEM = 11;

const PRIORITY_MULTIPLIER = 10000000;
const COMPARABLE_X_Y = 1000000;
const COMPARABLE_Z = 10000;