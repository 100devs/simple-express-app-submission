const deleteText = document.querySelectorAll('.fa-trash')


Array.from(deleteText).forEach((element) => {
    element.addEventListener('click', deleteCharacter)
})



async function deleteCharacter() {
    const charName = this.parentNode.childNodes[1].innerText // grabs nodes from DOM

    try {
        const response = await fetch('deleteCharacter', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'nameS': charName,                 
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload() // after we get response, we 
        
    }catch(err){
        console.log(err)
    }
}


async function addLike(){
    const charName = this.parentNode.childNodes[1].innerText // grabs nodes from DOM
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                'nameS': charName, 
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