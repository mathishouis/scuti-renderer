// @ts-nocheck
import { gsap } from 'gsap';
import { Assets } from 'pixi.js';

import { RoomObject } from '../rooms/RoomObject';
import type { Direction } from '../../enums/Direction';
import { AvatarAction } from './actions/AvatarAction';
import type { AvatarFigure, IAvatarConfiguration, IAvatarPart } from '../../interfaces/Avatar';
import { AvatarActionManager } from './actions/AvatarActionManager';
import { AvatarAnimationManager } from './animations/AvatarAnimationManager';
import { AvatarBodyPart } from './AvatarBodyPart';
import { AvatarLayer } from './AvatarLayer';
import { InteractionManager } from '../interactions/InteractionManager';
import type { IInteractionEvent } from '../../interfaces/Interaction';
import { AssetLoader } from '../../utilities/AssetLoader';
import type { IFloorPosition } from '../../interfaces/Furniture';

export class Avatar extends RoomObject {
  private readonly _figure: AvatarFigure;

  private _position: IFloorPosition;

  private _bodyDirection: Direction;

  private _headDirection: Direction;

  private _actions: AvatarAction[];

  private readonly _handItem: number;

  private readonly _actionManager: AvatarActionManager;

  private readonly _animationManager: AvatarAnimationManager;

  private readonly _interactionManager: InteractionManager = new InteractionManager();

  private readonly _bodyParts: AvatarBodyPart[] = [];

  private areAllAssetsLoaded = false;

  constructor(configuration: IAvatarConfiguration) {
    super();

    this._figure = this._parseFigure(configuration.figure);
    this._position = configuration.position;
    this._headDirection = configuration.headDirection;
    this._bodyDirection = configuration.bodyDirection;
    this._actions = configuration.actions;
    this._handItem = configuration.handItem;

    const assets = [];

    if (this._handItem !== 0 || this._handItem !== undefined) {
      assets.push(AssetLoader.load('figures/hh_human_item', 'figure/hh_human_item/hh_human_item.json'));
    }
    assets.push(AssetLoader.load('figures/hh_human_body', 'figure/hh_human_body/hh_human_body.json'));

    this._actionManager = new AvatarActionManager(AvatarAction.Default);
    this._animationManager = new AvatarAnimationManager();
    this._actions.forEach((action: AvatarAction) => {
      return this._animationManager.registerAnimation(action);
    });

    this._figure.forEach((set: { setId: number; colors: number[] }, type: string) => {
      const parts: IAvatarPart[] = this._getParts(type, set.setId);
      this._bodyParts.push(
        new AvatarBodyPart(this, {
          type,
          setId: set.setId,
          colors: set.colors,
          parts,
          actions: this._actions
        })
      );
    });

    //this.interactive = true;

    Promise.all(assets)
      .then(() => {
        this.areAllAssetsLoaded = true;
      })
      .catch((error) => {
        return console.error(error);
      });
  }

  private _draw(): void {
    this._destroyParts();

    if (!this.areAllAssetsLoaded) {
      return;
    }

    if (this._handItem !== 0 || this._handItem !== undefined) {
      this._createHandItem(this._handItem);
    }
    this._createShadow();

    this._bodyParts.forEach((bodyPart: AvatarBodyPart) => {
      bodyPart.actions = this._actions;
      bodyPart.updateParts();
    });

    this.x = 32 * this._position.x - 32 * this._position.y;
    this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
  }

  private _createHandItem(item: number): void {
    const handItemCarryId: number = this._actionManager.getActionDefinition(AvatarAction.CarryItem).params[
      String(item)
    ];
    const handItemUseId: number = this._actionManager.getActionDefinition(AvatarAction.UseItem).params[String(item)];
    if (this._actions.includes(AvatarAction.UseItem) && handItemUseId !== undefined) {
      this.addChild(
        new AvatarLayer(this, {
          type: 'ri',
          part: { id: handItemUseId, lib: { id: 'hh_human_item' } },
          gesture: 'drk',
          tint: undefined,
          z: 1000,
          flip: false,
          direction: this._bodyDirection,
          frame: 0
        })
      );
    } else if (this._actions.includes(AvatarAction.CarryItem) && handItemCarryId !== undefined) {
      this.addChild(
        new AvatarLayer(this, {
          type: 'ri',
          part: { id: handItemCarryId, lib: { id: 'hh_human_item' } },
          gesture: 'crr',
          tint: undefined,
          z: 1000,
          flip: false,
          direction: this._bodyDirection,
          frame: 0
        })
      );
    }
  }

  private _createPlaceholder(): void {}

  private _createShadow(): void {
    this.addChild(
      new AvatarLayer(this, {
        type: 'sd',
        part: { id: 1, lib: { id: 'hh_human_body' } },
        gesture: 'std',
        tint: undefined,
        z: 0,
        flip: true,
        direction: 0,
        frame: 0,
        alpha: 0.1
      })
    );
  }

  private _destroyParts(): void {
    while (this.children[0] != null) {
      this.removeChild(this.children[0]);
    }
  }

  private _parseFigure(figure: string): AvatarFigure {
    return new Map(
      figure.split('.').map((part) => {
        const data: string[] = part.split('-');
        return [
          data[0],
          {
            setId: Number(data[1]),
            colors: data.splice(2, 2).map((color) => {
              return Number(color);
            })
          }
        ] as const;
      })
    );
  }

  private _getParts(type: string, setId: number): IAvatarPart[] {
    const figureData: [] = Assets.get('figures/figuredata');
    const figureMap: [] = Assets.get('figures/figuremap');
    let parts = [];
    if (figureData.settype[type]?.set[setId] == null) return parts;
    const hiddenLayers: [] = figureData.settype[type]?.set[setId].hiddenLayers;
    const set = figureData.settype[type]?.set[setId];
    set?.parts.forEach((part) => {
      const libId = figureMap.parts[part.type][String(part.id)];
      const lib = figureMap.libs[libId];
      //console.log(part.type, libId);
      part.lib = lib;
      parts.push(part);
    });
    if (hiddenLayers !== undefined) {
      parts = parts.filter((part) => {
        return !hiddenLayers.includes(part.type);
      });
    }
    return parts;
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
  public start(): void {
    this.animationTicker.add(() => {
      return this._onTicker();
    });
  }

  /**
   * Stop the furniture animation
   */
  public stop(): void {
    this.animationTicker.remove(() => {
      return this._onTicker();
    });
  }

  public get pos(): IFloorPosition {
    return this._position;
  }

  public set pos(position: IFloorPosition) {
    gsap.to(this, {
      x: 32 * position.x - 32 * position.y,
      y: 16 * position.x + 16 * position.y - 32 * position.z,
      duration: 0.5,
      ease: 'linear',
      onComplete: () => {
        this._position = position;
      }
    });
  }

  public get actions(): AvatarAction[] {
    return this._actions;
  }

  public set actions(actions: AvatarAction[]) {
    actions.forEach((action: AvatarAction) => {
      return this._animationManager.registerAnimation(action);
    });
    this._actions = actions;
  }

  public addAction(action: AvatarAction): void {
    if (this._animationManager.getAnimation(action) == null) this._animationManager.registerAnimation(action);
    if (!this._actions.includes(action)) this._actions.push(action);
  }

  public removeAction(action: AvatarAction): void {
    this._actions = this._actions.filter((fAction: AvatarAction) => {
      return fAction !== action;
    });
  }

  public get headDirection(): Direction {
    return this._headDirection;
  }

  public set headDirection(direction: Direction) {
    this._headDirection = direction;
  }

  public get bodyDirection(): Direction {
    return this._bodyDirection;
  }

  public set bodyDirection(direction: Direction) {
    this._bodyDirection = direction;
  }

  public get actionManager(): AvatarActionManager {
    return this._actionManager;
  }

  public get animationManager(): AvatarAnimationManager {
    return this._animationManager;
  }

  public get interactionManager(): InteractionManager {
    return this._interactionManager;
  }

  get onPointerDown(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerDown;
  }

  set onPointerDown(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerDown = value;
  }

  get onPointerUp(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerUp;
  }

  set onPointerUp(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerUp = value;
  }

  get onPointerMove(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerMove;
  }

  set onPointerMove(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerMove = value;
  }

  get onPointerOut(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerOut;
  }

  set onPointerOut(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerOut = value;
  }

  get onPointerOver(): (event: IInteractionEvent) => void {
    return this._interactionManager.onPointerOver;
  }

  set onPointerOver(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onPointerOver = value;
  }

  get onDoubleClick(): (event: IInteractionEvent) => void {
    return this._interactionManager.onDoubleClick;
  }

  set onDoubleClick(value: (event: IInteractionEvent) => void) {
    this._interactionManager.onDoubleClick = value;
  }
}
