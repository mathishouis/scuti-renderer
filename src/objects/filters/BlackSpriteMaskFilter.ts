import { Filter, GlProgram } from 'pixi.js';

const vertex = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vTextureCoord;
uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

void main(void) {
  vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
  position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
  position.y = position.y * (2.0 / uOutputTexture.y) - 1.0;
  gl_Position = vec4(position, 0.0, 1.0);
  vTextureCoord = aPosition * (uOutputFrame.zw * uInputSize.zw);
}`;

const fragment = `#version 300 es
precision mediump float;
in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;

void main(void) {
  finalColor = texture(uTexture, vTextureCoord);
}`;

export class BlackSpriteMaskFilter extends Filter {
  constructor(maskSprite: any) {
    super({
      glProgram: GlProgram.from({ vertex, fragment, name: 'black-sprite-mask-filter' }),
    });
  }
}
