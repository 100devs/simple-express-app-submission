const deleteText = document.querySelectorAll('.fa-trash-alt')
const thumbText = document.querySelectorAll('.fa-heart')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteDessert)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})


async function deleteDessert(){
    const dName = this.parentNode.childNodes[1].innerText
    const deletePW = prompt('No de-le-tay without the password :)') 
        try{
            const response = await fetch('deleteDessert', {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                'dessertNameS': dName,
                'pw': deletePW
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
    const dName = this.parentNode.childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[3].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'dessertNameS': dName,
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