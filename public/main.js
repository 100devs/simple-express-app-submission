// This is where you put the code that reaches out to the server to send information back and forth.
// Info can travel back and forth using fetches.  

const quoteSubmit = document.querySelector('#quoteSubmit')
const quoteDelete = document.querySelectorAll('.fa-square-xmark')
const heart = document.querySelectorAll('.fa-heart')


// deleting quotes

Array.from(quoteDelete).forEach((element) => {
    element.addEventListener('click', deleteLine)
})

// hearting quotes

Array.from(heart).forEach((element) => {
    element.addEventListener('click', heartMe)
})

async function deleteLine() {
const quoteName = this.parentNode.childNodes[1].innerText
const quoteText = this.parentNode.childNodes[5].innerText

    try {
        const response = await fetch('deleteLine', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json'}, // we're going to send JSON
            body: JSON.stringify({ //when we delete something, it has a body parameter, here we're saying that we want to convert JS Object literal into JSON string
                'name': quoteName,
                'quote': quoteText
            })
        })
        const data = await response.json() // we're expecting to get a JSON response
        console.log(data)
        location.reload()

    }catch(err) {
        console.log(err)
    }
}

async function heartMe() {
const quoteName = this.parentNode.childNodes[1].innerText
const quoteText = this.parentNode.childNodes[5].innerText
const tlikes = Number(this.parentNode.childNodes[11].innerText)
    try{
        const response = await fetch('heartMe', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': quoteName,
                'quote': quoteText,
                'likesT': tlikes
            })
        }) 
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch(err) {
        console.log(err)
    }
}

                



  








