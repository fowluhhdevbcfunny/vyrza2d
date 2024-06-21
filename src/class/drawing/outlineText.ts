import { GameObject } from "../types/object";
import type { Font } from "./font";

export class OutlinedTextLabel extends GameObject {
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
    super(x, y);
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.text = text;
    this.outline_color = outline_color;
    this.outline_width = outline_width;
  }

  draw() {
    window.ctx.fillStyle = this.color;
    window.ctx.font = this.font.getMerged();
    window.ctx.strokeStyle = this.outline_color;
    window.ctx.lineWidth = this.outline_width * 2;
    window.ctx.strokeText(
      this.text,
      this.x,
      this.y + (this.font.getSize() - 10)
    );
    window.ctx.fillText(this.text, this.x, this.y + (this.font.getSize() - 10));
  }
}
