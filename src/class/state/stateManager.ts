import type { BaseState } from "./baseState";

export class StateManager {
  scene!: BaseState;
  constructor() {}

  switch(scene: BaseState) {
    this.scene = scene;
    this.scene.manager = this;
  }
}
