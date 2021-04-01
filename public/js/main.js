

let deleteTask  = document.querySelectorAll('.fa-trash-alt')
let upVote = document.querySelectorAll('.fa-thumbs-up')
let downVote = document.querySelectorAll('.fa-thumbs-down')


Array.from(deleteTask).forEach((element)=>{
    element.addEventListener('click', deleteRequest)
})

Array.from(upVote).forEach((element)=>{
    element.addEventListener('click', upvoteTask)
})

Array.from(downVote).forEach((e)=>{
    e.addEventListener('click',downVoteTask)
})

async function downVoteTask(){
    
    const toDo =  this.parentNode.childNodes[1].innerText
    const priority = Number(this.parentNode.childNodes[3].innerText)
               
    try{
        const response = await fetch('/downVote',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({

                toDoS: toDo,
                priorityS: priority 
            })
        })
            
        const data = await response.json()
        console.log(data)
        location.reload()
        }catch(error){
             console.group(error)
    }
}

async function upvoteTask(){
    
    const toDo =  this.parentNode.childNodes[1].innerText
    const priority = Number(this.parentNode.childNodes[3].innerText)
               
    try{
        const response = await fetch('/upvote',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({

                toDoS: toDo,
                priorityS: priority 
            })
        })
            
        const data = await response.json()
        console.log(data)
        location.reload()
        }catch(error){
             console.group(error)
    }
}



async function deleteRequest(){

    let body = {
        toDo: this.parentNode.childNodes[1].innerText
    }

    try{
        const response = await fetch('deleteTask',{
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
    
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.group(error)
    }
}