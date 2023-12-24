import { Room } from './Room';
import { Container } from 'pixi.js';
import { gsap } from 'gsap';

export class RoomCamera extends Container {
  public dragging: boolean = false;
  public hasDragged: boolean = false;
  public zoom: number = 1;

  private _lastClickTime: number = 0;
  private _clickThreshold: number = 75;
  private _minZoom: number = 0.5;
  private _maxZoom: number = 3;

  constructor(public room: Room) {
    super();

    this._initializeListeners();

    this.addChild(room.visualization.container);
  }

  private _initializeListeners(): void {
    if (this.room.configuration.zoom) {
      this.room.renderer.canvas.addEventListener('wheel', this._onZoom, { passive: true });
    }

    if (this.room.configuration.dragging) {
      this.room.renderer.application.renderer.events.domElement.addEventListener('pointerdown', this._dragStart);
      this.room.renderer.application.renderer.events.domElement.addEventListener('pointerup', this._dragEnd);
      this.room.renderer.application.renderer.events.domElement.addEventListener('pointermove', (event: PointerEvent) =>
        this._dragMove(event.movementX, event.movementY),
      );
    }
  }

  private _onZoom = ({ deltaY }: WheelEvent): void => {
    this.zoom += deltaY > 0 ? -0.5 : 0.5;
    this.zoom = Math.max(this._minZoom, Math.min(this._maxZoom, this.zoom));

    this.update(this.zoom, 0.5);
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

  private _dragMove = (x: number, y: number): void => {
    if (this.dragging) {
      this.hasDragged = true;
      this.pivot.x = Math.floor(this.pivot.x - x / this.scale.x);
      this.pivot.y = Math.floor(this.pivot.y - y / this.scale.y);
    }
  };

  public isOutOfBounds(): boolean {
    const { x, y } = this.pivot;
    const { width, height } = this.room.renderer.application.view;
    if (x - width / 2 > this.width || x + width / 2 < 0 || y - height / 2 > this.height || y + height / 2 < 0) return true;
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
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2),
      duration,
      ease: 'easeOut',
    });
  }

  public update(zoom: number, duration: number = 0.8) {
    gsap.to(this.scale, {
      x: zoom,
      y: zoom,
      duration,
    });
  }
}
