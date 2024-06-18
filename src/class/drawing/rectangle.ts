import { ctx } from "../../const/ctx";

const context = ctx();

export class RectangleShape {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  constructor(x: number, y: number, w: number, h: number, color: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
  }
}
