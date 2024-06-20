export class GameObject {
    x:number;
    y:number;
    w:number;
    h:number;
    
    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
    }
    
    draw() {}
}
