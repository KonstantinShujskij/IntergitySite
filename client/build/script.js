// 3D Scroll 

const zSpasing = -1000

const frames = Array.from(document.getElementsByClassName('frame'))
const zVals = []

const onscroll = function(delta) {
    let offset = 0

    frames.forEach((n, i) => {
        zVals.push(offset + zSpasing)
        zVals[i] += delta * 5.5

        let frame = frames[i]
        
        const frameOffset = parseFloat(frame.dataset.space);
        offset += frameOffset
        
        let transform = `translateZ(${zVals[i]}px)`
        let opacity = zVals[i] < Math.abs(zSpasing) / 1.8 ? 1 : 0

        frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity};`)
    })
}

function scroll(pos, time, callback) {   
    let timestamp = Date.now()
    const timestop = timestamp + time
    const step = pos / time

    function loop() {
        if(timestamp <= timestop) { requestAnimationFrame(loop) }
        else if(callback) { callback() }
        
        const dt = Date.now() - timestamp
        timestamp += dt

        onscroll(dt * step)
    }

    loop()
}

let start = false
let finish = false

window.onload = () => {    
    onscroll(0)

    setTimeout(() => { move() }, 4000)

    function move() {
        start = true
        frames.forEach((frame) => { frame.classList.add('init') })

        return scroll(2750, 8000, () => { 
            finish = true 
            
            setTimeout(() => { window.location.href = "./ua/index.html" }, 100)
        })
    }
        
    document.onclick = () => {
        if(!start) { move() }
        if(finish) { window.location.href = "./ua/index.html" }
    }
}

