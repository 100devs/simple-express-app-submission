//This is where you put the code that reaches out to the server to send information back and forth.
//Info can travel back and forth using using fetches.

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
    fetch('/title', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        genre: 'Never gonna give you up',
        title: 'Never gonna let you down'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
  })

  deleteButton.addEventListener('click', _ => {
    fetch('/title', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        genre: "Never gonna give you up"
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Title to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })
  