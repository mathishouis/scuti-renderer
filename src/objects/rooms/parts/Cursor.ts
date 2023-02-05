import {Assets, Container, Sprite, Texture} from "pixi.js";
import {Room} from "../Room";
import {CursorConfiguration, Position} from "../../../interfaces/Room.interface";

export class Cursor extends Container {

    /**
     * The room instance
     * @private
     */
    private _room: Room;

    /**
     * The cursor position
     * @private
     */
    private _position: Position;

    /**
     *
     * @param room - The room instance
     * @param configuration - The cursor configuration
     */
    constructor(
        room: Room,
        configuration: CursorConfiguration
    ) {
        super();

        this._room = room;
        this._position = configuration.position;

        this._draw();
    }

    /**
     * Draw the cursor
     */
    public _draw(): void {
        const texture: Texture = Assets.get('room/cursors').textures['tile_cursor_64_a_0_0.png'];
        const sprite: Sprite = new Sprite(texture);
        sprite.y = -20;
        this.addChild(sprite);

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

}
