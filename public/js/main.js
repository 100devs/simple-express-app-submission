const switchTasksButton = document.querySelectorAll('.switch-tasks')
const deleteButton = document.querySelectorAll('.fa-trash')
const completeTaskButton = document.querySelectorAll('.fa-check')
const unCompleteTaskButton = document.querySelectorAll('.fa-xmark')

Array.from(switchTasksButton).forEach(e => {
    e.addEventListener('click', switchTasks)
})
Array.from(deleteButton).forEach(e => {
    e.addEventListener('click', deleteTask)
})
Array.from(completeTaskButton).forEach(e => {
    e.addEventListener('click', switchIsCompleted)
})
Array.from(unCompleteTaskButton).forEach(e => {
    e.addEventListener('click', switchIsCompleted)
})

async function deleteTask() {
    const header = this.parentNode.parentNode.parentNode.childNodes[1].innerText
    const text = this.parentNode.parentNode.parentNode.childNodes[3].innerText

    try {
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'headerS': header,
                'textS': text
            })
        })
        const data = await response.json()
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

function switchTasks() {
    const completedTasks = document.querySelectorAll('.completed-task-list')
    const unCompletedTasks = document.querySelectorAll('.uncompleted-task-list')
    const switchTasks = document.querySelectorAll('.switch-tasks')
    Array.from(completedTasks).forEach(e => {
        e.classList.toggle('hidden')
    })
    Array.from(unCompletedTasks).forEach(e => {
        e.classList.toggle('hidden')
    })
    Array.from(switchTasks).forEach(e => {
        e.classList.toggle('hidden')
    })
}

async function switchIsCompleted() {
    const selectedTask = this.parentNode.parentNode.parentNode.childNodes[1].innerText
    const isCompleted = this.parentNode.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('switchTaskStatus', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'headerS': selectedTask,
              'isCompleted': isCompleted
            })
          })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}