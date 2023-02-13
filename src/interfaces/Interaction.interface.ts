import {IFloorPosition, IWallPosition} from "./Furniture.interface";

export interface IInteractionEvent {
    tag?: string,
    mouseEvent: MouseEvent | TouchEvent | PointerEvent,
    position?: IWallPosition | IFloorPosition
}
