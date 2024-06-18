import { ctx } from "../../const/ctx";
import type { Font } from "./font";

const context = ctx();

export class OutlinedTextLabel {
  x: number;
  y: number;
  font: Font;
  color: string;
  text: string;
  outline_color: string;
  outline_width: number;
  constructor(
    text: string,
    x: number,
    y: number,
    color: string,
    outline_color: string,
    outline_width: number,
    font: Font
  ) {
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.text = text;
    this.outline_color = outline_color;
    this.outline_width = outline_width;
  }

  draw() {
    context.fillStyle = this.color;
    context.font = this.font.getMerged();
    context.strokeStyle = this.outline_color;
    context.lineWidth = this.outline_width * 2;
    context.strokeText(this.text, this.x, this.y + (this.font.getSize() - 10));
    context.fillText(this.text, this.x, this.y + (this.font.getSize() - 10));
  }
}
