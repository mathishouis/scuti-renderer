import { Room } from './Room';
import { Matrix, Point, RenderTexture } from 'pixi.js';
import { gsap } from 'gsap';

export class RoomCamera {
  public zooming: boolean = false;
  public dragging: boolean = false;
  public hasDragged: boolean = false;

  private _lastClickTime: number = 0;
  private _clickThreshold: number = 100;

  constructor(public room: Room) {
    this._initListeners();
  }

  private _initListeners() {
    const events = this.room.renderer.application.renderer.events.domElement;

    if (this.room.renderer.configuration.zoom.wheel) {
      events.addEventListener('wheel', this._onZoom, { passive: true });
    }

    window.addEventListener('resize', () => {
      // refactor(): ugly workaround
      setTimeout(() => {
        this._positionate();
        this.centerCamera(0);
      }, 10);
    });

    if (this.room.dragging) {
      events.addEventListener('pointerdown', this._dragStart);
      events.addEventListener('pointerup', this._dragEnd);
      events.addEventListener('pointermove', this._dragMove);
    }
  }

  private unBindListeners(): void {
    const events = this.room.renderer.application.renderer.events.domElement;

    if (this.room.renderer.configuration.zoom.wheel) {
      events.removeEventListener('wheel', this._onZoom);
    }

    if (this.room.dragging) {
      events.removeEventListener('pointerdown', this._dragStart);
      events.removeEventListener('pointerup', this._dragEnd);
      events.removeEventListener('pointermove', this._dragMove);
    }
  }

  private _onZoom = (event: WheelEvent): void => {
    if (event.ctrlKey) return event.stopPropagation();

    const zoom = this.room.renderer.configuration.zoom;
    const { step, level, min, max } = zoom;

    zoom.level = Math.max(min, Math.min(max, level + (event.deltaY > 0 ? -step : step)));

    if (level === zoom.level && (level === min || level === max)) return;

    this.zoom(zoom.level, zoom.duration);
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

    if (this.isOutOfBounds() && this.room.renderer.configuration.camera.center) this.centerCamera();
  };

  private _dragMove = (event: PointerEvent): void => {
    if (this.dragging) {
      const container = this.room.visualization!.container;

      this.hasDragged = true;

      container.pivot.x -= event.movementX / container.scale.x;
      container.pivot.y -= event.movementY / container.scale.y;
    }
  };

  public _positionate = (): void => {
    const container = this.room.visualization!.container;
    const camera = this.room.renderer.configuration.camera;
    const { width: screenWidth, height: screenHeight } = this.room.renderer.application.view;
    const resolution = this.room.renderer.application.renderer.resolution;
    const bounds = container.getBounds();

    container.pivot.x = bounds.right - container.width / 2 - camera.position.x;
    container.pivot.y = bounds.bottom - container.height / 2 - camera.position.y;
    container.x = screenWidth / resolution / 2;
    container.y = screenHeight / resolution / 2;
  };

  public isOutOfBounds = (): boolean => {
    const container = this.room.visualization!.container;
    const bounds = container.getBounds();
    const { width: screenWidth, height: screenHeight } = this.room.renderer.application.view;

    return (
      bounds.right < 0 ||
      bounds.left > screenWidth / container.scale.x ||
      bounds.top > screenHeight / container.scale.y ||
      bounds.bottom < 0
    );
  };

  public centerCamera(duration: number = 0.6): void {
    const container = this.room.visualization!.container;

    gsap.to(container.pivot, {
      x: Math.floor(container._localBounds.maxX - container.width / container.scale.x / 2),
      y: Math.floor(container._localBounds.maxY - container.height / container.scale.y / 2),
      duration,
      ease: 'expo.inOut',
    });
  }

  public zoom(zoom: number, duration: number = this.room.renderer.configuration.zoom.duration): void {
    const options: gsap.TweenVars = {
      x: zoom,
      y: zoom,
      duration,
      onStart: () => {
        this.zooming = true;
      },
      onComplete: () => {
        if (this.isOutOfBounds() && this.room.renderer.configuration.camera.center) this.centerCamera();
        this.zooming = false;
      },
    };

    const container = this.room.visualization!.container;

    if (this.room.renderer.configuration.zoom.direction === 'cursor') {
      const pointer = Object.assign({}, this.room.renderer.application.renderer.events.pointer.global);
      const { x: x1, y: y1 } = container.toLocal(pointer);

      options.onUpdate = () => {
        const { x: x2, y: y2 } = container.toLocal(pointer);
        container.pivot.x += x1 - x2;
        container.pivot.y += y1 - y2;
      };
    }

    gsap.to(container.scale, options);
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
    this.unBindListeners();
  }
}
