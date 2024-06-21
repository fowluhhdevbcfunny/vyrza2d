import { GameObject } from "../types/object";

export class SlicedSprite extends GameObject {
  src: any;
  scale: number;
  img: HTMLImageElement;
  x: any;
  y: any;
  w: any;
  h: any;
  sx: any;
  sy: any;
  sw: any;
  sh: any;
  constructor(
    src: any,
    x: any,
    y: any,
    w: any,
    h: any,
    sx: any,
    sy: any,
    sw: any,
    sh: any,
    scale = 1
  ) {
    super(x, y, w, h);
    this.src = src;
    this.scale = scale;
    this.img = new Image();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
  }

  draw() {
    this.img.src = this.src;
    window.ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.x,
      this.y,
      this.w*this.scale,
      this.h*this.scale
    );
  }
}
