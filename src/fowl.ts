// Fowl2D
import { getManager } from "./func/init";
import { Music } from "./class/audio/music";
import { Sound } from "./class/audio/sound";
import { Font } from "./class/drawing/font";
import { Group } from "./class/drawing/group";
import { OutlinedRectangleShape } from "./class/drawing/outlinedRectangle";
import { OutlinedTextLabel } from "./class/drawing/outlineText";
import { RectangleShape } from "./class/drawing/rectangle";
import { SlicedSprite } from "./class/drawing/slicedSprite";
import { Sprite } from "./class/drawing/sprite";
import { TextLabel } from "./class/drawing/text";
import { TileMap } from "./class/drawing/tileMap";
import { State } from "./class/state/state";
import { StateManager } from "./class/state/stateManager";
import { canvas as getCanvas } from "./data/canvas";
import { CollisionSides } from "./data/collisionSides";
import { colors } from "./data/colors";
import { type Controller, controller } from "./data/controller";
import { getCollision, getCollisionSide } from "./func/collision";
import { getKeys, getMouseKeys } from "./func/getKeys";
import { startGame } from "./func/startGame";
import { Camera } from "./class/drawing/camera";
import { GameObject } from "./class/types/object";
import { Event } from "./class/types/event";
import { AudioBus } from "./class/audio/audiobus";
import { AudioObject } from "./class/types/audio";
import { Basic } from "./class/types/basic";

declare global {
  interface Window {
    ctx: CanvasRenderingContext2D;
    controller: Controller;
    manager: StateManager;
  }
}

// Exports
export {
  Music,
  Sound,
  AudioBus,
  AudioObject,
  Basic,
  GameObject,
  Camera,
  Font,
  Group,
  OutlinedRectangleShape,
  OutlinedTextLabel,
  RectangleShape,
  SlicedSprite,
  Sprite,
  TextLabel,
  TileMap,
  Event,
  State,
  StateManager,
  getCanvas,
  getManager,
  CollisionSides,
  colors,
  type Controller,
  controller,
  getCollision,
  getCollisionSide,
  getKeys,
  getMouseKeys,
  startGame,
};
