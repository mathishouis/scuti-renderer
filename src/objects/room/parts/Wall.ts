import { Texture, Container, Graphics, Matrix, utils } from 'pixi.js';
import { IWallProps } from "../../../interfaces/IWallProps";

export class Wall extends Container {

    private _tileThickness: number;
    private _color: number;
    private _texture?: Texture;
    private _container?: Container;
    private _door?: boolean;

    constructor(props: IWallProps) {
        super();

        this._tileThickness = props.thickness;
        this._color = props.color;
        this._texture = props.texture;
        this._door = props.door;

        this._draw();
    }

    private _draw(): void {

        this._container?.destroy();
        this._container = new Container();

        let tileTop = new Graphics()
            .beginTextureFill({
                texture: this._texture ?? Texture.WHITE,
                color: utils.premultiplyTint(this._color, 0.99999),
                matrix: new Matrix(1, 0.5, 1, -0.5, 0, 0)
            })
            .moveTo(0, 0)
            .lineTo(32, -16)
            .lineTo(64, 0)
            .lineTo(32, 16)
            .lineTo(0, 0)
            .endFill();

        const tileLeft = new Graphics()
            .beginTextureFill({
                texture: this._texture ?? Texture.WHITE,
                color: utils.premultiplyTint(this._color, 0.8),
                matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
            })
            .moveTo(0, 0)
            .lineTo(0, this._tileThickness)
            .lineTo(32, 16 + this._tileThickness)
            .lineTo(32, 16)
            .endFill();

        const tileRight = new Graphics()
            .beginTextureFill({
                texture: this._texture ?? Texture.WHITE,
                color: utils.premultiplyTint(this._color, 0.71),
                matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
            })
            .moveTo(32, 16)
            .lineTo(32, 16 + this._tileThickness)
            .lineTo(64, this._tileThickness)
            .lineTo(64, 0)
            .lineTo(32, 16)
            .endFill();

        this._container.addChild(tileTop);
        this._container.addChild(tileLeft);
        this._container.addChild(tileRight);

        this.addChild(this._container);

    }

}