const deleteText = document.querySelectorAll('.fa-trash')
const updateCompleted = document.querySelectorAll('.fa-check')
const showContent = document.querySelectorAll('.title')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

Array.from(updateCompleted).forEach((element)=>{
    element.addEventListener('click', taskCompleted)
})
Array.from(showContent).forEach((element) => {
    element.addEventListener('click', ClickShowContent)
})

async function deleteTask(evt){
    const task = this.parentNode.childNodes[3].innerText       //dealing with Node in the DOM, so counting on odd num 1,3,5....
    const content = this.parentNode.childNodes[5].innerText

    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'task': task,
              'content': content
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()   //refresh

    }catch(err){
        console.log(err)
    }
}

async function taskCompleted(){
    const task = this.parentNode.childNodes[3].innerText
    const content = this.parentNode.childNodes[5].innerText
    const date = this.parentNode.childNodes[1].innerText
    const completed = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('taskCompleted', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'task': task,
              'content': content,
              'date': date,
              'completed': completed
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

function ClickShowContent(evt){
    console.log(evt.target.nextElementSibling)
    evt.target.nextElementSibling.classList.toggle('hidden')
}