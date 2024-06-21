import { GameObject } from "../types/object";

export class Sprite extends GameObject {
  src: string;
  scale: number = 1;
  img: HTMLImageElement;
  x: any;
  y: any;
  w: number = 0;
  h: number = 0;
  constructor(src: string, x: any, y: any, scale = 1) {
    super(x, y);
    this.src = src;
    this.scale = scale;
    this.img = new Image();
    this.x = x;
    this.y = y;
  }

  draw() {
    this.img.src = this.src;
    this.w = this.img.width * this.scale;
    this.h = this.img.height * this.scale;
    window.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
