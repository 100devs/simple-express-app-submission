const trash = document.querySelectorAll('.fa-trash')
const heart = document.querySelectorAll('.fa-heart')

Array.from(trash).forEach((element)=>{
    element.addEventListener('click', deleteChar)
})

Array.from(heart).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteChar(){
    const sName = this.parentNode.childNodes[1].innerText
    console.log(sName)
    try{
        const response = await fetch('deleteCharacter', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'charName': sName
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
    const tLikes = Number(this.parentNode.childNodes[3].innerText)
    console.log(sName, tLikes)
    try{
        const response = await fetch('addLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'charName': sName,
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