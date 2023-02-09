import {RoomObject} from "../rooms/RoomObject";
import {FloorPosition} from "../../interfaces/Furniture.interface";
import {Direction} from "../../types/Direction";
import {AvatarAction} from "./actions/AvatarAction";
import {Assets, Spritesheet} from "pixi.js";
import {
    AvatarConfiguration,
    AvatarFigure,
    AvatarPart,
    IActionDefinition,
    AvatarPartSet, IAnimationFrameData
} from "../../interfaces/Avatar.interface";
import {AvatarUtil} from "../../utilities/AvatarUtil";
import {AvatarLayer} from "./AvatarLayer";
import {gsap} from "gsap";
import {AvatarActionManager} from "./actions/AvatarActionManager";
import {AvatarAnimationManager} from "./animations/AvatarAnimationManager";
import {AvatarAnimation} from "./animations/AvatarAnimation";

export class Avatar extends RoomObject {

    private _figure: AvatarFigure;

    private _position: FloorPosition;

    private _bodyDirection: Direction;

    private _headDirection: Direction;

    private _actions: AvatarAction[];

    private _frames: Map<number, Map<string, { action: String, frame: number, repeat: number }>> = new Map();

    private _actionManager: AvatarActionManager;
    private _animationManager: AvatarAnimationManager;

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
    }

    private _draw(): void {
        this._destroyParts();
        this._figure.forEach((set: { setId: number, colors: number[] }, type: string) => {
            const parts: AvatarPart[] = AvatarUtil.getParts(type, set.setId);

            parts.forEach((part: AvatarPart) => {
                Assets.add("figures/" + part.lib.id, "http://localhost:8081/figure/" + part.lib.id + "/" + part.lib.id + ".json");
                Assets.load("figures/" + part.lib.id).then(() => this._createLayer(part, {set: set, type: type}));
            });
        });

        this.x = 32 * this._position.x - 32 * this._position.y;
        this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    }

    private _createLayer(part: AvatarPart, set: { set: { setId: number, colors: number[] }, type: string }): void {
        if(!this._frames.has(part.id)) this._frames.set(part.id, new Map());

        const spritesheet: Spritesheet = Assets.get("figures/" + part.lib.id);
        const avatarPartSets: AvatarPartSet = Assets.get("figures/partsets");

        Object.keys(spritesheet.data.partsType).forEach((type: string) => {
            // We register the part type if it's not already registered
            if(!this._frames.get(part.id).has(type)) this._frames.get(part.id).set(type, {
                action: "Default",
                frame: 0,
                repeat: 0
            });
            let direction: Direction = this._bodyDirection;

            // We get the actions, check if it's valid and if the action is included in the active part set
            const sortedActions: AvatarAction[] = this._actionManager.filterActions(this._actions, type);

            let finalAction: AvatarAction = this._actionManager.sortActions(sortedActions)[0];

            // If this part type is in the head part set, we put the direction equal to the head direction
            if (avatarPartSets.activePartSets.head.includes(type)) {
                direction = this._headDirection;
            }

            // We get the animation gesture and frame
            const frameData: IAnimationFrameData = this._animationManager.getLayerData(finalAction, this._frames.get(part.id).get(type).frame, type)
            let gesture: string = this._actionManager.getActionDefinition(finalAction).assetpartdefinition
            let frame: Number = 0;
            if(frameData !== undefined) {
                this._frames.get(part.id).get(type).action = finalAction;
                frame = frameData.frame;
                gesture = frameData.assetpartdefinition
            }

            let tempDirection: number = direction;
            if([4, 5, 6, 7].includes(tempDirection)) {
                tempDirection = 6 - tempDirection
            }

            // If the texture don't exist we reinitalise the gesture and the final action
            if(spritesheet.textures[part.lib.id + "_h_" + gesture + "_" + type + "_" + part.id + "_" + tempDirection + "_" + frame] === undefined) {
                gesture = "std";
                finalAction = AvatarAction.Default;
                this._frames.get(part.id).get(type).action = finalAction;
            }

            // We create the layer
            if(spritesheet.textures[part.lib.id + "_h_" + gesture + "_" + type + "_" + part.id + "_" + tempDirection + "_" + frame] !== undefined) {
                this.addChild(new AvatarLayer(this, {
                    type: type,
                    part: part,
                    gesture: gesture,
                    tint: part.colorable === 1 && type !== "ey" ? AvatarUtil.getColor(set.type, set.set.colors[part.index]) : undefined,
                    z: AvatarUtil.getDrawOrder(type, gesture, direction),
                    flip: true,
                    direction: direction,
                    frame: frame
                }));
            }
        });
    }

    private _updateFrame(): void {
        const avatarAnimations: [] = Assets.get("figures/animations");
        this._frames.forEach((types: Map<string, { action: string, frame: number, repeat: number }>, partId: number) => {
            types.forEach((value: { action: string, frame: number, repeat: number }, type: string) => {
                const animation = avatarAnimations[value.action];
                if (animation !== undefined && animation.frames[value.frame] !== undefined && animation.frames[value.frame].bodyparts[type] !== undefined) {
                    const currentFrame = this._frames.get(partId).get(type);
                    if (animation.frames[value.frame].bodyparts[type].repeats !== undefined) {
                        if (currentFrame.repeat >= Number(animation.frames[value.frame].bodyparts[type].repeats)) {
                            currentFrame.repeat = 0;
                            currentFrame.frame = currentFrame.frame >= animation.frames.length - 1 ? 0 : currentFrame.frame + 1;
                        } else {
                            currentFrame.repeat += 1;
                        }
                    } else {
                        currentFrame.frame = currentFrame.frame >= animation.frames.length - 1 ? 0 : currentFrame.frame + 1;
                    }
                }
            });
        });

        this._draw();
    }

    /**
     * On each animation tick
     * @private
     */
    private _onTicker(): void {
        this._updateFrame();
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

}
