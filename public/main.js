//This is where you put the code that reaches out to the server to send info back and forth. Info can travel back and forth using fetches

const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

//Update Yoda quote to Darth Vader
update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
      quote: 'I find your lack of faith disturbing.'
    })
  })
  .then(res=> {
      if (res.ok) return res.json()
  })
  .then(response=> {
      console.log(response)
  })
})

//Delete Darth Vader
deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application.json' },
      body: JSON.stringify({
          name: 'Darth Vader'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Darth Vader quote to delete'
        } else {
          window.location.reload(true)
        }
      })
  })