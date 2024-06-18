import type { BaseState } from "../class/state/baseState";
import { getManager } from "../fowl";
import { initEngine } from "./init";

export function startGame(defaultScene: BaseState) {
  initEngine(defaultScene);
}
