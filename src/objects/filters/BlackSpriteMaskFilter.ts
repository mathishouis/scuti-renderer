import { Sprite, SpriteMaskFilter } from 'pixi.js';

const vertex = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}`;

const fragment = `
    varying vec2 vMaskCoord;
    varying vec2 vTextureCoord;
    
    uniform sampler2D uSampler;
    uniform sampler2D mask;
    uniform float alpha;
    uniform float npmAlpha;
    uniform vec4 maskClamp;
    
    void main(void)
    {
        float clip = step(3.5,
            step(maskClamp.x, vMaskCoord.x) +
            step(maskClamp.y, vMaskCoord.y) +
            step(vMaskCoord.x, maskClamp.z) +
            step(vMaskCoord.y, maskClamp.w));
    
        vec4 original = texture2D(uSampler, vTextureCoord);
        vec4 masky = texture2D(mask, vMaskCoord);
        float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);
    
        original *= (alphaMul * masky.a * alpha * clip);
    
        gl_FragColor = original;
    }
`;

export class BlackSpriteMaskFilter extends SpriteMaskFilter {
  constructor(maskSprite: Sprite) {
    super(vertex, fragment);

    this.maskSprite = maskSprite;
  }
}
