const getPersent = (p, n) => {
    let persent = p / n
    persent = Math.max(0, persent)
    persent = Math.min(1, persent)

    return persent
} 

const getFormatPersent = (p) => { return `${((p) * 100).toFixed(2)}%` }


(function () {
    const scroll = document.getElementById('scroll')
    const scrollWrap = document.getElementById('scroll-wrap')

    const body = document.body
    const html = document.documentElement

    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight
    let isClick = false


    const controlScroll = (event) => {
        const persent = getPersent(event.screenX, window.innerWidth)
        const scrollY = persent * height
        
        scroll.style.width = getFormatPersent(persent)

        window.scrollTo({ top: scrollY, left: 0 })
    }

    const setScroll = () => {
        const persent = getPersent(window.scrollY, height)
        scroll.style.width = getFormatPersent(persent)
    } 

    setScroll()

    scrollWrap.addEventListener('mousedown', (event) => {
        isClick = true
        controlScroll(event)
    })

    window.addEventListener('mousemove', (event) => {
        if(isClick) { controlScroll(event) }
    })

    window.addEventListener('mouseup', () => { isClick = false })

    window.onscroll = function() { if(!isClick) { setScroll() } }

    window.onresize = function() { 
        height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) 
        height -= window.innerHeight

        setScroll()
    }
})()