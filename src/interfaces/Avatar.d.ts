import type { Direction } from '../enums/Direction';
import type { AvatarAction } from '../objects/avatars/actions/AvatarAction';
import type { IFloorPosition } from './Furniture';

export type AvatarFigure = Map<string, { setId: number; colors: number[] }>;

export interface IAvatarConfiguration {
  figure: string;
  position: IFloorPosition;
  bodyDirection: Direction;
  headDirection: Direction;
  actions: AvatarAction[];
  handItem?: number;
}

export interface IAvatarPart {
  colorable: number;
  colorindex: number;
  id: number;
  index: number;
  lib: {
    id: string;
    revision: string;
  };
  type: string;
}

export interface IActionDefinition {
  state: string;
  precedence: string;
  main: string;
  geometrytype: string;
  activepartset: string;
  assetpartdefinition: string;
  prevents: string;
  params: string[];
}

export interface IAnimationDefinition {
  desc: string;
  frames: Array<{
    bodyparts: object;
  }>;
}

export interface IAnimationFrameData {
  assetpartdefinition: string;
  repeats: number;
  frame: number;
}

export interface IBodyPartConfiguration {
  type: string;
  setId: number;
  colors: number[];
  parts: IAvatarPart[];
  actions: AvatarAction[];
}

export interface IAvatarPartSets {
  partSets: object;
  activePartSets: {
    figure: string[];
    head: string[];
    speak: string[];
    gesture: string[];
    eye: string[];
    handRight: string[];
    handRightAndHead: string[];
    handLeft: string[];
    walk: string[];
    sit: string[];
    itemRight: string[];
    swim: string[];
  };
}

export interface IAvatarLayerConfiguration {
  type: string;
  part: IAvatarPart;
  gesture: string;
  tint: number;
  z: number;
  flip: boolean;
  direction: Direction;
  frame: number;
  alpha?: number;
}
