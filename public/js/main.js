const deleteText = document.querySelectorAll('.fa-trash')
const checkText = document.querySelectorAll('.fa-check-square')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTodoItem)
})

Array.from(checkText).forEach((element)=>{
    element.addEventListener('click', checkTodoItem)
})

async function deleteTodoItem(){
    const tItem = this.parentNode.childNodes[1].innerText
    const tDate = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('/deleteTodo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todo_item': tItem,
              'date_item': tDate
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function checkTodoItem(){
    const todo_item = this.parentNode.childNodes[1].innerText
    const item_date = this.parentNode.childNodes[3].innerText
    const todo_checked = this.parentNode.childNodes[5].classList.contains("fas")
    console.log(todo_checked)
    try{
        const response = await fetch('markCompleted', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'todo_item': todo_item,
              'item_date': item_date,
              'todo_checked': todo_checked
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}