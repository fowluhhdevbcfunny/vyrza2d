import { StateManager } from "../class/state/stateManager";
import type { State } from "../class/state/state";

export function initEngine(baseScene: State) {
  let canvas = document.querySelector("#app") as HTMLCanvasElement;
  let ctx = canvas!.getContext("2d")!;
  window.ctx = ctx;

  let manager = new StateManager();
  window.manager = manager;
  manager.switch(baseScene);

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

      if (manager.scene === undefined) alert("BAD");
      else manager.scene.preUpdate(delta);
    }

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

export function getManager() {
  return window.manager;
}
