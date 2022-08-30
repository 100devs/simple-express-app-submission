const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteBeach)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteBeach(){
    const sName = this.parentNode.parentNode.childNodes[1].innerText
    const bName = this.parentNode.parentNode.childNodes[3].innerText
    console.log(bName)
    try{
        const response = await fetch('deleteBeach', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'beachName': sName,
              'restroom': bName
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
    const sName = this.parentNode.parentNode.childNodes[1].innerText
    const bName = this.parentNode.parentNode.childNodes[3].innerText
    const lName = this.parentNode.parentNode.childNodes[5].innerText
    const tLikes = Number(this.parentNode.parentNode.childNodes[7].innerText)

    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'beachName': sName,
              'restroom': bName,
              'lifeguard': lName,
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