
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach(element => {
    element.addEventListener('click', deleteRapper)
})

Array.from(thumbText).forEach(element => {
    element.addEventListener('click', addLike)
})

async function deleteRapper(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try {
        //variable name for response (res) in server side and the client has to be same then it works 
        const res = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'stageNameS': sName,
                'birthNameS': bName
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    } catch(error){
        console.log(error)
    }
}

async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const res = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
            'stageNameS': sName,
            'birthNameS': bName,
            'likesS': tLikes
        })
        })
        const data = await res.json()
        console.log('like added')
        location.reload()
    }  catch(error){
        console.log(error)
    }
}