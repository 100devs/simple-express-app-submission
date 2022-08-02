const deleteText = document.querySelectorAll('.fa-minus')
const addHeart = document.querySelectorAll('.fa-heart-o')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteAffirmation)
})

Array.from(addHeart).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteAffirmation(){
    const entryText = this.parentNode.childNodes[3].innerText
    const sourceText = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('deleteAffirmation', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'entryS': entryText,
              'sourceS': sourceText
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
    const entryText = this.parentNode.parentNode.childNodes[3].innerText
    const sourceText = this.parentNode.parentNode.childNodes[5].childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[1].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'entryS': entryText,
              'sourceS': sourceText,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}