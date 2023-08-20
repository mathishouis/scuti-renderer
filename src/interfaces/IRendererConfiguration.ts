export interface IRendererConfiguration {
    canvas: HTMLElement;
    width: number;
    height: number;
    resources: string;
    backgroundColor?: number;
    backgroundAlpha?: number;
    resizeTo?: HTMLElement | Window;
}
