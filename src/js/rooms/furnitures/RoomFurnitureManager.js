import { RoomFurniture } from './RoomFurniture';

export class RoomFurnitureManager {

    addFurni(id, baseId, positions, direction, state, canvas) {
        const furni = new RoomFurniture(id, baseId, positions, direction, state, canvas);
        furni.addFurni();
    }

    drawFurni(id, baseId, positions, direction, state, canvas) {
        const furni = new RoomFurniture(id, baseId, positions, direction, state, canvas);
        furni.drawFurni();
    }
}