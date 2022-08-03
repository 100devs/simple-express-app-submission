const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteBook)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteBook(){
    const bName = this.parentNode.childNodes[1].innerText
    const aName = this.parentNode.childNodes[3].innerText
    const rForLike = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteBook', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bookNameS': bName,
              'authorNameS': aName,
              'reasonForLikingS': rForLike
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
    const bName = this.parentNode.childNodes[1].innerText
    const aName = this.parentNode.childNodes[3].innerText
    const rForLike = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bookNameS': bName,
              'authorNameS': aName,
              'reasonForLikingS': rForLike,
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