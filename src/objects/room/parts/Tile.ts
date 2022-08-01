import {ITileProps} from "../../../interfaces/ITileProps";
import { Texture, Container, Graphics, Matrix, utils } from 'pixi.js';
import {ITileCursorProps} from "../../../interfaces/ITileCursorProps";

export class Tile extends Container {

    private _thickness: number;
    private _color: number;
    private _texture?: Texture;
    private _container?: Container;

    constructor(props: ITileProps,
                private onClick: (x: number, y: number, z: number) => void,
                private onOver: (x: number, y: number, z: number) => void,
                private onOut: (x: number, y: number, z: number) => void) {
        super();

        this._thickness = props.thickness;
        this._color = props.color;
        this._texture = props.texture;

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
            .lineTo(0, this._thickness)
            .lineTo(32, 16 + this._thickness)
            .lineTo(32, 16)
            .endFill();

        const tileRight = new Graphics()
            .beginTextureFill({
                texture: this._texture ?? Texture.WHITE,
                color: utils.premultiplyTint(this._color, 0.71),
                matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
            })
            .moveTo(32, 16)
            .lineTo(32, 16 + this._thickness)
            .lineTo(64, this._thickness)
            .lineTo(64, 0)
            .lineTo(32, 16)
            .endFill();

        this._container.addChild(tileTop);
        this._container.addChild(tileLeft);
        this._container.addChild(tileRight);

        this.interactive = true;

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