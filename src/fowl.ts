// FowlJS
import { Music } from "./class/audio/music";
import { Sound } from "./class/audio/sound";
import { Font } from "./class/drawing/font";
import { Group } from "./class/drawing/group";
import { LineShape } from "./class/drawing/line";
import { OutlinedRectangleShape } from "./class/drawing/outlinedRectangle";
import { OutlinedTextLabel } from "./class/drawing/outlineText";
import { RectangleShape } from "./class/drawing/rectangle";
import { SlicedSprite } from "./class/drawing/slicedSprite";
import { Sprite } from "./class/drawing/sprite";
import { TextLabel } from "./class/drawing/text";
import { TileMap } from "./class/drawing/tileMap";
import { Point } from "./class/position/point";
import { Rect } from "./class/position/rect";
import { BaseState } from "./class/state/baseState";
import { StateManager } from "./class/state/stateManager";
import { canvas as getCanvas } from "./const/canvas";
import { CollisionSides } from "./const/collisionSides";
import { colors } from "./const/colors";
import { type Controller, controller } from "./const/controller";
import { ctx as getContext } from "./const/ctx";
import { getCollision, getCollisionSide } from "./func/collision";
import { getKeys } from "./func/getKeys";
import { startGame } from "./func/startGame";
import { type BaseObject, type BaseObjectPos } from "./type/object";

// Declare canvas and context for later
let canvas = document.querySelector("#app") as HTMLCanvasElement;
let ctx = canvas!.getContext("2d")!;

declare global {
  interface Window {
    ctx: CanvasRenderingContext2D;
    controller: Controller;
  }
}

window.ctx = ctx;

let manager = new StateManager();

export function getManager() {
  return manager;
}

// Exports
export {
  Music,
  Sound,
  Font,
  Group,
  LineShape,
  OutlinedRectangleShape,
  OutlinedTextLabel,
  RectangleShape,
  SlicedSprite,
  Sprite,
  TextLabel,
  TileMap,
  Point,
  Rect,
  BaseState,
  StateManager,
  getCanvas,
  CollisionSides,
  colors,
  type Controller,
  controller,
  getContext,
  getCollision,
  getCollisionSide,
  getKeys,
  startGame,
  type BaseObject,
  type BaseObjectPos,
};

// Game loop
let now;
let then = performance.now();
let delta;

function gameLoop() {
  let interval = 1000 / 60;

  now = performance.now();
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);

    manager.scene.preUpdate(delta);
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
