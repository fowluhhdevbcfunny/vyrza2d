import { ctx } from "../../const/ctx";
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
    ctx().fillStyle = this.color;
    ctx().font = this.font.getMerged();
    ctx().fillText(this.text, this.x, this.y + (this.font.getSize() - 10));
  }
}