const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteSong)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteSong(){
    const sName = this.parentNode.childNodes[1].innerText
    const pName = this.parentNode.childNodes[3].innerText
    const swName = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deleteSong', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'songNameS': sName,
              'performerNameS': pName,
              'songwriterNameS': swName,
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
    const sName = this.parentNode.childNodes[1].innerText
    const pName = this.parentNode.childNodes[3].innerText
    const swName = this.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'songNameS': sName,
              'performerNameS': pName,
              'songwriterNameS': swName,
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