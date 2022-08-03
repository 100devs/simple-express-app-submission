setInterval( function(){
const timer = document.querySelectorAll('.timer')
let times = [];
for(let i = 0; i < Array.from(timer).length; i++){
    times.push(timer[i])
}
console.log(times)

for(let i = 0; i < times.length; i++){
if(Number(times[i].innerText < 1)){
        deleteTime(times[i]);
        console.log(times[i].parentNode)
}
countDownTime(times[i])
}

async function deleteTime(index){
    const inQuestion = index.parentNode
    const sName = inQuestion.childNodes[1].innerText
    const bName = inQuestion.childNodes[3].innerText
    try{
        const response = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function countDownTime(index){
    let inQuestion = index.parentNode
    const sName = inQuestion.childNodes[1].innerText
    const bName = inQuestion.childNodes[3].innerText
    const clock = Number(inQuestion.childNodes[5].innerText)
    try{
        const response = await fetch('countDown', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName,
              'timeS': clock
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
}, 60000)

const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const commentText = document.querySelectorAll('.post')

Array.from(commentText).forEach((element)=>{
    element.addEventListener('click', addComment)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteRapper(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName
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
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName,
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

async function addComment(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tComment = this.parentNode.childNodes[13].value
    try{
        const response = await fetch('addOneComment', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageNameS': sName,
              'birthNameS': bName,
              'commentS': tComment
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}