const deleteText = document.querySelectorAll('.fa-x')
const thumbText = document.querySelectorAll('.fa-angle-up')
const thumbDown = document.querySelectorAll('.fa-angle-down')
Array.from(deleteText).forEach((element)=>{
   element.addEventListener('click', deleteGame)
 })

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', upVote)
})

Array.from(thumbDown).forEach((element)=>{
    element.addEventListener('click', downVote)
})


async function deleteGame(){
  const titleD = this.parentNode.childNodes[7].innerText
  const upVoted = Number(this.parentNode.childNodes[16].innerText)
    try{
        const response = await fetch('deleteGame', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'titleU': titleD,
              'upVotesU': upVoted
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function upVote(){
    const titleD = this.parentNode.childNodes[7].innerText
    const upVoted = Number(this.parentNode.childNodes[16].innerText)
    try{
        const response = await fetch('upVote', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'titleU': titleD,
              'upVotesU': upVoted
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function downVote(){
    const titleD = this.parentNode.childNodes[7].innerText
    const upVoted = Number(this.parentNode.childNodes[16].innerText)
    try{
        const response = await fetch('downVote', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'titleU': titleD,
              'upVotesU': upVoted
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
