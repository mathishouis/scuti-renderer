import { Direction } from "../types/Direction";
import { BLEND_MODES } from "pixi.js";

export interface FloorPosition {
    x: number,
    y: number,
    z: number
}

export interface FloorFurnitureConfiguration {
    id: number,
    position: FloorPosition,
    direction: Direction,
    state?: number
}

export interface WallPosition {
    x: number,
    y: number,
    offsetX: number,
    offsetY: number
}

export interface WallFurnitureConfiguration {
    id: number,
    position: WallPosition,
    direction: Direction,
    state?: number
}

export type FurnitureFrameId = number;

export type FurnitureLayerId = number;

export interface FurnitureData {
    id: number,
    className: string,
    name: string,
    description: string,
    furniLine: string,
    offerId: number,
    adUrl: string,
    excludeDynamic: boolean,
    specialType: number,
    customParams: string,
    dimensions: {
        x: number,
        y: number,
        defaultDirection: number
    },
    canStandOn: boolean,
    canSitOn: boolean,
    canLayOn: boolean
}

export interface FurnitureVisualization {
    layerCount: number,
    directions: number[],
    colors: number[],
    layers: {
        z: number,
        ignoreMouse: boolean,
        tag: string,
        alpha: number,
        ink: string
    }[],
    animation: {
        frameSequence: []
    }[][]
}

export interface FurnitureLayerConfiguration {
    layer: FurnitureLayerId | string,
    alpha: number,
    tint: number,
    z: number,
    blendMode: BLEND_MODES,
    flip: boolean,
    frame: number,
    ignoreMouse: boolean,
    direction: Direction
}
