// places all of the elements with a class of fa-trash into an array from the dom
const deleteBtn = document.querySelectorAll('.fa-trash')

Array.from(deleteBtn).forEach(element => {

  element.addEventListener('click', deleteGame);

})

async function deleteGame() {

  const itemText = this.parentNode.childNodes[1].innerText;

  try {

    const response = await fetch('deleteItem', {

      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': itemText
      })
    })

    const data = await response.json()

    console.log(data);

    location.reload()

  } catch(err)  {

    console.log(err);

  }

}