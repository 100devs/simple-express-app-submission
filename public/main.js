const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
fetch('/quotes', {
    method:'put',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify( {
        name: 'Audre Lorde', 
        quote: `When I dare to be powerful—to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.`
    })
})
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})

deleteButton.addEventListener('click',_ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Audre Lorde'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          message.textContent = `No bell hooks' quote to delete`
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })