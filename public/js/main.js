const submitBtn = document.getElementById('submit')
const markCompleteBtn =document.querySelectorAll('.complete-btn')
const deleteGameBtn =document.querySelectorAll('.delete-btn')

submitBtn.addEventListener('submit', addGame)

markCompleteBtn.forEach(btn => {
    btn.addEventListener('click', markComplete)
})

deleteGameBtn.forEach(btn => {
    btn.addEventListener('click', deleteGame)
})



async function addGame() {
    const input = document.querySelector('[name="gameName"]').value
    try {
        const response = await fetch('addGame',{
            method: 'post',
            headers: {'Content-Type' : 'application/json' },
            body: JSON.stringify({
                gameName : input,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch (err) { console.error(err) }
}


async function markComplete() {
    const game = this.parentNode.childNodes[3].innerText
    try {
        const response = await fetch('/markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                gameName: game,
            })
        })
        const data = response.json()
        location.reload()
    }catch (err) {
        console.log(err)
    }
}


async function deleteGame() {
    const game = this.parentNode.childNodes[3].innerText
    try {
        const response = await fetch('deleteGame', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                gameName: game,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch (err) {console.error(err)}
}