import { Texture } from 'pixi.js';

export interface ITileProps {
    color: number,
    tileThickness: number,
    texture?: Texture,
    x: number,
    y: number,
    z: number,
}