import { checkDataUrl, checkExtension, ExtensionType, LoaderParser, LoaderParserPriority, settings } from 'pixi.js';

const validBundleExtension: string = '.data';
const validBundleMIME: string = 'application/json';

export const loadData = {
  extension: {
    type: ExtensionType.LoadParser,
    priority: LoaderParserPriority.Low,
  },
  name: 'loadData',
  test(url: string): boolean {
    return checkDataUrl(url, validBundleMIME) || checkExtension(url, validBundleExtension);
  },
  async load<T>(url: string): Promise<T> {
    const response: Response = await settings.ADAPTER.fetch(url);
    const json = await response.json();

    return json as T;
  },
} as LoaderParser;
