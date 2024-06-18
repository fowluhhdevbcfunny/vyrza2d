import { ctx } from "../../const/ctx";
const context = ctx();

export class OutlinedRectangleShape {
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
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.outline_color = outline_color;
    this.outline_width = outline_width;
  }

  draw() {
    context.fillStyle = this.outline_color;
    context.fillRect(
      this.x,
      this.y,
      this.w + this.outline_width,
      this.h + this.outline_width
    );
    context.fillStyle = this.color;
    context.fillRect(
      this.x + this.outline_width,
      this.y + this.outline_width,
      this.w - this.outline_width,
      this.h - this.outline_width
    );
  }
}
