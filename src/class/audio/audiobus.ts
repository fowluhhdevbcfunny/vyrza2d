import type { AudioObject } from "../types/audio";

export class AudioBus {
    vol:number;
    clips:AudioObject[];
    constructor() {
        this.vol = 1;
        this.clips = [];
    }

    setVolume(vol:number) {
        for (let c in this.clips) {
            this.clips[c].audio.volume = vol/100
        }
    }

    add(object:AudioObject) {
        this.clips.push(object);
    }
}
