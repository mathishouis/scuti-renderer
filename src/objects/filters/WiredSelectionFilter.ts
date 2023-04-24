import { Filter, utils } from 'pixi.js';

/** The shader vertex */
const vertex: string = `
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat3 projectionMatrix;
    varying vec2 vTextureCoord;
    void main(void)
    {
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
    }
`;

/** The shader fragment */
const fragment: string = `
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform vec3 lineColor;
    uniform vec3 backgroundColor;
    void main(void) {
        vec4 currentColor = texture2D(uSampler, vTextureCoord);
        vec3 colorLine = lineColor * currentColor.a;
        vec3 colorOverlay = backgroundColor * currentColor.a;
        if(currentColor.r == 0.0 && currentColor.g == 0.0 && currentColor.b == 0.0 && currentColor.a > 0.0) {
            gl_FragColor = vec4(colorLine.r, colorLine.g, colorLine.b, currentColor.a);
        } else if(currentColor.a > 0.0) {
            gl_FragColor = vec4(colorOverlay.r, colorOverlay.g, colorOverlay.b, currentColor.a);
        }
    }
`;

/**
 * WiredSelectionFilter class that aim to reproduce the wired selection effect.
 *
 * @class
 * @memberof Scuti
 */
export class WiredSelectionFilter extends Filter {
  /**
   * @param {number} [lineColor] - The color of the furniture border when selected.
   * @param {number} [backgroundColor] - The main color of the furniture when selected.
   **/
  constructor(lineColor: number, backgroundColor: number) {
    super(vertex, fragment);
    /** Set the colors */
    this.uniforms.lineColor = utils.hex2rgb(lineColor);
    this.uniforms.backgroundColor = utils.hex2rgb(backgroundColor);
  }
}
