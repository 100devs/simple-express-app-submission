
// selecting like and trash buttons
const likeBtn = document.querySelectorAll('.fa-thumbs-up')
const deleteBtn = document.querySelectorAll('.fa-trash')

// creating event listeners. smurf it up
Array.from(likeBtn).forEach((element) => {
  element.addEventListener('click', likeItem)
})
Array.from(deleteBtn).forEach((element) => {
  element.addEventListener('click', deleteItem)
})

//like function
async function likeItem() {
  const title = this.parentNode.childNodes[3].innerText
  let likes = Number(this.parentNode.childNodes[13].innerText.split(" ")[0]) + 1
  try{
      const response = await fetch('like', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'titleFromJS': title,
            'likesFromJS': likes
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
  const title = this.parentNode.childNodes[3].innerText
  try{
      const response = await fetch('deleteMedia', {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'titleFromJS': title
            
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}