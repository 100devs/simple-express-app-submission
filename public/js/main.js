//Constants
const deleteTomText = document.querySelectorAll('#tom-trash')
const thumbTomText = document.querySelectorAll('#tom-thumbs-up')
const deleteStephenText = document.querySelectorAll('#stephen-trash')
const thumbStephenText = document.querySelectorAll('#stephen-thumbs-up')

//Tom Array
Array.from(deleteTomText).forEach((element)=>{
    element.addEventListener('click', deleteTomGame)
})

Array.from(thumbTomText).forEach((element)=>{
    element.addEventListener('click', addOneTomLike)
})

//Tom async await
async function deleteTomGame(){
    const name = this.parentNode.childNodes[1].innerText
    const platform = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteTomGame', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': name,
              'platform': platform
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addOneTomLike(){
    const name = this.parentNode.childNodes[1].innerText
    const platform = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const res = await fetch('addOneTomLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': name,
              'platform': platform,
              'likes': tLikes
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

//Stephen Array
Array.from(deleteStephenText).forEach((element)=>{
    element.addEventListener('click', deleteStephenGame)
})

Array.from(thumbStephenText).forEach((element)=>{
    element.addEventListener('click', addOneStephenLike)
})

//Stephen Async Await
async function deleteStephenGame(){
    const name = this.parentNode.childNodes[1].innerText
    const platform = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteStephenGame', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': name,
              'platform': platform
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addOneStephenLike(){
    const name = this.parentNode.childNodes[1].innerText
    const platform = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const res = await fetch('addOneStephenLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': name,
              'platform': platform,
              'likes': tLikes
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}