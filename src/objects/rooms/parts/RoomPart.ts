import { Container } from 'pixi.js';
import { Room } from '../Room';
import { EventManager } from '../../events/EventManager';

export abstract class RoomPart {
  public abstract container: Container;
  public abstract room: Room;
  public abstract eventManager: EventManager;
  public abstract render(): void;
}
