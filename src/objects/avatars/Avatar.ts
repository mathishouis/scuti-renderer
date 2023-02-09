import {RoomObject} from "../rooms/RoomObject";
import {FloorPosition} from "../../interfaces/Furniture.interface";
import {Direction} from "../../types/Direction";
import {AvatarAction} from "./actions/AvatarAction";
import {
    AvatarConfiguration,
    AvatarFigure,
    IAvatarPart,
} from "../../interfaces/Avatar.interface";
import {AvatarUtil} from "../../utilities/AvatarUtil";
import {gsap} from "gsap";
import {AvatarActionManager} from "./actions/AvatarActionManager";
import {AvatarAnimationManager} from "./animations/AvatarAnimationManager";
import {AvatarBodyPart} from "./AvatarBodyPart";

export class Avatar extends RoomObject {

    private _figure: AvatarFigure;

    private _position: FloorPosition;

    private _bodyDirection: Direction;

    private _headDirection: Direction;

    private _actions: AvatarAction[];

    private _frames: Map<number, Map<string, { action: String, frame: number, repeat: number }>> = new Map();

    private _actionManager: AvatarActionManager;
    private _animationManager: AvatarAnimationManager;
    private _bodyParts: AvatarBodyPart[] = [];

    constructor(
        configuration: AvatarConfiguration
    ) {
        super();

        this._figure = AvatarUtil.parseFigure(configuration.figure);
        this._position = configuration.position;
        this._headDirection = configuration.headDirection;
        this._bodyDirection = configuration.bodyDirection;
        this._actions = configuration.actions;

        this._actionManager = new AvatarActionManager(AvatarAction.Default);
        this._animationManager = new AvatarAnimationManager();
        this._actions.forEach((action: AvatarAction) => this._animationManager.registerAnimation(action));

        this._figure.forEach((set: { setId: number, colors: number[] }, type: string) => {
            const parts: IAvatarPart[] = AvatarUtil.getParts(type, set.setId);
            this._bodyParts.push(new AvatarBodyPart(this, {
                type: type,
                setId: set.setId,
                colors: set.colors,
                parts: parts,
                actions: this._actions
            }));
        });
    }

    private _draw(): void {
        this._destroyParts();
        this._bodyParts.forEach((bodyPart: AvatarBodyPart) => bodyPart.updateParts());

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    /**
     * On each animation tick
     * @private
     */
    private _onTicker(): void {
        this._draw();
    }

    /**
     * Start the furniture animation
     */
    public startAnimation(): void {
        this.animationTicker.add(() => this._onTicker());
    }

    /**
     * Stop the furniture animation
     */
    public stopAnimation(): void {
        this.animationTicker.remove(() => this._onTicker());
    }

    private _createPlaceholder(): void {

    }

    private _destroyParts(): void {
        while(this.children[0]) {
            this.removeChild(this.children[0]);
        }
    }

    public get pos(): FloorPosition {
        return this._position;
    }

    public set pos(position: FloorPosition) {
        gsap.to(this, {
            x: 32 * position.x - 32 * position.y, y: 16 * position.x + 16 * position.y - 32 * position.z, duration: 0.5, ease: "linear", onComplete: () => {
                this._position = position;
            }
        });
    }

    public get actions(): AvatarAction[] {
        return this._actions;
    }

    public get headDirection(): Direction {
        return this._headDirection;
    }

    public get bodyDirection(): Direction {
        return this._bodyDirection;
    }

    public get actionManager(): AvatarActionManager {
        return this._actionManager;
    }

    public get animationManager(): AvatarAnimationManager {
        return this._animationManager;
    }

}
