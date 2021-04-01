const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePlanet)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deletePlanet(){
    const pName = this.parentNode.childNodes[1].innerText.trim()
    try{
        const response = await fetch('deletePlanet', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'planetName': pName,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const pName = this.parentNode.childNodes[1].innerText.trim()
    const tLikes = Number(this.parentNode.querySelector('.likes').innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'planetName': pName,
              'likes': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
