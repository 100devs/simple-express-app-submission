// const { response } = require("express")

const deleteText = document.querySelectorAll('.del')
Array.from(deleteText).forEach((element) =>{
    element.addEventListener('click', deleteMovie)
})

// Delete or DELETE /info
async function deleteMovie(){
    const mName = this.parentNode.childNodes[1].innerText
    const importance = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('/deleteMovie', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'movieNameS': mName,
                // 'importanceS': importance,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
    
}
// Update or PUT /info 
// Create or POST /addmovie

// PUT function not working, eventlistener not activating on click but by default. 

const seen = document.querySelectorAll('.seenButton')
Array.from(seen).forEach((element) =>{
    element.addEventListener('click', seenMovie)
})


async function seenMovie() {
    console.log("started")
    const movieNameS = this.parentNode.childNodes[1].innerText
    const importance = this.parentNode.childNodes[4].innerText
    try{
        const response = await fetch ('checkbox', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'movieName': movieNameS,
                'importance': importance,
            })
        })
    const data = await response.json()
    console.log(data)
    location.reload(true)
    }catch (error) {
        console.log(error)
    }
}