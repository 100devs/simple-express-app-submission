const deleteButton = document.getElementById('delete-button')

deleteButton.addEventListener('click', _ => {
  fetch('/songs', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'nameC': nameC,
      'nameS': nameS
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
})