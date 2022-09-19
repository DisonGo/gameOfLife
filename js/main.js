const SIZE_MULTI = 3
const CONFIG = {
    sizeMulti: SIZE_MULTI,
    partConf:{
        size:{
            w: 10 * SIZE_MULTI,
            h: 10 * SIZE_MULTI
        },
        fill: {
            color:"white"
        },
        border: {
            on:true,
            color:"black",
            size:1
        },
        state:{
            alive:{
                fill: "black"
            },
            dead:{
                fill: "white"
            }
        },
        max: {
            X: (aWidth-aWidth%(10*SIZE_MULTI))   / (10*SIZE_MULTI),
            Y: (aHeight-aHeight%(10*SIZE_MULTI)) / (10*SIZE_MULTI)
        }
    },
    maxCount:   (aHeight -   aHeight%(10*SIZE_MULTI)) * (aWidth-aWidth%(10*SIZE_MULTI)) / (100*SIZE_MULTI),
    maxX:       (aWidth -    aWidth%(10*SIZE_MULTI))  / (10*SIZE_MULTI),
    maxY:       (aHeight -   aHeight%(10*SIZE_MULTI)) / (10*SIZE_MULTI)
}
window.parts = []
let main = document.getElementById("main")
let params = {
    type: Two.Types.svg,
    width: aWidth,
    height: aHeight,
    autostart: true
}
let deTwo = new Two(params)
deTwo.frameCount = 60
deTwo.appendTo(main)

let svg = deTwo.renderer.domElement
svg.id = "svg"

let background = deTwo.makeGroup()
background.id = "Background"
let started = false
main.addEventListener('contextmenu',function(e){
    e.preventDefault()
})
function getRandomDec(min,max){
    let rnd = getRandomRound(min,max)
    return rnd - rnd % (10 * CONFIG.sizeMulti)
}
function generateMap(){
    let maxX = CONFIG.maxX
    let maxY = CONFIG.maxY
    let multi = CONFIG.sizeMulti
    let arr = window.parts
    for (let i = 0; i < maxY; i++) {
        let row = []
        for (let j = 0; j < maxX; j++) {
            let cords = new Point(j * multi * 10,i * multi * 10)
            let part = new Particle(cords)
            row.push(part)
            let rect = part.createOn(deTwo)
            background.add(rect)
            deTwo.update()
            rect._renderer.elem.addEventListener("click", () => part.switchStateTo())
        }       
        arr.push(row) 
    }

}
function generateParts(num){
    for (let i = 0, tryCount = 0; i < num; tryCount++) {
        let x = getRandomRound(0, CONFIG.maxX - 1)
        let y = getRandomRound(0, CONFIG.maxY - 1)
        const arr = window.parts
        const part = arr[y][x]
        if (typeof part === "undefined") continue
        part.switchStateTo("A")
        i++
        if (tryCount > num * 10) break
    }
}
let playLoop = 0
function Pause() {
    playLoop = switchBool(playLoop)
    StartBtn.innerText = playLoop ? "Stop" : "Play"
}
StartBtn.addEventListener("click", Pause)
window.addEventListener("keypress", function(e) {
    if (e.key == ' ') Pause() 
})
function loop(){
    const parts = window.parts
    window.simLoop = setInterval(()=>{
        if (playLoop) {
            let stateMap = Particle.getStateMap(window.parts)
            stateMap.forEach((row, y) => row.forEach((a, x) => {
                part = parts[y][x]
                let around = part.cellsAround(stateMap)
                if (part.aliveCheck()) {
                    if (!(around >= 2 && around <= 3))
                        part.switchStateTo("D")
                } else {
                    if (around == 3)
                        part.switchStateTo("A")
                }
            }))
            stateMap = undefined
        }
    },1000/30)
}
function start(){
    generateMap()
    loop()
}
start()