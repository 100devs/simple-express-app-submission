// Delete
const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach(element => {
    element.addEventListener('click', deleteQuote)
})

async function deleteQuote() {
    const cQuote = this.parentNode.childNodes[1].innerText
    const cName = this.parentNode.childNodes[3].innerText

    try{
        const response = await fetch('deleteQuote', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'charQuote': cQuote,
                'charName': cName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err) {
        console.log(err)
    }
}

//Likes

const thumbsUp = document.querySelectorAll('.fa-thumbs-up')

Array.from(thumbsUp).forEach(element => {
    element.addEventListener('click', likeQuote)
})

async function likeQuote() {
    const cQuote = this.parentNode.childNodes[1].innerText
    const cName = this.parentNode.childNodes[3].innerText
    const cLikes = Number(this.parentNode.childNodes[5].innerText)

    try{
        const response = await fetch('addOneLike',
        {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'charQuote': cQuote,
                'charName': cName,
                'charLikes': cLikes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err) {
        console.log(err)
    }
}