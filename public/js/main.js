const deleteText = document.querySelectorAll('.remove')
const loveText = document.querySelectorAll('.love')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteEncouragement)
})

Array.from(loveText).forEach((element)=>{
    element.addEventListener('click', addLove)
})

async function deleteEncouragement(){
    const tWords = this.parentNode.childNodes[1].innerText
    const tLoves = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('deleteEncouragement', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'wordsS': tWords,
              'lovesS': tLoves
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLove(){
    const tWords = this.parentNode.childNodes[1].innerText
    const tLoves = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLove', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'wordsS': tWords,
              'lovesS': tLoves
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}