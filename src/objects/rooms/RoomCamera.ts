import { Room } from './Room';
import { Container } from 'pixi.js';
import { gsap } from 'gsap';

export class RoomCamera extends Container {
  public dragging: boolean = false;
  public hasDragged: boolean = false;

  private _lastClickTime: number = 0;
  private _clickThreshold: number = 100;

  constructor(public room: Room) {
    super();

    this._initializeListeners();

    this.addChild(room.visualization.container);
  }

  private _initializeListeners(): void {
    const zoomType = this.room.renderer.configuration.zoom?.type;

    if (zoomType === 'wheel' || zoomType === 'both') {
      this.room.renderer.canvas.addEventListener('wheel', this._onZoom, { passive: true });
    }

    if (zoomType === 'keydown' || zoomType === 'both') {
      window.addEventListener('keypress', this._onZoom, { passive: true });
    }

    if (this.room.configuration.dragging) {
      this.room.renderer.application.renderer.events.domElement.addEventListener('pointerdown', this._dragStart);
      this.room.renderer.application.renderer.events.domElement.addEventListener('pointerup', this._dragEnd);
      this.room.renderer.application.renderer.events.domElement.addEventListener('pointermove', this._dragMove);
    }
  }

  private _onZoom = (event: WheelEvent | KeyboardEvent): void => {
    const zoom = this.room.renderer.configuration.zoom!;
    const { step, level, min, max, duration } = zoom;

    if (event instanceof KeyboardEvent) {
      if (event.key === '+' || event.key === '-') {
        zoom.level = Math.max(min!, Math.min(max!, level! + (event.key === '+' ? step! : -step!)));
      }
    } else if (event instanceof WheelEvent) {
      zoom.level = Math.max(min!, Math.min(max!, level! + (event.deltaY > 0 ? -step! : step!)));
    }

    this.zoom(zoom.level!, duration!);
  };

  private _dragStart = (): void => {
    const currentTime = Date.now();
    if (currentTime - this._lastClickTime > this._clickThreshold) {
      this.dragging = true;
    }
  };

  private _dragEnd = (): void => {
    this.hasDragged = false;
    this.dragging = false;
    this._lastClickTime = Date.now();

    if (this.isOutOfBounds() && this.room.configuration.centerCamera) this.centerCamera();
  };

  private _dragMove = (event: PointerEvent): void => {
    if (this.dragging) {
      this.hasDragged = true;
      this.pivot.x -= event.movementX / (this.scale.x * window.devicePixelRatio);
      this.pivot.y -= event.movementY / (this.scale.y * window.devicePixelRatio);
    }
  };

  public isOutOfBounds(): boolean {
    const { x, y } = this.pivot;
    const { width, height } = this.room.renderer.application.view;
    const scaledWidth = (width / this.scale.x / 2) * this.scale.x;
    const scaledHeight = (height / this.scale.y / 2) * this.scale.y;

    if (
      x - scaledWidth > this.width / this.scale.x ||
      x + scaledWidth < 0 ||
      y - scaledHeight > this.height / this.scale.y ||
      y + scaledHeight < 0
    )
      return true;
    else return false;
  }

  public centerCamera(duration: number = 0.8): void {
    gsap.to(this, {
      x: Math.floor(this.room.renderer.application.view.width / 2),
      y: Math.floor(this.room.renderer.application.view.height / 2),
      duration,
      ease: 'easeOut',
    });
    gsap.to(this.pivot, {
      x: Math.floor(this.width / this.scale.x / 2),
      y: Math.floor(this.height / this.scale.y / 2),
      duration,
      ease: 'easeOut',
    });
  }

  public zoom(zoom: number, duration: number = 0.8) {
    gsap.to(this.scale, {
      x: zoom,
      y: zoom,
      duration,
    });
  }
}
