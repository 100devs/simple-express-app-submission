// This is where you put your code to send information back and forth to the server

const deleteButtons = document.querySelectorAll('.delete-btn')
const editButtons = document.querySelectorAll('.edit-btn')

// buttons in the bottom form
const commentTextarea = document.querySelector('.new-message__textarea')
const newButton = document.querySelector('.new-message__new-btn')
const cancelButton = document.querySelector('.new-message__cancel-btn')
const updateButton = document.querySelector('.new-message__update-btn')
let id

Array.from(deleteButtons).forEach((element)=>{
    element.addEventListener('click', deleteComment)
})

Array.from(editButtons).forEach((element)=>{
    element.addEventListener('click', prepareEdit)
})

cancelButton.addEventListener('click', cancelEdit)
updateButton.addEventListener('click', updatePost)


async function deleteComment(){
    id = this.parentNode.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('/message', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              '_id': id,
            })
          })
        const data = await response.json()
        console.log(data)
        // // reload page
        location.reload()

    }catch(err){
        console.log(err)
    }
}

function prepareEdit() {
    id = this.parentNode.parentNode.childNodes[5].innerText

    document.querySelector(".new-message__textarea").scrollIntoView({behavior: 'smooth'})
    // // show the edit and cancel buttons instead
    newButton.classList.add('default-hidden')
    cancelButton.classList.remove('default-hidden')
    updateButton.classList.remove('default-hidden')

    // update text of textarea

    let commentText = this.parentNode.parentNode.childNodes[3].innerText
    commentTextarea.innerText = commentText
    console.log(commentTextarea.value)
}

function cancelEdit() {
    document.querySelector(".comment-scroller").scrollIntoView({behavior: 'smooth'})
    commentTextarea.value = ""
    // show the new button instead again
    newButton.classList.remove('default-hidden')
    cancelButton.classList.add('default-hidden')
    updateButton.classList.add('default-hidden')
}

async function updatePost(){
    try{
        const response = await fetch('/message', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'message': commentTextarea.value,
              '_id': id
            })
          })

        const data = await response.json()
        location.reload()

    }catch(err){
        console.log(err)
    }
}