import { Room } from './Room';
import { Rectangle, Container, RenderTexture } from 'pixi.js';
import { gsap } from 'gsap';
import { Vector2D } from '../../types/Vector';

export class RoomCamera extends Container {
  public zooming: boolean = false;
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

    // todo(): removeEventListener when destroying containers
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
      this.pivot.x -= event.movementX / (this.scale.x * devicePixelRatio);
      this.pivot.y -= event.movementY / (this.scale.y * devicePixelRatio);
    }
  };

  public screenShot({ x, y, height, width }: Vector2D & Partial<{ height: number; width: number }>) {
    const renderer = this.room.renderer.application.renderer;
    const renderTexture = RenderTexture.create({ height: renderer.height, width: renderer.width });

    renderer.render(this.room.renderer.application.stage, { renderTexture });
    const canvas = renderer.extract.canvas(renderTexture);

    // console.log(canvas.toDataURL?.('image/jpeg'));

    // blob
    /* const blob = renderer.plugins['extract']
      .image(this.room.renderer.application.stage)
      .then(async data => await data)
      .then(data => {
        console.log(data.src.replace('image/png', 'image/octet-stream'));
      }); */
  }

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

  public zoom(zoom: number, duration: number = 0.8): void {
    const { direction } = this.room.renderer.configuration.zoom!;

    this.zooming = true;

    if (direction === 'cursor') {
      const { x: x1, y: y1 } = this.toLocal(this.room.renderer.application.renderer.events.pointer.global);

      gsap.to(this.scale, {
        x: zoom,
        y: zoom,
        duration,
        // fix(): check if cursor's position relative to the window hasn't changed when cursor is moving as soon as onUpdate gets called, cuz it changes the position of the container accorcding to the last position of the cursor
        onUpdate: () => {
          const { x: x2, y: y2 } = this.toLocal(this.room.renderer.application.renderer.events.pointer.global);

          this.pivot.x += x1 - x2;
          this.pivot.y += y1 - y2;
        },
        onComplete: () => {
          this.zooming = false;
        },
      });
    } else {
      gsap.to(this.scale, {
        x: zoom,
        y: zoom,
        duration,
        onComplete: () => {
          this.zooming = false;
        },
      });
    }
  }
}
