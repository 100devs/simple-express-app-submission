const deleteBtn = document.querySelectorAll('.delete-button') 
const likeBtn = document.querySelectorAll('.like-button') 

Array.from(deleteBtn).forEach((element)=>{ // adds event listeners to all delete buttons
    element.addEventListener('click', deleteItem)
})
Array.from(likeBtn).forEach((element)=>{ // adds event listeners to all delete buttons
    element.addEventListener('click', likeItem)
})

async function deleteItem() {
    const title = this.parentNode.childNodes[1].innerText
    fetch('/deleteLyrics', { 
        method: 'delete', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({
            title: title
        })
    }).then(res => {
        if (res.ok) return res.json();
    }).then(response => {
        window.location.reload(true);
    }).catch(err => console.log(err));
}

async function likeItem(){
    const title = this.parentNode.childNodes[1].innerText
    const likes = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('/upvote', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                likes: likes,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}