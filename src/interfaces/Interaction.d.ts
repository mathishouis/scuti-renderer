import type { FederatedPointerEvent } from 'pixi.js';

import type { IFloorPosition, IWallPosition } from './Furniture';

export interface IInteractionEvent {
  tag?: string;
  mouseEvent: FederatedPointerEvent;
  position?: IWallPosition | IFloorPosition;
}
