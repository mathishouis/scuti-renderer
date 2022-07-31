import { Texture } from 'pixi.js';

export interface IStairProps {
    color: number,
    tileThickness: number,
    texture?: Texture,
    direction: number
}