import { GameObject } from "../types/object";

export class RectangleShape extends GameObject {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  constructor(x: number, y: number, w: number, h: number, color: string) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    window.ctx.fillStyle = this.color;
    window.ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
