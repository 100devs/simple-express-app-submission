const y = document.querySelector('#update-button')

y.addEventListener('click', function() {
  fetch('https://simple-jedi-api.herokuapp.com/quotes', {
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
  .then(response => {
    console.log(response)
    window.location.reload(true)
  })
})
const messageDiv = document.querySelector('#message')

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click',  function()  {
  fetch('https://simple-jedi-api.herokuapp.com/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {

      if (data === 'No quote to delete') {
        messageDiv.textContent = 'No Darth Vader quote to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(error => console.error(error))
})

