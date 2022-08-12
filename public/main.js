
// selecting like and trash buttons
const likeBtn = document.querySelectorAll('.fa fa-thumbs-up')
const deleteBtn = document.querySelectorAll('.fa fa-trash')

// creating event listeners. smurf it up
Array.from(likeBtn.forEach((element) => {
  element.addEventListener('click', likeItem)
}))
Array.from(deleteBtn.forEach((element) => {
  element.addEventListener('click', deleteItem)
}))

//like function
async function likeItem() {
  const itemText = this.parentNode.childNodes[1].innerText
  try{
      const response = await fetch('likeItem', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'itemFromJS': itemText
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}

//delete function
async function deleteItem() {
  const itemText = this.parentNode.childNodes[1].innerText
  try{
      const response = await fetch('deleteItem', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'itemFromJS': itemText
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}