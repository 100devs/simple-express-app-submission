const deleteText = document.querySelectorAll('.fa-trash');
const thumbsUp = document.querySelectorAll('.fa-thumbs-up');

Array.from(deleteText).forEach(element => {
    element.addEventListener('click', deleteBeer)
})

Array.from(thumbsUp).forEach(element => {
    element.addEventListener('click', addLike)
})

async function deleteBeer(){
    const bName = this.parentNode.childNodes[1].innerText
    const bType = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteBeer', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'beerNameS': bName,
                'beerTypeS': bType
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}

async function addLike(){
    const bName = this.parentNode.childNodes[1].innerText
    const bType = this.parentNode.childNodes[3].innerText
    const bLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'beerNameS': bName,
                'beerTypeS': bType,
                'beerLikesS': bLikes
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}
