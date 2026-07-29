import {
  checkDataUrl,
  checkExtension,
  ExtensionType,
  LoaderParser,
  LoaderParserPriority,
  Spritesheet,
  Texture,
} from 'pixi.js';
import { Bundle } from 'scuti-bundle';
import { Buffer } from 'buffer';

const validBundleExtension: string = '.bundle';
const validBundleMIME: string = 'application/octet-stream';

export const loadBundle = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.High,
  },
  name: 'loadBundle',
  test(url: string): boolean {
    return checkDataUrl(url, validBundleMIME) || checkExtension(url, validBundleExtension);
  },
  async load<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    const buffer: ArrayBuffer = await response.arrayBuffer();
    const bundle: Bundle = new Bundle(Buffer.from(buffer));

    const src: ImageBitmap = await createImageBitmap(new Blob([bundle.get('texture')]));
    const texture = Texture.from(src);

    const data = JSON.parse(bundle.get('data').toString());
    const spritesheet = new Spritesheet(texture, data);

    await spritesheet.parse();

    return spritesheet as T;
  },
} as LoaderParser;
