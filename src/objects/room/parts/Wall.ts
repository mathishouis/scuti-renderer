import { Texture, Container, Graphics, Matrix, utils } from 'pixi.js';
import { IWallProps } from "../../../interfaces/IWallProps";
import { WallType } from "../../../types/WallType";

export class Wall extends Container {

    private _tileThickness: number;
    private _thickness: number;
    private _color: number;
    private _texture?: Texture;
    private _container?: Container;
    private _door?: boolean;
    private _maxZ: number;
    private _roomZ: number;
    private _type: WallType;

    constructor(props: IWallProps) {
        super();

        this._tileThickness = props.tileThickness;
        this._thickness = props.thickness;
        this._color = props.color;
        this._texture = props.texture;
        this._door = props.door;
        this._type = props.type;
        this._roomZ = props.roomZ;
        this._maxZ = props.maxZ;

        this._draw();
    }

    private _draw(): void {

        this._container?.destroy();
        this._container = new Container();

        let DRAW_POINTS: { x: number; y: number; }[] = [];

        switch (this._type) {
            case "left":
                if(this._door) {
                    DRAW_POINTS = [
                        {
                            x: - this._thickness + 32,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 107
                        },
                        {
                            x: - this._thickness + 64,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 123
                        },
                        {
                            x: - this._thickness + 64 + this._thickness,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 123 + this._thickness / 2
                        },
                        {
                            x: - this._thickness + 32 + this._thickness,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 107 + this._thickness / 2
                        },
                    ];
                } else {
                    DRAW_POINTS = [
                        {
                            x: - this._thickness,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 123
                        },
                        {
                            x: - this._thickness + 32,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 139
                        },
                        {
                            x: - this._thickness + 32 + this._thickness,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 139 + this._thickness / 2
                        },
                        {
                            x: - this._thickness + this._thickness,
                            y: - this._thickness / 2 + this._roomZ * 32 - this._maxZ * 32 - 123 + this._thickness / 2
                        },
                    ];
                }
                break;
            case "right":
                DRAW_POINTS = [
                    {
                        x: 32,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 123
                    },
                    {
                        x: 32 + this._thickness,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 123 - this._thickness / 2
                    },
                    {
                        x: 64 + this._thickness,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 107 - this._thickness / 2
                    },
                    {
                        x: 64,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 107
                    },
                ];
                break;
            case "corner":
                DRAW_POINTS = [
                    {
                        x: 32 - this._thickness,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 123 - this._thickness / 2
                    },
                    {
                        x: 32,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 123 - 2 * (this._thickness / 2)
                    },
                    {
                        x: 32 + this._thickness,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 123 - this._thickness / 2
                    },
                    {
                        x: 32,
                        y: - 16 + this._roomZ * 32 - this._maxZ * 32 - 123
                    },
                ];
                break;
        }

        let tileTop = new Graphics()
            .beginTextureFill({
                texture: this._texture ?? Texture.WHITE,
                color: utils.premultiplyTint(this._color, 0.61),
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
                texture: this._type === "right" ? (this._texture ?? Texture.WHITE) : Texture.WHITE,
                color: utils.premultiplyTint(this._color, 0.99999),
                matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
            })
            .moveTo(DRAW_POINTS[0].x, DRAW_POINTS[0].y)
            .lineTo(DRAW_POINTS[0].x, DRAW_POINTS[0].y + 123 + this._tileThickness + this._maxZ * 32 - this._roomZ * 32)
            .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y + 123 + this._tileThickness + this._maxZ * 32 - this._roomZ * 32)
            .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y)
            .endFill();

        const tileRight = new Graphics()
            .beginTextureFill({
                texture: this._type === "left" ? (this._texture ?? Texture.WHITE) : Texture.WHITE,
                color: utils.premultiplyTint(this._color, 0.8),
                matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
            })
            .moveTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y);

        if(this._door) {
            tileRight
                .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y + 37 + this._tileThickness + this._maxZ * 32 - this._roomZ * 32)
                .lineTo(DRAW_POINTS[2].x, DRAW_POINTS[2].y + 37 + this._tileThickness + this._maxZ * 32 - this._roomZ * 32);
        } else {
            tileRight
                .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y + 123 + this._tileThickness + this._maxZ * 32 - this._roomZ * 32)
                .lineTo(DRAW_POINTS[2].x, DRAW_POINTS[2].y + 123 + this._tileThickness + this._maxZ * 32 - this._roomZ * 32);
        }
        tileRight
            .lineTo(DRAW_POINTS[2].x, DRAW_POINTS[2].y)
            .lineTo(DRAW_POINTS[3].x, DRAW_POINTS[3].y)
            .endFill();

        this._container.addChild(tileTop);
        this._container.addChild(tileLeft);
        this._container.addChild(tileRight);

        this.addChild(this._container);

    }

}