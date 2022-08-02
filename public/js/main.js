const addLikeBtn = document.querySelectorAll('.fa-thumbs-up')
const deleteBtn = document.querySelectorAll('.fa-trash')

Array.from(addLikeBtn).forEach((element) => {
    element.addEventListener('click', addLike)
})

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteArtist)
})

async function addLike(){
    console.log('clicked!')
    const sName = this.parentNode.childNodes[1].innerText
    const genre = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageName': sName,
              'genre': genre,
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

async function deleteArtist(){
    console.log('clicked')
    const sName = this.parentNode.childNodes[1].innerText
    const genre = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteArtist', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageName': sName,
              'genre': genre
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}