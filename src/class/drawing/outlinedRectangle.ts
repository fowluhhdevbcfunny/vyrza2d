import { GameObject } from "../types/object";

export class OutlinedRectangleShape extends GameObject {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  outline_color: string;
  outline_width: number;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    outline_color: string,
    outline_width: number
  ) {
    super(x, y, w, h);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.outline_color = outline_color;
    this.outline_width = outline_width;
  }

  draw() {
    window.ctx.fillStyle = this.outline_color;
    window.ctx.fillRect(
      this.x,
      this.y,
      this.w + this.outline_width,
      this.h + this.outline_width
    );
    window.ctx.fillStyle = this.color;
    window.ctx.fillRect(
      this.x + this.outline_width,
      this.y + this.outline_width,
      this.w - this.outline_width,
      this.h - this.outline_width
    );
  }
}
