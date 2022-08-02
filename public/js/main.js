const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const getImg = document.querySelectorAll('input[type="submit"]')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteCard)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

Array.from(getImg).forEach((element)=>{
    element.addEventListener('click', getCardImg)
})

async function deleteCard(){
    const sName = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteCard', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'cardNameS': sName,
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
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'cardNameS': sName,
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


async function getCardImg(){
    let cardImg = document.querySelector('input').value

    fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardImg}`)
    .then(res => res.json())
    .then(data => {
        const image = document.body.querySelector('ul.cards li.card span img')
        image.src = data.image_uris.small
        console.log(data)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}