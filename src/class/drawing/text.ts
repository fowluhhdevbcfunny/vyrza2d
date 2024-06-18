import type { Font } from "./font";

export class TextLabel {
  x: number;
  y: number;
  font: Font;
  color: string;
  text: string;
  constructor(text: string, x: number, y: number, color: string, font: Font) {
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.text = text;
  }

  draw() {
    window.ctx.fillStyle = this.color;
    window.ctx.font = this.font.getMerged();
    window.ctx.fillText(this.text, this.x, this.y + (this.font.getSize() - 10));
  }
}
