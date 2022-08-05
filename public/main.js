
const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-arrow-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', (deleteMovie))
    
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteMovie(){
    
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    
    try{
        const response = await fetch('deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': sName,
              'quote': bName
            })
          })
        const data = await response.json()
         
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
   
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': sName,
                'quote': bName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        
        location.reload()

    }catch(err){
        console.log(err)
    }
}
