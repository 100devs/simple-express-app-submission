const deleteText = document.querySelectorAll('.fa-trash-can')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteRapper(){
    const bTitle = this.parentNode.childNodes[1].innerText
    const bAuthor = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteBook', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bookTitleS': bTitle,
              'bookAuthorS': bAuthor
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
    const bTitle = this.parentNode.childNodes[1].innerText
    const bAuthor = this.parentNode.childNodes[3].innerText
    const bRating = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bookTitleS': bTitle,
              'bookAuthorS': bAuthor,
              'bookRatingS': bRating,
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