import type { Point } from "../position/point";

export class LineShape {
  point1: Point;
  point2: Point;
  width: number;
  color: string;
  constructor(point1: Point, point2: Point, width: number, color: string) {
    this.point1 = point1;
    this.point2 = point2;
    this.width = width;
    this.color = color;
  }

  draw() {
    window.ctx.beginPath();
    window.ctx.moveTo(this.point1.x, this.point1.y);
    window.ctx.lineTo(this.point2.x, this.point2.y);
    window.ctx.lineWidth = this.width;
    window.ctx.strokeStyle = this.color;
    window.ctx.stroke();
  }
}
