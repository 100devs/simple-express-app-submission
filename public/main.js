const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
     fetch('/quotes', {
       method: 'put',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         name: 'Tom Nook',
         quote: 'I find your lack of bells disturbing.' || 'Do you have a request for me?'
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
     fetch('/quotes', {
       method: 'delete',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         name: 'Tom Nook'
       })
     })
       .then(res => {
         if (res.ok) return res.json()
       })
       .then(response => {
          if (response === 'No quote to delete') {
               messageDiv.textContent = 'No Tom Nook quote to delete'
             } else {
              window.location.reload(true)
             }
       })
   })