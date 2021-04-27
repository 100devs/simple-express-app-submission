const deleteButtons = document.querySelectorAll(".delete-btn") // nodeList
const tasks = document.querySelectorAll(".task") // nodeList

Array.from(deleteButtons).forEach(btn =>{
    btn.addEventListener("click", deleteTask)
})
Array.from(tasks).forEach(task =>{
    task.addEventListener("click", updateCompleteness)
})

async function deleteTask(){
    const deleteId = this.parentNode.id //parentNode.id can get the id attribute data
    const response = await fetch("/deleteTask", {
        method:"delete",
        headers: {'Content-Type': 'application/json'}, //Use headers to indicate the data we're passing to server
        body:JSON.stringify({
            'deleteId':deleteId
        }) // parse JSON file to the server
    })
    console.log(response)
    location.reload()
}

async function updateCompleteness(){
    const taskId = this.id
    const completeness = this.className
    const result = await fetch('/updateCompleteness', {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'updateId': taskId,
            'completeness': completeness.includes('completed')
        })
    })
    console.log(result)
    location.reload()
}