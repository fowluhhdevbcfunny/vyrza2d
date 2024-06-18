import { ctx } from "../../const/ctx";
import type { Point } from "../position/point";

const context = ctx();

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
    context.beginPath();
    context.moveTo(this.point1.x, this.point1.y);
    context.lineTo(this.point2.x, this.point2.y);
    context.lineWidth = this.width;
    context.strokeStyle = this.color;
    context.stroke();
  }
}
