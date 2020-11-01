import {CreateRoomEvent} from "./navigator/CreateRoomEvent";
import {OpenNavigatorEvent} from "./navigator/OpenNavigatorEvent";
import {OpenInventoryEvent} from "./inventory/OpenInventoryEvent";

export class OutgoingManager {
    static eventListener() {
        CreateRoomEvent.listen();
        OpenNavigatorEvent.listen();
        OpenInventoryEvent.listen();
    }
}
