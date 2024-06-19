import type { BaseState } from "../class/state/baseState";
import { initEngine } from "./init";

export function startGame(defaultScene: BaseState) {
  initEngine(defaultScene);
}
