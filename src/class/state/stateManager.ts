import type { State } from "./state";

export class StateManager {
  scene!: State;
  constructor() {}

  switch(scene: State) {
    this.scene = scene;
    this.scene.manager = this;
  }
}

