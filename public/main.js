const thumbText = document.querySelectorAll('.fa-thumbs-up')
const trashText = document.querySelectorAll('.fa-trash')

thumbText.forEach( x => x.addEventListener('click' , addLike ))
trashText.forEach( x => x.addEventListener('click' , deleteQuote ))

async function addLike () { 
    //console.log('clicking LIKE')
    const sName = this.parentNode.childNodes[3].innerText
    const bQuote = this.parentNode.childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nameS': sName,
              'quoteS': bQuote,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)   // returns Like Added from server
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteQuote () { 
    const sName = this.parentNode.childNodes[3].innerText
    const bQuote = this.parentNode.childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('deleteQuote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nameS': sName,
              'quoteS': bQuote,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)   // returns data from server
        location.reload()
    }catch(err){
        console.log(err)
    }
}
