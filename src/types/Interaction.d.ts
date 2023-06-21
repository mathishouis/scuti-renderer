import type { FederatedPointerEvent } from 'pixi.js';

import type { IAvatarPosition } from './Avatar';
import type { IFloorPosition, IWallPosition } from './Furniture';

export interface IInteractionEvent {
  tag?: string;
  event: FederatedPointerEvent;
  position?: IWallPosition | IFloorPosition | IAvatarPosition;
}
