import type { BaseState } from "../class/state/baseState";
import { getManager } from "../fowl";

export function startGame(defaultScene: BaseState) {
  getManager().switch(defaultScene);
}
