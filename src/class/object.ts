// base class for a game object

export class GameObject {
    x:number;
    y:number;
    w:number;
    h:number;

    visible:boolean = true;
    exists:boolean = true;
    
    constructor(x:number = 0, y:number = 0, w:number = 0, h:number = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    draw() {}

    kill() {
        this.exists = false;
    }
}

