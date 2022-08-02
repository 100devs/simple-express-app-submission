const delaytay = document.querySelectorAll('.fa-trash')
const updateCompletion = document.querySelectorAll('.fa-check')
const replay = document.querySelectorAll('.fa-backward')

Array.from(delaytay).forEach( (el) => {
    el.addEventListener('click', delaytayItem)
})

Array.from(updateCompletion).forEach(
    (el) => el.addEventListener('click', markCompletion)
)

Array.from(replay).forEach(
    el => el.addEventListener('click', replayGame)
)

async function delaytayItem() {
    console.log('click')
    console.log(this.parentNode.childNodes[3].innerText)
    const gameName = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('delaytayItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'gameToDelaytay': gameName,
            })
        })
        const data = await res.json()
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}

async function markCompletion(){
    console.log('click update')
    const gameName = this.parentNode.childNodes[3].innerText
    console.log(gameName)
    try{
        const res = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'gameToUpdate': gameName
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}

async function replayGame(){
    console.log('click replay')
    const gameName = this.parentNode.childNodes[3].innerText
    console.log(gameName)

    try{
        const res = await fetch('replayGame', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'gameToReplay': gameName
            })
        })
        const data = res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}