class Point{
    constructor(x, y) {
        this._x = x
        this._y = y
    }
    get x() {
        return Number(this._x)
    }
    get y() {
        return Number(this._y)
    }
    set x(value) {
        this._x = value
    }
    set y(value) {
        this._y = value
    }
    sumPoint(p) {
        this._x += p.x
        this._y += p.y
        return this
    }
    substrPoint(p) {
        this._x -= p.x
        this._y -= p.y
        return this
    }
    clone(p) {
        this._x = p.x
        this._y = p.y
        return this
    }
    reverse(what) {
        switch (what) {
            case "x":
                this._x *= -1
                break
            case "y":
                this._y *= -1
                break
            default:
                this._x *= -1
                this._y *= -1
        }
        return this
    }
}
class Particle{
    constructor(cords){
        let conf = CONFIG.partConf
        this.conf = conf
        this.cords = new Point(cords.x,cords.y)
        this.w = conf.size.w
        this.h = conf.size.h
        this.cords.x+=this.w/2
        this.cords.y+=this.h/2
        this.X = cords.x/CONFIG.sizeMulti/10 
        this.Y = cords.y/CONFIG.sizeMulti/10
        if(conf.state.alive.on) conf.fill = conf.state.alive.fill
        else conf.fill = conf.state.dead.fill
        this.state = conf.state
        this.fill = conf.fill,
        this.border = conf.border
        this.svg = null
    }
    createOn(ctx){
        let rect = ctx.makeRectangle(this.cords.x, this.cords.y, this.w, this.h)
        if(this.fill.on)rect.fill = this.fill.color
        if(this.border.on){
            rect.linewidth = this.border.size
            rect.stroke = this.border.color
        }
        this.svg = rect
        return rect
    }
    switchStateTo(state){
        switch (state) {
            case "A":
                this.state.alive.on = true,
                this.state.dead.on = false
                this.fill = this.state.alive.fill
                break;
            case "D":
                this.state.alive.on = false,
                this.state.dead.on = true
                this.fill = this.state.dead.fill
                break;
            default:
                if(this.state.alive.on){
                    this.switchStateTo("D")
                }
                else{
                    this.switchStateTo("A")
                }
                break;
        }
        this.refreshFill()
    }
    outOfarr(x,y){
        return (x<0||x>CONFIG.maxX-1||y<0||y>CONFIG.maxY-1)
    }
    aliveCheck(){
        return this.state.alive.on
    }
    deadCheck(){
        return this.state.dead.on
    }

    tick(){
        let aliveCount = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let x = this.X + j - 1
                let y = this.Y + i - 1
                if(!this.outOfarr(x,y)){
                    const arr = window.parts
                    const selecElem = arr[y][x]
                    // console.log(x,y);
                    if(selecElem.aliveCheck()){
                        aliveCount++
                    }
                }
            }
        }
        if(this.aliveCheck()){
            if(aliveCount == 2 || aliveCount == 3)return
            else this.switchStateTo("D")
        }else{
            if(aliveCount == 3)this.switchStateTo("A")
            else return 
        }
    }
    refreshFill(){
        this.svg.fill = this.fill.color
    }
}