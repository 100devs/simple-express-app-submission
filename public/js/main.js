const deleteBtn = document.querySelectorAll('.fa-trash') 
const likesBtn = document.querySelectorAll('.fa-heart')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(likesBtn).forEach((element)=>{
    element.addEventListener('click', addLike) 
})



async function deleteItem(){ 
    const itemText = this.parentNode.nextElementSibling.childNodes[1].innerText 
    console.log(itemText)
    try{ 
        const response = await fetch('deleteItem', { 
            method: 'delete',  
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ 
                'itemFromJS': itemText 
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

    const productName = this.parentNode.nextElementSibling.childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[0].innerText)
    console.log(tLikes)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': productName,
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
