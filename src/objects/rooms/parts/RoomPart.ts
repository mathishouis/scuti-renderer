import { Container } from 'pixi.js';
import { Room } from '../Room.ts';
import { EventManager } from '../../events/EventManager.ts';

export abstract class RoomPart {
  public abstract container: Container;
  public abstract room: Room;
  public abstract eventManager: EventManager;
  public abstract render(): void;
}
