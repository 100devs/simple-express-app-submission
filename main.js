const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: 'Reginald "Bubbles" Cousins',
            quote: 'Thin line between heaven and here.'
        })
    })
    .then(response => {
        window.location.reload(true)
  })
    
})
deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bubbles'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
          if (response === 'No quote to delete'){
          messageDiv.textContent = 'Disrespect'
          } else {
            window.location.reload(true)
          }
      })
      .catch(error => console.error(error))
  })