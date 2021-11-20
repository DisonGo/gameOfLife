const SIZE_MULTI = 2
const CONFIG = {
    sizeMulti: SIZE_MULTI,
    partConf:{
        size:{
            w:10*SIZE_MULTI,
            h:10*SIZE_MULTI
        },
        color: "black",
        fill: {
            on:true,
            color:"black"
        },
        border: {
            on:true,
            color:"white",
            size:1
        },
        state:{
            alive:{
                on:false,
                fill:{
                    on:true,
                    color:"black"
                }
            },
            dead:{
                on:true,
                fill:{
                    on:true,
                    color:"white"
                }
            }
        }
    },
    maxCount: (aHeight-aHeight%(10*SIZE_MULTI)) * (aWidth-aWidth%(10*SIZE_MULTI)) / (100*SIZE_MULTI),
    maxX:(aWidth-aWidth%(10*SIZE_MULTI)) / (10*SIZE_MULTI),
    maxY:(aHeight-aHeight%(10*SIZE_MULTI)) / (10*SIZE_MULTI)
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
main.addEventListener('click',function(e){
    start()
})
main.addEventListener('contextmenu',function(e){
    e.preventDefault()
})
function getRandomDec(min,max){
    let rnd = getRandomRound(min,max)
    return rnd - rnd%(10*CONFIG.sizeMulti)
}
function checkAlive(){
    window.parts.forEach((sub)=>{
        console.log( sub.filter((part)=>{
            return part.state.alive.on
          }));
    })
}
function generateMap(){
    let maxX = CONFIG.maxX
    let maxY = CONFIG.maxY
    let arr = window.parts
    for (let i = 0; i < maxY; i++) {
        let Xarr = []
        for (let j = 0; j < maxX; j++) {
            let part = new Particle(new Point(j*CONFIG.sizeMulti*10,i*CONFIG.sizeMulti*10))  
            Xarr.push(part)
            let rect = part.createOn(deTwo)
            background.add(rect)
        }       
        arr.push(Xarr) 
    }

}
function generateParts(num){
    for (let i = 0,tryCount=0 ; i < num;tryCount++) {
        let x = getRandomRound(0,CONFIG.maxX -1)
        let y = getRandomRound(0,CONFIG.maxY -1)
        const arr = window.parts
        // console.log(x,y);
        const part = arr[y][x]
        if(!(typeof part === "undefined")){
            part.switchStateTo("A")
            i++
        }
        if(tryCount>num*10)break
    }
}
function start(){
    generateMap()
    generateParts(100)
    function loop(){
        this.int = setInterval(()=>{
            window.parts.forEach(subArr=> {
                subArr.forEach(part=>{
                    part.tick()
                })
            });
        },1000)
    }
    loop()
}