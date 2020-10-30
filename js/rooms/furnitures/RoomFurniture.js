export class RoomFurniture {
    constructor(id, baseId, position, direction, state, canvas) {
        this.id = id;
        this.baseId = baseId;
        this.position = position;
        this.direction = direction;
        this.state = state;
        this.canvas = canvas;
    }

    drawFurni() {
        console.log({
            'id': this.id,
            'baseId': this.baseId,
            'position': this.position,
            'direction': this.direction,
            'state': this.state
        })
    }
}