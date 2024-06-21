import { getCollision } from "../../func/collision";
import { GameObject } from "../types/object";
import { Group } from "./group";
import { Sprite } from "./sprite";

export class TileMap extends GameObject {
  data: any;
  offsetX: number;
  offsetY: number;
  tileSize: any;
  tilePaths: string[];
  constructor(data: any, tileSize: any, offsetX = 0, offsetY = 0) {
    super(offsetX, offsetY);
    this.data = data;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.tileSize = tileSize;
    this.tilePaths = [];
  }

  addTile(path: string) {
    this.tilePaths.push(path);
  }

  draw() {
    var tileGroup = new Group();
    for (let y = 0; y < this.data.length; y++) {
      const row = this.data[y];
      for (let x = 0; x < row.length; x++) {
        const tile = this.data[y][x];
        var tileImage = new Sprite(
          this.tilePaths[tile],
          this.offsetX + x * this.tileSize,
          this.offsetY + y * this.tileSize
        );
        tileGroup.add(tileImage);
      }
    }
    tileGroup.draw();
  }

  getCollision(obj1: any, tileX: number, tileY: number) {
    let tile = new GameObject(
      tileX * this.tileSize + this.offsetX,
      tileY * this.tileSize + this.offsetY,
      this.tileSize, this.tileSize
    )
    return getCollision(
      obj1,
      tile
    );
  }
}