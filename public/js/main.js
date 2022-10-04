const deleteButton = document.querySelectorAll('.fa-trash')

Array.from(deleteButton).forEach((element) => {
  element.addEventListener('click', deleteItem)
})

async function deleteItem(){
  const listItem = this.parentNode.childNodes[1].innerText
  try {
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemS': listItem,
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (error) {
    console.log(error)
  }
}