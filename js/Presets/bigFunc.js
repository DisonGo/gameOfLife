function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomRound(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandCSSColor() {
    return "rgb(" + Math.floor(getRandom(0, 255)) + "," +Math.floor(getRandom(0, 255)) + "," +Math.floor(getRandom(0, 255)) + ")"
}
function log(any){
    console.log(any);
}
function createTimerTo(node, totalTime) {
    node.startTime = new Date()
    let nTimer = document.createElement("div")
    nTimer.style.textAlign = "center"
    nTimer.style.width = "100%"
    node.appendChild(nTimer)
    node.timer = setInterval(() => {
        let date = new Date() - node.startTime
        if (date >= totalTime) {
            node.startTime = new Date()
            date = new Date() - node.startTime
        }
        let ms = date % 1000
        let s = ((date - ms) / 1000) % 60
        let m = Math.round(((date - ms) / 1000) / 60) % 60
        let h = Math.round(Math.round(((date - ms) / 1000) / 60) / 24) % 24
        ms = ms.toString().padStart(3, '0')
        m = m.toString().padStart(2, '0')
        s = s.toString().padStart(2, '0')
        h = h.toString().padStart(2, '0')
        nTimer.innerHTML = h + ":" + m + ":" + s + ":" + ms + "\t " + totalTime
    }, 10)
}
function updateSizes(){
    aHeight = document.documentElement.clientHeight;
    aWidth = document.documentElement.clientWidth;
} 
function resizeBody(){
    document.body.style.height = aHeight + "px";
    document.body.style.width = aWidth + "px";
}
function switchBool(x){
    if(x){
        x = false
    }else x = true
    return x
}

// function transorm_obj_to_bin_vector(obj){
//     let newVector [];
//     let newSubVec [];
//     for(let i=0;i<obj.lenght;i++){
//         if(obj.charCodeAt(i)!=10){
//             if(obj.charCodeAt(i)==32)newSubVec.push(0)
//             else newSubVec.push(1)
//         }else{
//             newVector.push(newSubVec)
//             newSubVec = [];
//         }
//     }
//     return newVector;
// }