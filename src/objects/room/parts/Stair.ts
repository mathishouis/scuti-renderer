import { Texture, Container, Graphics, Matrix, utils } from 'pixi.js';
import { IStairProps } from "../../../interfaces/IStairProps";

export class Stair extends Container {

    private _tileThickness: number;
    private _color: number;
    private _texture?: Texture;
    private _container?: Container;
    private _direction: number;

    constructor(props: IStairProps,
                private onClick: (x: number, y: number, z: number) => void,
                private onOver: (x: number, y: number, z: number) => void,
                private onOut: (x: number, y: number, z: number) => void) {
        super();

        this._tileThickness = props.tileThickness;
        this._color = props.color;
        this._texture = props.texture;
        this._direction = props.direction;

        this._draw();
    }

    private _draw(): void {

        let DRAW_POINTS: { x: number; y: number; }[] = [];
        let OFFSETS: { x: number; y: number; }[] = [];

        this._container?.destroy();
        this._container = new Container();

        switch (this._direction) {
            case 0:
                DRAW_POINTS = [
                    { x: 0, y: 0 },
                    { x: 8, y: -4 },
                    { x: 40, y: 12 },
                    { x: 32, y: 16 },
                ];
                OFFSETS = [
                    { x: 8, y: -12 },
                    { x: 0, y: 0 }
                ];
                break;
            case 2:
                DRAW_POINTS = [
                    { x: 0, y: 0 },
                    { x: 32, y: -16 },
                    { x: 40, y: -12 },
                    { x: 8, y: 4 },
                ];
                OFFSETS = [
                    { x: 8, y: -4 },
                    { x: 0, y: 0 }
                ];
                break;
            case 4:
                DRAW_POINTS = [
                    { x: 0, y: 0 },
                    { x: 8, y: -4 },
                    { x: 40, y: 12 },
                    { x: 32, y: 16 },
                ];
                OFFSETS = [
                    { x: -8, y: -4 },
                    { x: 24, y: -12 }
                ];
                break;
            case 6:
                DRAW_POINTS = [
                    { x: 0, y: 0 },
                    { x: 32, y: -16 },
                    { x: 40, y: -12 },
                    { x: 8, y: 4 },
                ];
                OFFSETS = [
                    { x: -8, y: -12 },
                    { x: 24, y: 12 }
                ];
                break;
        }
        for (let i = 0; i < 4; i++) {
            let stepContainer = new Container();

            let tileTop = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.99999),
                    matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
                })
                .moveTo(DRAW_POINTS[0].x, DRAW_POINTS[0].y)
                .lineTo(DRAW_POINTS[1].x, DRAW_POINTS[1].y)
                .lineTo(DRAW_POINTS[2].x, DRAW_POINTS[2].y)
                .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y)
                .lineTo(DRAW_POINTS[0].x, DRAW_POINTS[0].y)
                .endFill();

            const tileLeft = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.8),
                    matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
                })
                .moveTo(DRAW_POINTS[0].x, DRAW_POINTS[0].y)
                .lineTo(DRAW_POINTS[0].x, DRAW_POINTS[0].y + this._tileThickness)
                .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y + this._tileThickness)
                .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y)
                .endFill();

            const tileRight = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.71),
                    matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
                })
                .moveTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y)
                .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y + this._tileThickness)
                .lineTo(DRAW_POINTS[2].x, DRAW_POINTS[2].y + this._tileThickness)
                .lineTo(DRAW_POINTS[2].x, DRAW_POINTS[2].y)
                .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y)
                .endFill();

            stepContainer.addChild(tileTop);
            stepContainer.addChild(tileLeft);
            stepContainer.addChild(tileRight);

            stepContainer.x = OFFSETS[0].x * i;
            stepContainer.y = OFFSETS[0].y * i;

            this._container.addChild(stepContainer);
            this._container.x = OFFSETS[1].x;
            this._container.y = OFFSETS[1].y;
        }

        this["interactive"] = true;

        this.addChild(this._container);

    }

    click() {
        this.onClick(0, 0, 0);
    }

    mouseover() {
        this.onOver(0, 0, 0);
    }

    mouseout() {
        this.onOut(0, 0, 0);
    }

}