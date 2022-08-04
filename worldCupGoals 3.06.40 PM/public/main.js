const deleteText = document.querySelectorAll('.fa-trash-can')
const updateText = document.querySelectorAll('.plus-one-goal')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePlayer)
})
Array.from(updateText).forEach((element) => {
    element.addEventListener('click', updatePlayer)
})


async function deletePlayer(){
    const sPlayer = this.parentNode.childNodes[1].innerText
    const sNumber = this.parentNode.childNodes[3].innerText
    console.log('hey there')
    try {
        const response = await fetch('deletePlayer', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'playerNameS': sPlayer,
                'playerNumberS': sNumber,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function updatePlayer(){
    const sPlayer = this.parentNode.childNodes[1].innerText
    const sNumber = this.parentNode.childNodes[3].innerText
    const sGoals = Number(this.parentNode.childNodes[5].innerText)
    console.log(`I'm updating goals`)
    try {
        const response = await fetch ('addOneGoal', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'playerNameS': sPlayer,
                'playerNumberS': sNumber,
                'playerGoalS': sGoals
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}