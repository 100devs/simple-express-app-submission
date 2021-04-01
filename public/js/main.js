const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

async function deleteTask(){
    const task = this.parentNode.childNodes[1].innerText
    const time = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskNameS': task,
                'timeS': time
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}