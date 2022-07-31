import { Texture, Container, Graphics, Matrix, utils } from 'pixi.js';
import { IStairProps } from "../../../interfaces/IStairProps";
import { StairType } from "../../../types/StairType";

export class StairCorner extends Container {

    private _tileThickness: number;
    private _color: number;
    private _texture?: Texture;
    private _container?: Container;
    private _direction: number;
    private _type: StairType;

    constructor(props: IStairProps) {
        super();

        this._tileThickness = props.tileThickness;
        this._color = props.color;
        this._texture = props.texture;
        this._direction = props.direction;
        this._type = props.type;

        this._draw();
    }

    private _draw(): void {

        let DRAW_POINTS: { x: number; y: number; }[] = [];
        let DRAW_POINTS_OFFSETS: { x: number; y: number; }[] = [];
        let OFFSETS: { x: number; y: number; }[] = [];

        this._container?.destroy();
        this._container = new Container();
        this._container.sortableChildren = true;

        if(this._type === "outerCorner") {
            switch (this._direction) {
                case 1:
                    DRAW_POINTS = [
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ];
                    DRAW_POINTS_OFFSETS = [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ];
                    OFFSETS = [
                        {x: 16, y: -8},
                        {x: 24, y: -12},
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                    ];
                    break;
                case 3:
                    DRAW_POINTS = [
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ];
                    DRAW_POINTS_OFFSETS = [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ];
                    OFFSETS = [
                        {x: 0, y: 0},
                        {x: -8, y: 4},
                        {x: 24, y: -12},
                        {x: 0, y: 0},
                    ];
                    break;
                case 5:
                    DRAW_POINTS = [
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ];
                    DRAW_POINTS_OFFSETS = [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ];
                    OFFSETS = [
                        {x: -8, y: -4},
                        {x: 16, y: 16},
                        {x: 24, y: -12},
                        {x: -16, y: -8},
                    ];
                    break;
                case 7:
                    DRAW_POINTS = [
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ];
                    DRAW_POINTS_OFFSETS = [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ];
                    OFFSETS = [
                        {x: 8, y: -12},
                        {x: 48, y: 0},
                        {x: 0, y: 0},
                        {x: -8, y: -12},
                    ];
                    break;
            }
        } else {
            switch (this._direction) {
                case 1:
                    DRAW_POINTS = [
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ];
                    DRAW_POINTS_OFFSETS = [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ];
                    OFFSETS = [
                        {x: -8, y: 12},
                        {x: 16, y: 16},
                        {x: 24, y: -36},
                        {x: -16, y: 8},
                    ];
                    break;
                case 3:
                    return;
                case 5:
                    DRAW_POINTS = [
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ];
                    DRAW_POINTS_OFFSETS = [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ];
                    OFFSETS = [
                        {x: 16, y: 8},
                        {x: 24, y: -12},
                        {x: 0, y: -24},
                        {x: 8, y: 12},
                    ];
                    break;
                case 7:
                    DRAW_POINTS = [
                        {x: 0, y: 0},
                        {x: 8, y: -4},
                        {x: 16, y: 0},
                        {x: 8, y: 4},
                    ];
                    DRAW_POINTS_OFFSETS = [
                        {x: 0, y: 0},
                        {x: 0, y: 0},
                        {x: 8, y: 4},
                        {x: 8, y: 4},
                    ];
                    OFFSETS = [
                        {x: 0, y: 16},
                        {x: -8, y: 4},
                        {x: 24, y: -36},
                        {x: 0, y: 16},
                    ];
                    break;
            }
        }
        for (let i = 0; i < 3; i++) {
            let stepContainer = new Container();

            let tileTop = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.99999),
                    matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
                })
                .moveTo(DRAW_POINTS[0].x + (-DRAW_POINTS_OFFSETS[2].x * (2 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[2].y * (2 - i)))
                .lineTo(DRAW_POINTS[1].x + (DRAW_POINTS_OFFSETS[1].x * (2 - i)), DRAW_POINTS[1].y + (DRAW_POINTS_OFFSETS[1].y * (2 - i)))
                .lineTo(DRAW_POINTS[2].x + (DRAW_POINTS_OFFSETS[0].x * (2 - i)), DRAW_POINTS[2].y + (DRAW_POINTS_OFFSETS[0].y * (2 - i)))
                .lineTo(DRAW_POINTS[3].x + (-DRAW_POINTS_OFFSETS[3].x * (2 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (2 - i)))
                .lineTo(DRAW_POINTS[0].x + (-DRAW_POINTS_OFFSETS[2].x * (2 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[2].y * (2 - i)))
                .endFill();

            const tileLeft = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.8),
                    matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
                })
                .moveTo(DRAW_POINTS[0].x + (-DRAW_POINTS_OFFSETS[2].x * (2 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[2].y * (2 - i)))
                .lineTo(DRAW_POINTS[0].x + (-DRAW_POINTS_OFFSETS[2].x * (2 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[2].y * (2 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[3].x + (-DRAW_POINTS_OFFSETS[3].x * (2 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (2 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[3].x + (-DRAW_POINTS_OFFSETS[3].x * (2 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (2 - i)))
                .endFill();

            const tileRight = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.71),
                    matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
                })
                .moveTo(DRAW_POINTS[3].x + (-DRAW_POINTS_OFFSETS[3].x * (2 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (2 - i)))
                .lineTo(DRAW_POINTS[3].x + (-DRAW_POINTS_OFFSETS[3].x * (2 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (2 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[2].x + (-DRAW_POINTS_OFFSETS[0].x * (2 - i)), DRAW_POINTS[2].y + (DRAW_POINTS_OFFSETS[0].y * (2 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[2].x + (-DRAW_POINTS_OFFSETS[0].x * (2 - i)), DRAW_POINTS[2].y + (DRAW_POINTS_OFFSETS[0].y * (2 - i)))
                .lineTo(DRAW_POINTS[3].x + (-DRAW_POINTS_OFFSETS[3].x * (2 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (2 - i)))
                .endFill();

            stepContainer.addChild(tileTop);
            stepContainer.addChild(tileLeft);
            stepContainer.addChild(tileRight);

            stepContainer.x = OFFSETS[3].x * i + OFFSETS[1].x;
            stepContainer.y = OFFSETS[3].y * i + OFFSETS[1].y;

            if(this._type === "innerCorner") {
                stepContainer.zIndex = 3-i;
            }

            this._container.addChild(stepContainer);
            this._container.x = OFFSETS[2].x;
            this._container.y = OFFSETS[2].y;
        }
        
        for (let i = 0; i < 4; i++) {
            let stepContainer = new Container();

            let tileTop = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.99999),
                    matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
                })
                .moveTo(DRAW_POINTS[0].x + (DRAW_POINTS_OFFSETS[0].x * (3 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[0].y * (3 - i)))
                .lineTo(DRAW_POINTS[1].x + (DRAW_POINTS_OFFSETS[1].x * (3 - i)), DRAW_POINTS[1].y + (DRAW_POINTS_OFFSETS[1].y * (3 - i)))
                .lineTo(DRAW_POINTS[2].x + (DRAW_POINTS_OFFSETS[2].x * (3 - i)), DRAW_POINTS[2].y + (DRAW_POINTS_OFFSETS[2].y * (3 - i)))
                .lineTo(DRAW_POINTS[3].x + (DRAW_POINTS_OFFSETS[3].x * (3 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (3 - i)))
                .lineTo(DRAW_POINTS[0].x + (DRAW_POINTS_OFFSETS[0].x * (3 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[0].y * (3 - i)))
                .endFill();

            const tileLeft = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.8),
                    matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
                })
                .moveTo(DRAW_POINTS[0].x + (DRAW_POINTS_OFFSETS[0].x * (3 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[0].y * (3 - i)))
                .lineTo(DRAW_POINTS[0].x + (DRAW_POINTS_OFFSETS[0].x * (3 - i)), DRAW_POINTS[0].y + (DRAW_POINTS_OFFSETS[0].y * (3 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[3].x + (DRAW_POINTS_OFFSETS[3].x * (3 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (3 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[3].x + (DRAW_POINTS_OFFSETS[3].x * (3 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (3 - i)))
                .endFill();

            const tileRight = new Graphics()
                .beginTextureFill({
                    texture: this._texture ?? Texture.WHITE,
                    color: utils.premultiplyTint(this._color, 0.71),
                    matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
                })
                .moveTo(DRAW_POINTS[3].x + (DRAW_POINTS_OFFSETS[3].x * (3 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (3 - i)))
                .lineTo(DRAW_POINTS[3].x + (DRAW_POINTS_OFFSETS[3].x * (3 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (3 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[2].x + (DRAW_POINTS_OFFSETS[2].x * (3 - i)), DRAW_POINTS[2].y + (DRAW_POINTS_OFFSETS[2].y * (3 - i)) + this._tileThickness)
                .lineTo(DRAW_POINTS[2].x + (DRAW_POINTS_OFFSETS[2].x * (3 - i)), DRAW_POINTS[2].y + (DRAW_POINTS_OFFSETS[2].y * (3 - i)))
                .lineTo(DRAW_POINTS[3].x + (DRAW_POINTS_OFFSETS[3].x * (3 - i)), DRAW_POINTS[3].y + (DRAW_POINTS_OFFSETS[3].y * (3 - i)))
                .endFill();

            stepContainer.addChild(tileTop);
            stepContainer.addChild(tileLeft);
            stepContainer.addChild(tileRight);

            stepContainer.x = OFFSETS[0].x * i;
            stepContainer.y = OFFSETS[0].y * i;

            if(this._type === "innerCorner") {
                stepContainer.zIndex = 3 - i;
            }


            this._container.addChild(stepContainer);
            this._container.x = OFFSETS[2].x;
            this._container.y = OFFSETS[2].y;
        }


        this.addChild(this._container);

    }

}