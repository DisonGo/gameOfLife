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
    constructor(cords) {
        let conf    = CONFIG.partConf
        this.conf   = conf
        this.cords  = new Point(cords.x,cords.y)
        this.w      = conf.size.w
        this.h      = conf.size.h
        this.cords.x += this.w / 2
        this.cords.y += this.h / 2
        this.X      = cords.x / CONFIG.sizeMulti / 10 
        this.Y      = cords.y / CONFIG.sizeMulti / 10
        this.state  = 0
        this.fill   = conf.fill.color,
        this.border = conf.border
        this.svg    = null
    }
    createOn(ctx) {
        let rect = ctx.makeRectangle(this.cords.x, this.cords.y, this.w, this.h)
        rect.fill = this.fill
        if (this.border.on) {
            rect.linewidth = this.border.size
            rect.stroke = this.border.color
        }
        this.svg = rect
        return rect
    }
    switchStateTo(state) {
        switch (state) {
            case "A":
                this.state = 1
                this.fill = this.conf.state.alive.fill
                this.refreshFill()
                break;
            case "D":
                this.state = 0
                this.fill = this.conf.state.dead.fill
                // this.fill = getRandCSSColor()
                this.refreshFill()
                break;
            default:
                this.switchStateTo(this.state ? "D" : "A");
                break;
        }
        this.refreshFill()
    }
    outOfArr    = (x,y) => (x < 0 || x > CONFIG.maxX - 1 || y < 0 || y > CONFIG.maxY - 1)
    aliveCheck  = ()    => this.state
    static checkState(x, y, arr) {
        let maxX = arr[0].length
        let maxY = arr.length
        if (x >= maxX)
            x = x % maxX
        else if (x < 0)
            x = maxX + x % maxX
        if (y >= maxY)
            y = y % maxY
        else if (y < 0)
            y = maxY + y % maxY
        return arr[y][x].state
    }
    static copy(part) {
        let x = part.X * CONFIG.sizeMulti * 10,
            y = part.Y * CONFIG.sizeMulti * 10
        let copy = new Particle(new Point(x, y))
        copy.state  = part.state
        copy.fill   = part.fill,
        copy.border = part.border
        copy.svg    = part.svg
        return copy
    }
    cellsAround(arr){
        let aliveCount = 0
        let x = this.X
        let y = this.Y
        aliveCount = 
            Particle.checkState(x - 1,  y - 1, arr) +
            Particle.checkState(x,      y - 1, arr) +
            Particle.checkState(x + 1,  y - 1, arr) +
            Particle.checkState(x - 1,  y    , arr) +
            Particle.checkState(x + 1,  y    , arr) +
            Particle.checkState(x - 1,  y + 1, arr) +
            Particle.checkState(x,      y + 1, arr) +
            Particle.checkState(x + 1,  y + 1, arr);
        return aliveCount
    }
    refreshFill(){
        this.svg.fill = this.fill
    }
}