import { EventManager } from '../events/EventManager';

export class RoomEvents {
  public tiles: EventManager = new EventManager();
  public walls: EventManager = new EventManager();
}
