console.log(notes)
const deleteButtons = document.querySelectorAll('.deleteButton')
const updateButtons = document.querySelectorAll('.updateButton')

Array.from(deleteButtons).forEach((element) => {
  element.addEventListener('click', deleteNote)
})

Array.from(updateButtons).forEach((element) => {
  element.addEventListener('click', editNote)
})

async function deleteNote(){
  const noteId = this.parentNode.id
  console.log(noteId)
  try{
    const response = await fetch(`notes/${noteId}`, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }
  catch(err){
    console.log(err)
  }
}

function editNote(){
  const li = this.parentNode
  const noteId = li.id
  const title = li.firstChild.nextSibling
  const content = this.previousSibling.previousSibling
  const editButton = this
  const deleteButton = this.nextSibling.nextSibling
  const fields = [title, content, editButton, deleteButton]

  fields.forEach((field) => {
    field.classList.add('hidden')
  })

  const updateForm = document.createElement('form')
  updateForm.id = noteId

  const updateTitle = document.createElement('input')
  updateTitle.placeholder = 'Note title'
  updateTitle.value = title.textContent
  updateTitle.name = 'title'
  updateTitle.type = 'text'
  updateTitle.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.code === 'Enter') {
      updateSubmit.click()
    }
  })

  const updateContent = document.createElement('input')
  updateContent.placeholder = 'Note content'
  updateContent.value = content.textContent
  updateContent.name = 'content'
  updateContent.type = 'text'
  updateContent.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.code === 'Enter') {
      updateSubmit.click()
    }
  })
  
  const updateSubmit = document.createElement('input')
  updateSubmit.type = 'button'
  updateSubmit.value = 'Done'
  updateSubmit.addEventListener('click', updateNote)

  const updateCancel = document.createElement('span')
  // updateCancel.innerText = "Cancel"
  updateCancel.classList.add('fa', 'fa-x', 'cancelButton')
  // updateCancel.classList.add('fa-x')
  updateCancel.addEventListener('click', event => {
    location.reload()
  })
  
  updateForm.appendChild(updateTitle)
  updateForm.appendChild(updateContent)
  updateForm.appendChild(updateSubmit)
  updateForm.appendChild(updateCancel)
  li.appendChild(updateForm)
  
}

async function updateNote(){
  const form = this.parentNode
  const title = form[0].value
  const content = form[1].value
  const noteId = form.id
  console.log({content})

  try{
    const response = await fetch(`notes/${noteId}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'title': title,
        'content': content
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }
  catch(err){
    console.log(err)
  }
}