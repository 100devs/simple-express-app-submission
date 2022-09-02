const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-arrow-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTuber)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addVidCount)
})

async function deleteTuber(){
    const yName = this.parentNode.childNodes[1].innerText

    try{
        const response = await fetch('deleteTuber', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'youtuberName': yName,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addVidCount(){
    const yName = this.parentNode.childNodes[1].innerText
    const tCount = Number(this.parentNode.childNodes[3].innerText)
    try{
        const response = await fetch('addVidCount', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'youtuberName': yName,
              'countS': tCount
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}