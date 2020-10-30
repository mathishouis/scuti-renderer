import { RoomFurniture } from './RoomFurniture';

export class RoomFurnitureManager {

    addFurni(id, baseId, position, direction, state, canvas) {
        const furni = new RoomFurniture(id, baseId, position, direction, state, canvas);
        furni.drawFurni();
    }
}