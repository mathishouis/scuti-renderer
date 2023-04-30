import { Room } from "../rooms/Room";

export abstract class RoomObject {
  private _room!: Room;
  set room(room: Room) {
    this._room = room;
  }
  get room(): Room {
    return this._room;
  }
}
