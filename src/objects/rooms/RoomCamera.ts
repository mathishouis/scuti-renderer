import { Room } from './Room';
import { Container, Matrix, Point, RenderTexture } from 'pixi.js';
import { gsap } from 'gsap';

export class RoomCamera {
  public container: Container | undefined = new Container();

  public zooming: boolean = false;
  public dragging: boolean = false;
  public hasDragged: boolean = false;

  private _lastClickTime: number = 0;
  private _clickThreshold: number = 100;

  constructor(public room: Room) {
    this._initListeners();
    this.container!.addChild(room.visualization!.container);
  }

  // todo(): removeEventListener when destroying containers
  private _initListeners(): void {
    const events = this.room.renderer.application.renderer.events.domElement;

    if (this.room.renderer.configuration.zoom?.wheel) {
      events.addEventListener('wheel', this._onZoom, { passive: true });
    }

    if (this.room.dragging) {
      events.addEventListener('pointerdown', this._dragStart);
      events.addEventListener('pointerup', this._dragEnd);
      events.addEventListener('pointermove', this._dragMove);
    }
  }

  private unBindListeners(): void {
    const events = this.room.renderer.application.renderer.events.domElement;

    if (this.room.renderer.configuration.zoom?.wheel) {
      events.removeEventListener('wheel', this._onZoom);
    }

    if (this.room.dragging) {
      events.removeEventListener('pointerdown', this._dragStart);
      events.removeEventListener('pointerup', this._dragEnd);
      events.removeEventListener('pointermove', this._dragMove);
    }
  }

  private _onZoom = (event: WheelEvent): void => {
    const zoom = this.room.renderer.configuration.zoom!;
    const { step, level, min, max } = zoom;

    zoom.level = Math.max(min!, Math.min(max!, level! + (event.deltaY > 0 ? -step! : step!)));

    if (level === zoom.level && (level === min || level === max)) return;

    this.zoom(zoom.level!, zoom.duration!);
  };

  private _dragStart = (): void => {
    if (Date.now() - this._lastClickTime > this._clickThreshold) {
      this.dragging = true;
    }
  };

  private _dragEnd = (): void => {
    this.hasDragged = false;
    this.dragging = false;
    this._lastClickTime = Date.now();

    if (this.isOutOfBounds() && this.room.centerCamera) this.centerCamera();
  };

  private _dragMove = (event: PointerEvent): void => {
    if (this.dragging) {
      this.hasDragged = true;
      this.container!.pivot.x -= event.movementX / (this.container!.scale.x * devicePixelRatio);
      this.container!.pivot.y -= event.movementY / (this.container!.scale.y * devicePixelRatio);
    }
  };

  public isOutOfBounds(): boolean {
    const { x, y } = this.container!.pivot;
    const { width, height } = this.room.renderer.application.view;
    const { x: scaleX, y: scaleY } = { x: this.container!.scale.x * devicePixelRatio, y: this.container!.scale.y * devicePixelRatio };
    const { width: scaledWidth, height: scaledHeight } = { width: width / scaleX / 2, height: height / scaleY / 2 };

    return (
      x - scaledWidth > this.container!.width / scaleX ||
      x + scaledWidth < 0 ||
      y - scaledHeight > this.container!.height / scaleY ||
      y + scaledHeight < 0
    );
  }

  public centerCamera(duration: number = 0.6): void {
    gsap.to(this.container!, {
      x: Math.floor(this.room.renderer.application.view.width / 2),
      y: Math.floor(this.room.renderer.application.view.height / 2),
      duration,
      ease: 'expo.inOut',
    });
    gsap.to(this.container!.pivot, {
      x: Math.floor(this.container!.width / this.container!.scale.x / 2),
      y: Math.floor(this.container!.height / this.container!.scale.y / 2),
      duration,
      ease: 'expo.inOut',
    });
  }

  public zoom(zoom: number, duration: number = 0.8): void {
    const options: gsap.TweenVars = {
      x: zoom,
      y: zoom,
      duration,
      onStart: () => {
        this.zooming = true;
      },
      onComplete: () => {
        if (this.isOutOfBounds() && this.room.centerCamera) this.centerCamera();
        this.zooming = false;
      },
    };

    if (this.room.renderer.configuration.zoom?.direction === 'cursor') {
      const pointer = Object.assign({}, this.room.renderer.application.renderer.events.pointer.global);
      const { x: x1, y: y1 } = this.container!.toLocal(pointer);

      options.onUpdate = () => {
        const { x: x2, y: y2 } = this.container!.toLocal(pointer);
        this.container!.pivot.x += x1 - x2;
        this.container!.pivot.y += y1 - y2;
      };
    }

    gsap.to(this.container!.scale, options);
  }

  public async screenshot(target: HTMLElement): Promise<string> {
    const renderer = this.room.renderer.application.renderer;
    const frame: DOMRect = target.getBoundingClientRect();
    const { left, top }: DOMRect = this.room.renderer.canvas.getBoundingClientRect();
    const rectPosition: Point = new Point(frame.left - left, frame.top - top);
    const renderTexture: RenderTexture = RenderTexture.create({ height: frame.height, width: frame.width });
    const transform: Matrix = new Matrix().translate(-rectPosition.x, -rectPosition.y);

    renderTexture.baseTexture.clear.setValue(this.room.renderer.configuration.backgroundColor);
    renderTexture.baseTexture.clear.setAlpha(this.room.renderer.configuration.backgroundAlpha);
    renderer.render(this.room.renderer.application.stage, { renderTexture, transform });

    return await renderer.extract.base64(renderTexture);
  }

  public destroy(): void {
    if (this.container != undefined) {
      this.container.destroy();
      this.unBindListeners();
    }
  }
}
