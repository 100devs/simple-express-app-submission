const deleteEls = document.querySelectorAll('.del')
const submitButton = document.getElementById('submit').addEventListener('click', addTask)
Array.from(deleteEls).forEach(element => {
    element.addEventListener('click', deleteTask)
})

async function addTask(){
    const newTask = document.getElementById('newTask').innerText
    try{
        location(reload)
    }catch{
        error => console.log(error)
    }
}

async function deleteTask(){
    const currentTask = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'taskS': currentTask
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch{
        error=>console.error(error)
    }
}