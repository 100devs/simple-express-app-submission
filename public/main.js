// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
  // Send PUT Request here
  fetch('/type', {
   method: 'put',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
      name: 'Pekoe',
      type: 'Cub'
   
    })
   })
    .then(res => {
    if (res.ok) return res.json()
  })

   .then(response => {
    console.log(response)
   })
})

deleteButton.addEventListener('click', _ => {
  fetch('/type', {
     method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Pekoe'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then (response => {
      if (response === 'No type to delete') {
        messageDiv.textContent = 'No Pekoe type to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(error=> console.error(error))
})
