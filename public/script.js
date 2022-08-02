
Array.from(document.querySelectorAll('.delete')).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

Array.from(document.querySelectorAll('.edit')).forEach((element)=>{
    element.addEventListener('click', editTask)
})
Array.from(document.querySelectorAll('span')).forEach((element)=>{
    element.addEventListener('click', checked)
})

document.querySelector('.deleteAll').addEventListener('click', deleteAll)

function checked(element){
    if (element.target.style.color == 'black')
        element.target.style.color = 'gray'
    else element.target.style.color = 'black'
}

async function deleteTask() {
    const task = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'task': task,
            })
          })
          const data = await response.json()
          console.log(data)
          location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteAll(){
    try{
        const response = await fetch('deleteAll', {
            method: 'delete',
          })
          const data = await response.json()
          console.log(data)
          location.reload()
    }catch(err){
        console.log(err)
    }
}

async function editTask(){
    const task = this.parentNode.childNodes[1].innerText
    let newTask = prompt('Edit Task: ')
    try{
        const response = await fetch('editTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'task': task,
              'newTask': newTask
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}