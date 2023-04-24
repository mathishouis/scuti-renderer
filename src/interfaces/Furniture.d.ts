import type { BLEND_MODES } from 'pixi.js';

import type { Direction } from '../enums/Direction';

export interface IFloorPosition {
  x: number;
  y: number;
  z: number;
}

export interface IFloorFurnitureConfiguration {
  id: number;
  position: IFloorPosition;
  direction: Direction;
  state?: number;
}

export interface IWallPosition {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

export interface IWallFurnitureConfiguration {
  id: number;
  position: IWallPosition;
  direction: Direction;
  state?: number;
}

export interface IFurnitureData {
  id: number;
  className: string;
  name: string;
  description: string;
  furniLine: string;
  offerId: number;
  adUrl: string;
  excludeDynamic: boolean;
  specialType: number;
  customParams: string;
  dimensions: {
    x: number;
    y: number;
    defaultDirection: number;
  };
  canStandOn: boolean;
  canSitOn: boolean;
  canLayOn: boolean;
}

export interface IFurnitureProperty {
  infos: object;
  visualization: IFurnitureVisualization;
}

export interface IFurnitureVisualization {
  layerCount: number;
  directions: number[];
  colors: number[];
  layers: Array<{ z: number; ignoreMouse: boolean; tag: string; alpha: number; ink: string }>;
  animation: Array<Array<{ frameSequence: [] }>>;
}

export interface IFurnitureLayerConfiguration {
  layer: number | string;
  alpha: number;
  tint: number;
  z: number;
  blendMode: BLEND_MODES;
  flip: boolean;
  frame: number;
  ignoreMouse: boolean;
  direction: Direction;
  tag?: string;
}
