// base class for a game object

import { Basic } from "./basic";

export class GameObject extends Basic {
    w:number;
    h:number;

    visible:boolean = true;
    
    constructor(x:number = 0, y:number = 0, w:number = 0, h:number = 0) {
        super(x, y);

        this.x = x;
        this.y = y;

        this.w = w;
        this.h = h;
    }

    canDraw() {
        if (this.exists) {
            if (this.visible) {
                return true;
            }
        }
    }
    
    draw() {}
}

